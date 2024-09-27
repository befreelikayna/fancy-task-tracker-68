import React, { useState } from 'react';
import { X } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, onApply, headings }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (heading, value) => {
    setFilters(prev => ({
      ...prev,
      [heading.toLowerCase()]: value
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter Entries</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleApply(); }}>
          {headings.map((heading) => (
            <div key={heading} className="mb-4">
              <label htmlFor={heading.toLowerCase()} className="block text-sm font-medium text-gray-700 mb-1">
                {heading}
              </label>
              <input
                type="text"
                id={heading.toLowerCase()}
                name={heading.toLowerCase()}
                value={filters[heading.toLowerCase()] || ''}
                onChange={(e) => handleFilterChange(heading, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;