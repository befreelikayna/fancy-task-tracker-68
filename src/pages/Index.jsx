import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import LiveBackground from '../components/LiveBackground';

const Index = () => {
  useEffect(() => {
    document.title = "Ankita Sharma's Dashboard";
  }, []);

  const buttons = [
    { name: "Video Call", icon: "📹" },
    { name: "Groups", icon: "👥" },
    { name: "MeetUP", icon: "🤝" },
    { name: "Custom Video Call", icon: "🎥" },
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
              className="w-full text-lg py-6 bg-transparent text-white rounded-full border border-gold-shimmer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-gold-flare"
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