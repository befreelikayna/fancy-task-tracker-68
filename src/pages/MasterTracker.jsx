import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Upload, Download, MoreVertical, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import AddShotModal from '../components/AddShotModal';
import PreviewModal from '../components/PreviewModal';
import EditModal from '../components/EditModal';
import StatusDropdown from '../components/StatusDropdown';
import * as XLSX from 'xlsx';

const MasterTracker = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [trackerData, setTrackerData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [headings, setHeadings] = useState(['Show', 'Shot', 'Department', 'Lead', 'Artist', 'Status', 'StartDate', 'EndDate']);

  const handleAddShot = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSubmitShot = (newShot) => {
    setTrackerData(prevData => [...prevData, { ...newShot, id: Date.now() }]);
  };

  const handleUploadExcel = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        
        const headers = data[0];
        const processedData = data.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header.toLowerCase()] = row[index] || '';
          });
          return { ...obj, id: Date.now() + Math.random() };
        });

        setPreviewData(processedData);
        setIsPreviewModalOpen(true);
      } catch (error) {
        console.error('Error processing Excel file:', error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
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

  const handleCheckboxChange = (id) => {
    setSelectedEntries(prev => 
      prev.includes(id) ? prev.filter(entryId => entryId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setTrackerData(prev => prev.filter(entry => !selectedEntries.includes(entry.id)));
    setSelectedEntries([]);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedEntry) => {
    setTrackerData(prev => prev.map(entry => entry.id === editedEntry.id ? editedEntry : entry));
    setIsEditModalOpen(false);
    setEditingEntry(null);
  };

  const handleEditHeading = (index, newHeading) => {
    setHeadings(prev => prev.map((heading, i) => i === index ? newHeading : heading));
  };

  const handleStatusChange = (id, newStatus) => {
    setTrackerData(prev => prev.map(entry => 
      entry.id === id ? { ...entry, status: newStatus } : entry
    ));
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
              {selectedEntries.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteSelected}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center text-sm"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete Selected ({selectedEntries.length})
                </motion.button>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-6 border border-white overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-600 bg-opacity-50">
                <th className="px-2 py-1 text-center">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedEntries.length === trackerData.length) {
                        setSelectedEntries([]);
                      } else {
                        setSelectedEntries(trackerData.map(entry => entry.id));
                      }
                    }}
                    checked={selectedEntries.length === trackerData.length && trackerData.length > 0}
                  />
                </th>
                {headings.map((heading, index) => (
                  <th key={index} className="px-2 py-1 text-center text-white font-bold border border-white">
                    <input
                      type="text"
                      value={heading}
                      onChange={(e) => handleEditHeading(index, e.target.value)}
                      className="bg-transparent text-center text-white font-bold w-full"
                    />
                  </th>
                ))}
                <th className="px-2 py-1 text-center text-white font-bold border border-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trackerData.map((entry) => (
                <tr key={entry.id} className="border-t border-white border-opacity-20">
                  <td className="px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      checked={selectedEntries.includes(entry.id)}
                      onChange={() => handleCheckboxChange(entry.id)}
                    />
                  </td>
                  {headings.map((heading, index) => (
                    <td key={index} className="px-2 py-1 text-white text-center">
                      {heading.toLowerCase() === 'status' ? (
                        <StatusDropdown
                          currentStatus={entry[heading.toLowerCase()]}
                          onStatusChange={(newStatus) => handleStatusChange(entry.id, newStatus)}
                        />
                      ) : (
                        entry[heading.toLowerCase()]
                      )}
                    </td>
                  ))}
                  <td className="px-2 py-1 text-center">
                    <button
                      onClick={() => handleEditEntry(entry)}
                      className="text-white hover:text-blue-300 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddShotModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onSubmit={handleSubmitShot} headings={headings} />
      <PreviewModal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} onConfirm={handleConfirmUpload} data={previewData} headings={headings} />
      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveEdit} entry={editingEntry} headings={headings} />
    </div>
  );
};

export default MasterTracker;