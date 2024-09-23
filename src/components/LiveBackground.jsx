import React from 'react';

const LiveBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 animate-gradient-x"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute h-56 w-56 rounded-full bg-purple-600 blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute h-64 w-64 rounded-full bg-blue-600 blur-3xl top-1/3 right-1/4 animate-pulse delay-1000"></div>
        <div className="absolute h-48 w-48 rounded-full bg-pink-600 blur-3xl bottom-1/4 left-1/3 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default LiveBackground;