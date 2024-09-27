import React, { useState } from 'react';
import { X } from 'lucide-react';

const MassSearchModal = ({ isOpen, onClose, onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const shots = searchText.split('\n').filter(shot => shot.trim() !== '');
    onSubmit(shots);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mass Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter shot numbers (one per line)"
            className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MassSearchModal;