import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const statusOptions = [
  { value: 'WIP', color: 'bg-yellow-500' },
  { value: 'PCR', color: 'bg-blue-500' },
  { value: 'KB', color: 'bg-green-500' },
  { value: 'READY', color: 'bg-purple-500' },
  { value: 'ADD', color: 'bg-red-500' },
  { value: 'APPROVED', color: 'bg-indigo-500' },
  { value: 'YTS', color: 'bg-pink-500' },
  { value: 'HOLD', color: 'bg-orange-500' },
  { value: 'OMIT', color: 'bg-gray-500' },
  { value: 'INT KB', color: 'bg-teal-500' },
];

const StatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentOption = statusOptions.find(option => option.value === currentStatus) || statusOptions[0];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-full rounded-full px-4 py-2 text-sm font-medium text-white ${currentOption.color} hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentStatus || 'Select Status'}
          <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`${option.color} text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                onClick={() => {
                  onStatusChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;