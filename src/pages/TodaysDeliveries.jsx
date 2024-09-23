import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import * as XLSX from 'xlsx';
import DeliveryTable from '../components/DeliveryTable';
import DeliveryForm from '../components/DeliveryForm';

const TodaysDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LiveBackground />
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8">
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
          
          <DeliveryForm addDelivery={addDelivery} handleFileUpload={handleFileUpload} />

          <div className="flex flex-col sm:flex-row justify-end mb-4 gap-2">
            <button
              onClick={deleteSelectedDeliveries}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 text-sm sm:text-base flex items-center justify-center"
              disabled={selectedDeliveries.length === 0}
            >
              <Trash2 size={16} className="mr-2" />
              Delete Selected
            </button>
            <button
              onClick={toggleSelectedDeliveryStatus}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm sm:text-base flex items-center justify-center"
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

          <DeliveryTable
            deliveries={deliveries}
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
