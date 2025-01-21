import axios from 'axios';

const BIN_ID = '65f9c2c8266cfc3fde8f5c11'; // Created a new bin for this project
const API_KEY = '$2a$10$Hs/vXZqHBnwxZNVGZk.YAOYGkGCpVSVJHHFPQQ4AzlvL1h8MrBgwi'; // Read-write key
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