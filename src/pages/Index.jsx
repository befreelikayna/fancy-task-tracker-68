import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import LiveBackground from '../components/LiveBackground';

const Index = () => {
  useEffect(() => {
    document.title = "Ankita Sharma's Dashboard";
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LiveBackground />
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen text-white p-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl font-bold mt-8 mb-16 shadow-text text-center"
        >
          Welcome, Ankita Sharma
        </motion.h1>
        {/* Content area */}
        <div className="flex-grow flex items-center justify-center">
          {/* Add any additional content here */}
        </div>
      </div>
    </div>
  );
};

export default Index;
