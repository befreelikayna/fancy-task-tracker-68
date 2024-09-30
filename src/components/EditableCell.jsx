import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const EditableCell = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editedValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onChange(editedValue);
    }
  };

  if (isEditing) {
    return (
      <motion.input
        ref={inputRef}
        type="text"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    );
  }

  return (
    <motion.div
      onDoubleClick={handleDoubleClick}
      className="cursor-pointer"
      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      {value}
    </motion.div>
  );
};

export default EditableCell;