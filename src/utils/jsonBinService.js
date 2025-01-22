import axios from 'axios';

const BIN_ID = '678f7e48acd3cb34a8d07586'; // Your provided Bin ID
const API_KEY = '$2a$10$7Z1HP1uojIMUBg.u2HtYI.VKp1QN2J6bIgwnzh0PeE4O8UqLsQ3Se'; // Your provided API key
const BASE_URL = 'https://api.jsonbin.io/v3/b';

// Fetch logs from JSONBin
export const fetchLogs = async () => {
  try {
    console.log('Fetching logs from JSONBin...');
    const response = await axios.get(`${BASE_URL}/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
        'X-Bin-Meta': false,
      },
    });

    const logs = Array.isArray(response.data) ? response.data : response.data.record || [];
    console.log('Logs fetched successfully:', logs);
    return logs;
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};

// Append a new log and update JSONBin
export const addLog = async (newLog) => {
  try {
    console.log('Appending new log...');
    const currentLogs = await fetchLogs(); // Fetch existing logs
    const updatedLogs = [...currentLogs, { message: newLog, timestamp: new Date().toISOString() }];

    const response = await axios.put(
      `${BASE_URL}/${BIN_ID}`,
      { logs: updatedLogs }, // Update JSONBin with all logs
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
          'X-Bin-Versioning': false,
        },
      }
    );

    console.log('Log added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating logs:', error);
    throw error;
  }
};
