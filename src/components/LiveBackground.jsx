import React from 'react';

const LiveBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-purple-900 animate-gradient-x"></div>
    </div>
  );
};

export default LiveBackground;
