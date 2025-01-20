export const sendTelegramNotification = (orderDetails) => {
  console.log('Order details:', orderDetails);
  
  // Get existing logs from localStorage
  const existingLogs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
  
  // Add new log
  const newLog = {
    type: orderDetails.planName ? (orderDetails.planName.includes('Video Call') ? 'Video Call' : 'Group Order') : 'Unknown',
    details: orderDetails,
    timestamp: new Date().toISOString()
  };
  
  // Add to beginning of array
  existingLogs.unshift(newLog);
  
  // Store back in localStorage
  localStorage.setItem('adminLogs', JSON.stringify(existingLogs));
};