import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import LiveBackground from '../components/LiveBackground';
import VideoCallModal from '../components/VideoCallModal';

const Index = () => {
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Ankita Sharma's Dashboard";
  }, []);

  const buttons = [
    { name: "Video Call", icon: "📹", price: 999 },
    { name: "Groups", icon: "👥", price: 499 },
    { name: "MeetUP", icon: "🤝", price: 1499 },
    { name: "Custom Video Call", icon: "🎥", price: 1999 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LiveBackground />
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <img 
            src="/placeholder.svg" 
            alt="Ankita Sharma" 
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 shadow-text text-center flex items-center">
            Ankita Sharma
            <img src="/Verified.png" alt="Verified" className="w-6 h-6 ml-2 inline-block" />
          </h1>
          
          <div className="flex justify-center space-x-4 mb-12">
            <a href="https://www.instagram.com/ankitasharmmaa" target="_blank" rel="noopener noreferrer">
              <img src="/Instagram.png" alt="Instagram" className="w-8 h-8 object-contain" />
            </a>
            <a href="https://telegram.me/ankiitasharmmaa" target="_blank" rel="noopener noreferrer">
              <img src="/Telegram.png" alt="Telegram" className="w-8 h-8 object-contain" />
            </a>
          </div>
        </motion.div>
        
        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              className="w-full text-lg py-6 bg-transparent text-white rounded-full border border-gold-shimmer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-gold-flare"
              onClick={() => button.name === "Video Call" && setIsVideoCallModalOpen(true)}
            >
              <span className="mr-2">{button.icon}</span>
              {button.name}
            </Button>
          ))}
        </div>
      </div>
      <VideoCallModal isOpen={isVideoCallModalOpen} onClose={() => setIsVideoCallModalOpen(false)} />
    </div>
  );
};

export default Index;