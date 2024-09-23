import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Nikhil Patil's Dashboard";
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LiveBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white p-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl font-bold mb-8 shadow-text text-center"
        >
          Welcome, Nikhil Patil
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/todo')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1 text-sm sm:text-base"
        >
          To-Do List
        </motion.button>
      </div>
    </div>
  );
};

export default Index;
