import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddShotModal = ({ isOpen, onClose, onSubmit, headings }) => {
  const [formData, setFormData] = useState(
    headings.reduce((acc, heading) => ({ ...acc, [heading.toLowerCase()]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Shot</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {headings.map((heading) => (
            <div key={heading} className="mb-4">
              <label htmlFor={heading.toLowerCase()} className="block text-sm font-medium text-gray-700 mb-1">
                {heading}
              </label>
              <input
                type={heading.includes('Date') ? 'date' : 'text'}
                id={heading.toLowerCase()}
                name={heading.toLowerCase()}
                value={formData[heading.toLowerCase()]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Shot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShotModal;