import axios from 'axios';

const BIN_ID = '678f7e48acd3cb34a8d07586'; // Your provided Bin ID
const API_KEY = '$2a$10$7Z1HP1uojIMUBg.u2HtYI.VKp1QN2J6bIgwnzh0PeE4O8UqLsQ3Se'; // Your provided API key
const BASE_URL = 'https://api.jsonbin.io/v3/b';

export const fetchLogs = async () => {
  try {
    console.log('Fetching logs from JSONBin...');
    const response = await axios.get(`${BASE_URL}/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
        'X-Bin-Meta': false
      }
    });
    console.log('Logs fetched successfully:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};

export const updateLogs = async (logs) => {
  try {
    console.log('Updating logs in JSONBin...');
    const response = await axios.put(`${BASE_URL}/${BIN_ID}`, logs, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Versioning': false
      }
    });
    console.log('Logs updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating logs:', error);
    throw error;
  }
};