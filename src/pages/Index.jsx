import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl font-bold text-white mb-8"
        >
          Build To-Do List
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-4xl font-semibold text-red-400 mb-12"
        >
          With JavaScript
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/todo')}
          className="bg-white text-purple-800 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-purple-100 transition duration-300 ease-in-out"
        >
          Go to To-Do List
        </motion.button>
      </div>
    </div>
  );
};

export default Index;
