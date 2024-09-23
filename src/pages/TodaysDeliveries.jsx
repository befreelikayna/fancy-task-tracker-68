import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import * as XLSX from 'xlsx';

const TodaysDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({ show: '', shot: '', dep: '', lead: '', eta: '' });
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDeliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    setDeliveries(savedDeliveries);
  }, []);

  useEffect(() => {
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  const addDelivery = () => {
    if (newDelivery.show && newDelivery.shot) {
      setDeliveries([...deliveries, { ...newDelivery, id: Date.now() }]);
      setNewDelivery({ show: '', shot: '', dep: '', lead: '', eta: new Date().toISOString().split('T')[0] });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({ ...newDelivery, [name]: value });
  };

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

  const deleteSelectedDeliveries = () => {
    setDeliveries(prev => prev.filter(delivery => !selectedDeliveries.includes(delivery.id)));
    setSelectedDeliveries([]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LiveBackground />
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="mb-4 sm:mb-8 text-white"
        >
          <ArrowLeft size={24} />
        </motion.button>
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-8 border border-white">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Today's Deliveries 🚚</h1>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-2 mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Show"
              name="show"
              value={newDelivery.show}
              onChange={handleInputChange}
              className="w-full sm:w-1/6 p-2 sm:p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white placeholder-white text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Shot"
              name="shot"
              value={newDelivery.shot}
              onChange={handleInputChange}
              className="w-full sm:w-1/6 p-2 sm:p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white placeholder-white text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Dep"
              name="dep"
              value={newDelivery.dep}
              onChange={handleInputChange}
              className="w-full sm:w-1/6 p-2 sm:p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white placeholder-white text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Lead"
              name="lead"
              value={newDelivery.lead}
              onChange={handleInputChange}
              className="w-full sm:w-1/6 p-2 sm:p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white placeholder-white text-sm sm:text-base"
            />
            <input
              type="date"
              name="eta"
              value={newDelivery.eta}
              onChange={handleInputChange}
              className="w-full sm:w-1/6 p-2 sm:p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white text-sm sm:text-base"
            />
            <button
              onClick={addDelivery}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 sm:p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 text-sm sm:text-base"
            >
              Add Delivery
            </button>
            <label className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-500 text-white p-2 sm:p-3 rounded-lg hover:from-blue-600 hover:to-teal-600 transition duration-300 text-sm sm:text-base cursor-pointer">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload size={16} className="inline mr-2" />
              Upload Excel
            </label>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={deleteSelectedDeliveries}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 text-sm sm:text-base flex items-center"
              disabled={selectedDeliveries.length === 0}
            >
              <Trash2 size={16} className="mr-2" />
              Delete Selected
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-purple-500 bg-opacity-50">
                  <th className="p-2 text-left">Select</th>
                  <th className="p-2 text-left">Show</th>
                  <th className="p-2 text-left">Shot</th>
                  <th className="p-2 text-left">Dep</th>
                  <th className="p-2 text-left">Lead</th>
                  <th className="p-2 text-left">ETA</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedDeliveries.includes(delivery.id)}
                        onChange={() => handleCheckboxChange(delivery.id)}
                        className="form-checkbox h-5 w-5 text-purple-600"
                      />
                    </td>
                    <td className="p-2">{delivery.show}</td>
                    <td className="p-2">{delivery.shot}</td>
                    <td className="p-2">{delivery.dep}</td>
                    <td className="p-2">{delivery.lead}</td>
                    <td className="p-2">{delivery.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysDeliveries;
