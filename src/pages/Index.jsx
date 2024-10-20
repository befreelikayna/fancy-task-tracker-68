import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import LiveBackground from '../components/LiveBackground';

const Index = () => {
  useEffect(() => {
    document.title = "Ankita Sharma's Dashboard";
  }, []);

  const buttons = [
    { name: "Video Call", icon: "📹", color: "from-blue-200 to-indigo-300" },
    { name: "Groups", icon: "👥", color: "from-pink-200 to-rose-300" },
    { name: "MeetUP", icon: "🤝", color: "from-green-200 to-emerald-300" },
    { name: "Custom Video Call", icon: "🎥", color: "from-amber-200 to-orange-300" },
  ];

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
          Ankita Sharma
        </motion.h1>
        
        {/* Button container */}
        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              className={`w-full text-lg py-6 bg-gradient-to-r ${button.color} text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-glow`}
            >
              <span className="mr-2">{button.icon}</span>
              {button.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;