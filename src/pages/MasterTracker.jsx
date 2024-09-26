import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import AddShotModal from '../components/AddShotModal';
import * as XLSX from 'xlsx';

const MasterTracker = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackerData, setTrackerData] = useState([]);

  const handleAddShot = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitShot = (newShot) => {
    setTrackerData(prevData => [...prevData, newShot]);
  };

  const handleUploadExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setTrackerData(prevData => [...prevData, ...data]);
    };
    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(trackerData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MasterTracker");
    XLSX.writeFile(wb, "MasterTracker.xlsx");
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <LiveBackground />
      <div className="relative z-10 p-4 sm:p-8 flex flex-col h-full">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="mb-2 sm:mb-4 text-white self-start"
        >
          <ArrowLeft size={24} />
        </motion.button>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Master Tracker</h1>
        
        <div className="mb-6">
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
              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 transition duration-300 ease-in-out flex items-center text-sm cursor-pointer"
              >
                <Upload size={16} className="mr-1" />
                Upload Excel
                <input type="file" onChange={handleUploadExcel} className="hidden" accept=".xlsx, .xls" />
              </motion.label>
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

        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-6 border border-white overflow-x-auto">
          <div className="grid grid-cols-8 gap-4 text-white font-bold mb-4">
            <div>Show</div>
            <div>Shot</div>
            <div>Department</div>
            <div>Lead</div>
            <div>Artist</div>
            <div>Status</div>
            <div>StartDate</div>
            <div>EndDate</div>
          </div>
          {trackerData.map((row, index) => (
            <div key={index} className="grid grid-cols-8 gap-4 text-white mb-2">
              <div>{row.show}</div>
              <div>{row.shot}</div>
              <div>{row.department}</div>
              <div>{row.lead}</div>
              <div>{row.artist}</div>
              <div>{row.status}</div>
              <div>{row.startDate}</div>
              <div>{row.endDate}</div>
            </div>
          ))}
        </div>
      </div>
      <AddShotModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitShot} />
    </div>
  );
};

export default MasterTracker;