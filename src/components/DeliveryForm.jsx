import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

const DeliveryForm = ({ addDelivery, handleFileUpload }) => {
  const [newDelivery, setNewDelivery] = useState({ show: '', shot: '', dep: '', lead: '', eta: '' });

  useEffect(() => {
    setNewDelivery(prev => ({ ...prev, eta: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({ ...newDelivery, [name]: value });
  };

  const handleSubmit = () => {
    if (newDelivery.show && newDelivery.shot) {
      addDelivery(newDelivery);
      setNewDelivery({ show: '', shot: '', dep: '', lead: '', eta: new Date().toISOString().split('T')[0] });
    }
  };

  return (
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
        onClick={handleSubmit}
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
  );
};

export default DeliveryForm;
