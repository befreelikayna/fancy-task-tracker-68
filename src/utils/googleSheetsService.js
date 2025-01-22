import { google } from 'googleapis';

const SPREADSHEET_ID = '1tli1fZkwaXcbTOW52qXPlhHtWyvembbtOykKzpm6xrE';
const CLIENT_EMAIL = 'ankitasharma@celtic-artwork-447610-v2.iam.gserviceaccount.com';
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxds3GzCT3yQwa\ntw8jqDnsxMtl3I5fHzX2cQSCo+8UytadZYxPlZBLbtwnj4zz+R/gjRQcfCumYrWQ\nOydydI0K5SznFFpoGPr6SJ5yoO+61pTCSc0CXPJV4TpLQRMn5JupWKWZPRhaiWSB\n0tu8S/8SZIQeXmKuETayhZ7tt9SBHuXXLA4UwsBfF/Y8lu09AOqLOa4u3Mxx/XPM\n1vJsBaPPEmJ0ExmSNdMD1Gb44ptQtbVx19UNOeXJvjqzSx0UDzg+kPvBBXugfU+Z\njTBpctv1v8PggYYxzxzsQnKIzHs3jmYECl80pC5TmN1LpgNOAf8cuKr9QWEz+/wW\ny6KUddTtAgMBAAECggEAKUNItvHWIaglUJviYQXXTBp4+asGDo+E/lOKey7PYxwD\nuU64iHOr/KIe/fLWkQ7Kru1WsQXdJ1+ZvFrIwgfgGJmvbl5w4/X0+1eBwgDyJNUK\nez9qM+O1NCs9oOxVXif9WquiO4Z1YG3ESRxkW7ym5xmoj6AeHT+i4nEHwlnFRy0r\nIFpsdp5tSwqKsI4NbeRfJl/CHBbx3lEpG0ZLGRwa2sDS9S5uWV6+by6pLBwphDe2\noVZvGpuqnO/BO4/3m5ErWG7EFOphKUnIVqqsp/u64n3BGnc4ii+jGJ94U7l5Mbov\nBYHCXg5fi1HJ9Y6kfIA6emDIOap2jFrF4fx7utqAaQKBgQDWZVDH6hJQdMbAH/sJ\nEXpiRwbqyo5yH+gT7IdwWkekAEhY2B4QhtJAF5x43uFAOhipEqQCaSYa2fPsW5vN\nLdQcrwYRmNuVZIjlaR7ERPgukTVUadnHn+5O8OAYfafwiYDwAOBLG6Iqr6e5l868\nYrcxMSDz6mAae7vtzRbPzEShZQKBgQDT5s7GHiQ+e3qbQfjOpWuGnr4VojzbQ2md\nRbQUBPqzq0vr/9nPia4cEcKi2K2AZPW2RIgYj6To/nm8Qz6VF9LS/fyu0RyfOyly\nDnqJv+I85bmUDdTbJvCnm1akoaoGsEwjEG+LMMnGbU648TJG2owtVDR7IxSLtQPa\nlQOKHwww6QKBgQCL2DJE9E1V5ZXuo+2fEKN/j0zXwaAAmQdMV7BQfNLWCskmCnIx\n3X8vBzetL9RFjJ+hSONqHyQXx6rvtSF/SDFfNFsFB2vTmmwhF9xVsZcg6N6cXR8M\nsylCnKPP1cbBgy9zXV7wHuo8Za9Fw9u5zboogB86etqM68C9cFU83cS2cQKBgQCT\nDeVHlllex0CCCJmLhz8E0Jtn1gxXugPMcjgTgJUfJOxuXkMhBRJARo8Fhkt6BBaF\nJDAyo1U1oIyI+z2uKDdV14+JHnO3iU4s6iFeAT0XN/G+7o5efDqchm/tloexVp2v\n49MVDImq2+a68CANDdQkDQDSx7iVb8y535nyO7OxKQKBgQCrOmrf12SDCX8sZchq\nXhPltThu4hKAGQJjqyDa+pwOQA+CQN1oSJB+1CIhoHyxBg9uP3YH+yC2XfmtuhzB\n14Hmm+TeMyQ1GTgFRAel+g9KFortg5cH3Zp7pztsMdzDlfITF4nTFMpiVnJKKQFx\nBZI1+/CohqksXjfvQmkP0IQZKg==\n-----END PRIVATE KEY-----\n";

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