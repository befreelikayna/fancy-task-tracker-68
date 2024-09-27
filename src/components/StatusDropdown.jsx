import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const statusOptions = [
  { value: 'ADD', color: 'bg-red-500' },
  { value: 'APPROVED', color: 'bg-indigo-500' },
  { value: 'HOLD', color: 'bg-orange-500' },
  { value: 'INT KB', color: 'bg-teal-500' },
  { value: 'KB', color: 'bg-green-500' },
  { value: 'OMIT', color: 'bg-gray-500' },
  { value: 'PCR', color: 'bg-blue-500' },
  { value: 'READY', color: 'bg-purple-500' },
  { value: 'WIP', color: 'bg-yellow-500' },
  { value: 'YTS', color: 'bg-pink-500' },
].sort((a, b) => a.value.localeCompare(b.value));

const StatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const currentOption = statusOptions.find(option => option.value === currentStatus) || statusOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          ref={buttonRef}
          type="button"
          className={`inline-flex justify-between items-center w-24 rounded-full px-2 py-1 text-xs font-medium text-white ${currentOption.color} hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentStatus || 'Select'}
          <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 max-h-48 overflow-auto" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`${option.color} text-white group flex rounded-md items-center w-full px-2 py-1 text-xs`}
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