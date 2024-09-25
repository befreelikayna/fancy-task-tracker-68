import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, CheckCircle, XCircle, ChevronUp, ChevronDown, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import * as XLSX from 'xlsx';
import DeliveryTable from '../components/DeliveryTable';
import DeliveryForm from '../components/DeliveryForm';

const TodaysDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddDelivery, setShowAddDelivery] = useState(true);
  const [filters, setFilters] = useState({ show: '', dep: '', lead: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedDeliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    setDeliveries(savedDeliveries.map(d => ({ ...d, delivered: d.delivered || false })));
  }, []);

  useEffect(() => {
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
      const newDeliveries = data.slice(1).map((row, index) => ({
        id: Date.now() + index,
        show: row[0] || '',
        shot: row[1] || '',
        dep: row[2] || '',
        lead: row[3] || '',
        eta: row[4] || new Date().toISOString().split('T')[0],
        delivered: false,
      }));

      setDeliveries([...deliveries, ...newDeliveries]);
    };
    reader.readAsBinaryString(file);
  };

  const handleCheckboxChange = (id) => {
    setSelectedDeliveries(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedDeliveries(selectAll ? [] : deliveries.map(d => d.id));
  };

  const deleteSelectedDeliveries = () => {
    setDeliveries(prev => prev.filter(delivery => !selectedDeliveries.includes(delivery.id)));
    setSelectedDeliveries([]);
    setSelectAll(false);
  };

  const toggleSelectedDeliveryStatus = () => {
    const allSelectedDelivered = selectedDeliveries.every(id => 
      deliveries.find(d => d.id === id).delivered
    );

    setDeliveries(prev => prev.map(delivery => 
      selectedDeliveries.includes(delivery.id) 
        ? { ...delivery, delivered: !allSelectedDelivered } 
        : delivery
    ));
    setSelectedDeliveries([]);
    setSelectAll(false);
  };

  const addDelivery = (newDelivery) => {
    setDeliveries([...deliveries, { ...newDelivery, id: Date.now(), delivered: false }]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ show: '', dep: '', lead: '' });
    setSearchTerm('');
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    return (
      (filters.show === '' || delivery.show.toLowerCase().includes(filters.show.toLowerCase())) &&
      (filters.dep === '' || delivery.dep.toLowerCase().includes(filters.dep.toLowerCase())) &&
      (filters.lead === '' || delivery.lead.toLowerCase().includes(filters.lead.toLowerCase())) &&
      (searchTerm === '' || delivery.shot.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LiveBackground />
      <div className="relative z-10 max-w-full mx-auto p-4 sm:p-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="mb-4 sm:mb-8 text-white"
        >
          <ArrowLeft size={24} />
        </motion.button>
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-8 border border-white">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">Today's Deliveries 🚚</h1>
          
          <button
            onClick={() => setShowAddDelivery(!showAddDelivery)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 sm:p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 text-sm sm:text-base mb-4 flex items-center justify-center"
          >
            {showAddDelivery ? 'Hide Add Delivery' : 'Show Add Delivery'}
            {showAddDelivery ? <ChevronUp className="ml-2" size={20} /> : <ChevronDown className="ml-2" size={20} />}
          </button>

          {showAddDelivery && <DeliveryForm addDelivery={addDelivery} handleFileUpload={handleFileUpload} />}

          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Filter by Show"
                name="show"
                value={filters.show}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-white bg-opacity-50 text-white placeholder-white text-sm"
              />
              <input
                type="text"
                placeholder="Filter by Department"
                name="dep"
                value={filters.dep}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-white bg-opacity-50 text-white placeholder-white text-sm"
              />
              <input
                type="text"
                placeholder="Filter by Lead"
                name="lead"
                value={filters.lead}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-white bg-opacity-50 text-white placeholder-white text-sm"
              />
              <input
                type="text"
                placeholder="Search Shot Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg bg-white bg-opacity-50 text-white placeholder-white text-sm"
              />
              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-300 text-sm flex items-center justify-center"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={deleteSelectedDeliveries}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 text-sm flex items-center justify-center"
                disabled={selectedDeliveries.length === 0}
              >
                <Trash2 size={16} className="mr-2" />
                Delete Selected
              </button>
              <button
                onClick={toggleSelectedDeliveryStatus}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm flex items-center justify-center"
                disabled={selectedDeliveries.length === 0}
              >
                {selectedDeliveries.every(id => deliveries.find(d => d.id === id).delivered) ? (
                  <>
                    <XCircle size={16} className="mr-2" />
                    Mark Selected as Undelivered
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="mr-2" />
                    Mark Selected as Delivered
                  </>
                )}
              </button>
            </div>
          </div>

          <DeliveryTable
            deliveries={filteredDeliveries}
            selectedDeliveries={selectedDeliveries}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            selectAll={selectAll}
            setDeliveries={setDeliveries}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysDeliveries;
