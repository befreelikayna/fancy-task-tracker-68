import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import LiveBackground from '../components/LiveBackground';
import VideoCallModal from '../components/VideoCallModal';
import GroupModal from '../components/GroupModal';
import ComingSoonModal from '../components/ComingSoonModal';
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';

const Index = () => {
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  const [profileClickCount, setProfileClickCount] = useState(0);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    document.title = "Ankita Sharma's Dashboard";
  }, []);

  useEffect(() => {
    if (profileClickCount === 5) {
      setIsAdminLoginOpen(true);
      setProfileClickCount(0);
    }
  }, [profileClickCount]);

  // Load logs from localStorage when component mounts
  useEffect(() => {
    const storedLogs = localStorage.getItem('adminLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const handleProfileClick = () => {
    setProfileClickCount(prev => prev + 1);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setIsAdminPanelOpen(true);
  };

  const TransparentButton = ({ icon, name, onClick }) => (
    <Button
      className="w-full text-lg py-6 bg-transparent backdrop-blur-sm text-white border border-white/20 
                 rounded-full transition-all duration-300 ease-in-out transform 
                 hover:scale-105 hover:border-gold-shimmer hover:shadow-gold-flare
                 hover:bg-white/5 relative overflow-hidden
                 before:absolute before:inset-0 before:-translate-x-full
                 before:animate-shimmer before:bg-gradient-to-r
                 before:from-transparent before:via-white/10 before:to-transparent"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {name}
    </Button>
  );

  const buttons = [
    { name: "Video Call", icon: "📹", onClick: () => setIsVideoCallModalOpen(true) },
    { name: "Groups", icon: "👥", onClick: () => setIsGroupModalOpen(true) },
    { name: "MeetUP", icon: "🎥", onClick: () => setIsComingSoonModalOpen(true) },
    { name: "Custom Video Call", icon: "🎥", onClick: () => setIsComingSoonModalOpen(true) },
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
            src="/AnkitaSharma.png" 
            alt="Ankita Sharma" 
            className="w-32 h-32 rounded-full object-cover mb-4 cursor-pointer"
            onClick={handleProfileClick}
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
            <TransparentButton
              key={index}
              icon={button.icon}
              name={button.name}
              onClick={button.onClick}
            />
          ))}
        </div>
      </div>
      <VideoCallModal isOpen={isVideoCallModalOpen} onClose={() => setIsVideoCallModalOpen(false)} />
      <GroupModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
      <ComingSoonModal isOpen={isComingSoonModalOpen} onClose={() => setIsComingSoonModalOpen(false)} />
      <AdminLogin 
        isOpen={isAdminLoginOpen} 
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleAdminLogin}
      />
      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={() => setIsAdminPanelOpen(false)}
        logs={logs}
      />
    </div>
  );
};

export default Index;
