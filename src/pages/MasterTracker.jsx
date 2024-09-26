import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';

const MasterTracker = () => {
  const navigate = useNavigate();

  const handleAddShot = () => {
    console.log('Add shot clicked');
  };

  const handleUploadExcel = () => {
    console.log('Upload excel clicked');
  };

  const handleExport = () => {
    console.log('Export clicked');
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <LiveBackground />
      <div className="relative z-10 p-4 sm:p-8 flex flex-col h-full">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="mb-4 sm:mb-8 text-white self-start"
        >
          <ArrowLeft size={24} />
        </motion.button>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-auto text-center">Master Tracker</h1>
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-6 border border-white self-center">
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddShot}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out flex items-center text-sm"
            >
              <Plus size={16} className="mr-1" />
              Add Shot
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUploadExcel}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 transition duration-300 ease-in-out flex items-center text-sm"
            >
              <Upload size={16} className="mr-1" />
              Upload Excel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-yellow-600 hover:to-orange-600 transition duration-300 ease-in-out flex items-center text-sm"
            >
              <Download size={16} className="mr-1" />
              Export
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTracker;