import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const currentOption = statusOptions.find(option => option.value === currentStatus) || statusOptions[0];

  const handleStatusSelect = (newStatus) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`inline-flex justify-between items-center w-24 rounded-full px-2 py-1 text-xs font-medium text-white ${currentOption.color} hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        onClick={() => setIsOpen(true)}
      >
        {currentStatus || 'Select'}
        <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Status</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`${option.color} text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                onClick={() => handleStatusSelect(option.value)}
              >
                {option.value}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusDropdown;