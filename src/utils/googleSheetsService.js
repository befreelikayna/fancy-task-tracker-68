import { google } from 'googleapis';

// These would ideally come from environment variables
const SPREADSHEET_ID = ''; // Add your Google Sheet ID here
const CLIENT_EMAIL = ''; // Add your service account email
const PRIVATE_KEY = ''; // Add your service account private key

const auth = new google.auth.JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export const logOrderToGoogleSheet = async (orderDetails) => {
  try {
    console.log('Attempting to log order to Google Sheets:', orderDetails);

    const values = [
      [
        orderDetails.planName || '',
        orderDetails.price?.toString() || '',
        new Date().toISOString(),
        JSON.stringify(orderDetails)
      ]
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D', // Assumes first sheet with columns A-D
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Successfully logged to Google Sheets:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    throw error;
  }
};