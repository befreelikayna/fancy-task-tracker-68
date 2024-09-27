import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import AddShotModal from '../components/AddShotModal';
import PreviewModal from '../components/PreviewModal';
import * as XLSX from 'xlsx';

const MasterTracker = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [trackerData, setTrackerData] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  const handleAddShot = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
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
      setPreviewData(data);
      setIsPreviewModalOpen(true);
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirmUpload = () => {
    setTrackerData(prevData => [...prevData, ...previewData]);
    setIsPreviewModalOpen(false);
    setPreviewData([]);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(trackerData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MasterTracker");
    XLSX.writeFile(wb, "MasterTracker.xlsx");
  };

  const headings = ['Show', 'Shot', 'Department', 'Lead', 'Artist', 'Status', 'StartDate', 'EndDate'];

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
          <div className="grid grid-cols-8 gap-4 mb-4">
            {headings.map((heading, index) => (
              <div key={index} className="text-center font-bold text-white bg-purple-600 bg-opacity-50 p-2 rounded-lg">
                {heading}
              </div>
            ))}
          </div>
          {trackerData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-8 gap-4 mb-2 text-white">
              {headings.map((heading, colIndex) => (
                <div key={colIndex} className="text-center p-2 border-b border-white">
                  {row[heading.toLowerCase()]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <AddShotModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onSubmit={handleSubmitShot} headings={headings} />
      <PreviewModal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} onConfirm={handleConfirmUpload} data={previewData} headings={headings} />
    </div>
  );
};

export default MasterTracker;