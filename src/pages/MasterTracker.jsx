import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Upload, Download, Trash2, Edit, CheckCircle, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';
import AddShotModal from '../components/AddShotModal';
import PreviewModal from '../components/PreviewModal';
import EditModal from '../components/EditModal';
import StatusDropdown from '../components/StatusDropdown';
import MassSearchModal from '../components/MassSearchModal';
import FilterModal from '../components/FilterModal';
import * as XLSX from 'xlsx';

const MasterTracker = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMassSearchModalOpen, setIsMassSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [trackerData, setTrackerData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [headings, setHeadings] = useState(['Show', 'Shot', 'Department', 'Lead', 'Artist', 'Status', 'StartDate', 'EndDate']);
  const [bulkUpdateStatus, setBulkUpdateStatus] = useState('');
  const [lastSelectedIndex, setLastSelectedIndex] = useState(-1);
  const [filters, setFilters] = useState({});
  const [massSearchShots, setMassSearchShots] = useState([]);

  const handleAddShot = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);
  const handleSubmitShot = (newShot) => setTrackerData(prevData => [...prevData, { ...newShot, id: Date.now() }]);

  const handleUploadExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  const handleStatusChange = (id, newStatus) => {
    setTrackerData(prev => prev.map(entry => 
      entry.id === id ? { ...entry, status: newStatus } : entry
    ));
  };

  const handleBulkStatusUpdate = () => {
    if (bulkUpdateStatus && selectedEntries.length > 0) {
      setTrackerData(prev => prev.map(entry => 
        selectedEntries.includes(entry.id) ? { ...entry, status: bulkUpdateStatus } : entry
      ));
      setSelectedEntries([]);
      setBulkUpdateStatus('');
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleMassSearch = (shots) => {
    setMassSearchShots(shots);
  };

  const filteredData = useMemo(() => {
    return trackerData.filter(entry => {
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return entry[key].toLowerCase().includes(value.toLowerCase());
      });

      const matchesMassSearch = massSearchShots.length === 0 || massSearchShots.includes(entry.shot);

      return matchesFilters && matchesMassSearch;
    });
  }, [trackerData, filters, massSearchShots]);

  const handleShotClick = (index, event) => {
    const entry = filteredData[index];
    if (event.ctrlKey) {
      setSelectedEntries(prev => 
        prev.includes(entry.id) ? prev.filter(id => id !== entry.id) : [...prev, entry.id]
      );
      setLastSelectedIndex(index);
    } else if (event.shiftKey && lastSelectedIndex !== -1) {
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      const newSelection = filteredData.slice(start, end + 1).map(e => e.id);
      setSelectedEntries(prev => [...new Set([...prev, ...newSelection])]);
    } else {
      setSelectedEntries([entry.id]);
      setLastSelectedIndex(index);
    }
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
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out flex items-center text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Shot
              </motion.button>
              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-purple-500 hover:to-pink-600 transition duration-300 ease-in-out flex items-center text-sm cursor-pointer"
              >
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleUploadExcel}
                  className="hidden"
                />
                <Upload size={16} className="mr-1" />
                Upload Excel
              </motion.label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-600 transition duration-300 ease-in-out flex items-center text-sm"
              >
                <Download size={16} className="mr-1" />
                Export Excel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteSelected}
                className="bg-gradient-to-r from-red-400 to-red-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-red-500 hover:to-red-600 transition duration-300 ease-in-out flex items-center text-sm"
                disabled={selectedEntries.length === 0}
              >
                <Trash2 size={16} className="mr-1" />
                Delete Selected
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMassSearchModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out flex items-center text-sm"
              >
                <Search size={16} className="mr-1" />
                Mass Search
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterModalOpen(true)}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:from-blue-500 hover:to-cyan-600 transition duration-300 ease-in-out flex items-center text-sm"
              >
                <Filter size={16} className="mr-1" />
                Filter
              </motion.button>
            </div>
          </div>
        </div>
        
        {selectedEntries.length > 0 && (
          <div className="mb-4 flex items-center justify-center">
            <StatusDropdown
              currentStatus={bulkUpdateStatus}
              onStatusChange={setBulkUpdateStatus}
            />
            <button
              onClick={handleBulkStatusUpdate}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Update Selected
            </button>
          </div>
        )}
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-6 border border-white overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-500 bg-opacity-50">
                <th className="px-2 py-1 text-center text-white font-bold">Select</th>
                {headings.map((heading, index) => (
                  <th key={index} className="px-2 py-1 text-center text-white font-bold">
                    {heading}
                  </th>
                ))}
                <th className="px-2 py-1 text-center text-white font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={entry.id} className="border-t border-white border-opacity-20">
                  <td className="px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      checked={selectedEntries.includes(entry.id)}
                      onChange={() => handleCheckboxChange(entry.id)}
                    />
                  </td>
                  {headings.map((heading, headingIndex) => (
                    <td 
                      key={headingIndex} 
                      className={`px-2 py-1 text-white text-center ${heading.toLowerCase() === 'shot' ? 'cursor-pointer' : ''}`}
                      onClick={heading.toLowerCase() === 'shot' ? (e) => handleShotClick(index, e) : undefined}
                    >
                      {heading.toLowerCase() === 'status' ? (
                        <StatusDropdown
                          currentStatus={entry[heading.toLowerCase()]}
                          onStatusChange={(newStatus) => handleStatusChange(entry.id, newStatus)}
                        />
                      ) : (
                        <span className={heading.toLowerCase() === 'shot' && selectedEntries.includes(entry.id) ? 'bg-blue-500 px-2 py-1 rounded' : ''}>
                          {entry[heading.toLowerCase()]}
                        </span>
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
      <MassSearchModal isOpen={isMassSearchModalOpen} onClose={() => setIsMassSearchModalOpen(false)} onSubmit={handleMassSearch} />
      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} onApply={handleApplyFilters} headings={headings} />
    </div>
  );
};

export default MasterTracker;