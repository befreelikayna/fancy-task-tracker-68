import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RefreshCw } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import EditableCell from './EditableCell';

const PreviewModal = ({ isOpen, onClose, onConfirm, data, headings }) => {
  const [editableData, setEditableData] = useState(data);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [masterColumn, setMasterColumn] = useState('');
  const [columnsToUpdate, setColumnsToUpdate] = useState([]);

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const handleCellEdit = (rowIndex, columnName, newValue) => {
    setEditableData(prevData => 
      prevData.map((row, index) => 
        index === rowIndex ? { ...row, [columnName.toLowerCase()]: newValue } : row
      )
    );
  };

  const handleMasterColumnChange = (e) => {
    setMasterColumn(e.target.value);
  };

  const handleColumnToUpdateChange = (columnName) => {
    setColumnsToUpdate(prev => 
      prev.includes(columnName) 
        ? prev.filter(col => col !== columnName)
        : [...prev, columnName]
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Preview Excel Data</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Switch
                  checked={isUpdateMode}
                  onCheckedChange={setIsUpdateMode}
                  id="update-mode"
                  className="data-[state=checked]:bg-blue-500"
                />
                <label htmlFor="update-mode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isUpdateMode ? "Update existing data" : "Add new shots"}
                </label>
              </div>
              {isUpdateMode && (
                <div className="flex items-center space-x-2">
                  <select
                    value={masterColumn}
                    onChange={handleMasterColumnChange}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select master column</option>
                    {headings.map(heading => (
                      <option key={heading} value={heading.toLowerCase()}>{heading}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {isUpdateMode && (
              <div className="mb-6">
                <p className="font-bold mb-2 text-gray-700 dark:text-gray-300">Select columns to update:</p>
                <div className="flex flex-wrap gap-3">
                  {headings.map(heading => (
                    <label key={heading} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={columnsToUpdate.includes(heading.toLowerCase())}
                        onChange={() => handleColumnToUpdateChange(heading.toLowerCase())}
                        className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{heading}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    {headings.map((heading, index) => (
                      <th key={index} className="border border-gray-300 dark:border-gray-600 p-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {editableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      {headings.map((heading, colIndex) => (
                        <td key={colIndex} className="border border-gray-300 dark:border-gray-600 p-2">
                          <EditableCell
                            value={row[heading.toLowerCase()]}
                            onChange={(newValue) => handleCellEdit(rowIndex, heading, newValue)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onConfirm(editableData, isUpdateMode, masterColumn, columnsToUpdate)}
                className="px-4 py-2 bg-blue-500 text-white rounded-m
d hover:bg-blue-600 transition-colors flex items-center"
              >
                <Check size={16} className="mr-2" />
                {isUpdateMode ? "Update Data" : "Confirm Upload"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;