import React, { useState, useEffect } from 'react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Preview Excel Data</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isUpdateMode}
              onCheckedChange={setIsUpdateMode}
              id="update-mode"
            />
            <label htmlFor="update-mode">
              {isUpdateMode ? "Update existing data" : "Add new shots"}
            </label>
          </div>
          {isUpdateMode && (
            <div className="flex items-center space-x-2">
              <select
                value={masterColumn}
                onChange={handleMasterColumnChange}
                className="border p-1 rounded"
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
          <div className="mb-4">
            <p className="font-bold mb-2">Select columns to update:</p>
            <div className="flex flex-wrap gap-2">
              {headings.map(heading => (
                <label key={heading} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={columnsToUpdate.includes(heading.toLowerCase())}
                    onChange={() => handleColumnToUpdateChange(heading.toLowerCase())}
                  />
                  <span>{heading}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {headings.map((heading, index) => (
                  <th key={index} className="border border-gray-300 p-2 bg-gray-100">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {editableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headings.map((heading, colIndex) => (
                    <td key={colIndex} className="border border-gray-300 p-2">
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(editableData, isUpdateMode, masterColumn, columnsToUpdate)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
          >
            <Check size={16} className="mr-2" />
            {isUpdateMode ? "Update Data" : "Confirm Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;