const SPREADSHEET_ID = '1tli1fZkwaXcbTOW52qXPlhHtWyvembbtOykKzpm6xrE';
const CLIENT_EMAIL = 'ankitasharma@celtic-artwork-447610-v2.iam.gserviceaccount.com';
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxds3GzCT3yQwa\ntw8jqDnsxMtl3I5fHzX2cQSCo+8UytadZYxPlZBLbtwnj4zz+R/gjRQcfCumYrWQ\nOydydI0K5SznFFpoGPr6SJ5yoO+61pTCSc0CXPJV4TpLQRMn5JupWKWZPRhaiWSB\n0tu8S/8SZIQeXmKuETayhZ7tt9SBHuXXLA4UwsBfF/Y8lu09AOqLOa4u3Mxx/XPM\n1vJsBaPPEmJ0ExmSNdMD1Gb44ptQtbVx19UNOeXJvjqzSx0UDzg+kPvBBXugfU+Z\njTBpctv1v8PggYYxzxzsQnKIzHs3jmYECl80pC5TmN1LpgNOAf8cuKr9QWEz+/wW\ny6KUddTtAgMBAAECggEAKUNItvHWIaglUJviYQXXTBp4+asGDo+E/lOKey7PYxwD\nuU64iHOr/KIe/fLWkQ7Kru1WsQXdJ1+ZvFrIwgfgGJmvbl5w4/X0+1eBwgDyJNUK\nez9qM+O1NCs9oOxVXif9WquiO4Z1YG3ESRxkW7ym5xmoj6AeHT+i4nEHwlnFRy0r\nIFpsdp5tSwqKsI4NbeRfJl/CHBbx3lEpG0ZLGRwa2sDS9S5uWV6+by6pLBwphDe2\noVZvGpuqnO/BO4/3m5ErWG7EFOphKUnIVqqsp/u64n3BGnc4ii+jGJ94U7l5Mbov\nBYHCXg5fi1HJ9Y6kfIA6emDIOap2jFrF4fx7utqAaQKBgQDWZVDH6hJQdMbAH/sJ\nEXpiRwbqyo5yH+gT7IdwWkekAEhY2B4QhtJAF5x43uFAOhipEqQCaSYa2fPsW5vN\nLdQcrwYRmNuVZIjlaR7ERPgukTVUadnHn+5O8OAYfafwiYDwAOBLG6Iqr6e5l868\nYrcxMSDz6mAae7vtzRbPzEShZQKBgQDT5s7GHiQ+e3qbQfjOpWuGnr4VojzbQ2md\nRbQUBPqzq0vr/9nPia4cEcKi2K2AZPW2RIgYj6To/nm8Qz6VF9LS/fyu0RyfOyly\nDnqJv+I85bmUDdTbJvCnm1akoaoGsEwjEG+LMMnGbU648TJG2owtVDR7IxSLtQPa\nlQOKHwww6QKBgQCL2DJE9E1V5ZXuo+2fEKN/j0zXwaAAmQdMV7BQfNLWCskmCnIx\n3X8vBzetL9RFjJ+hSONqHyQXx6rvtSF/SDFfNFsFB2vTmmwhF9xVsZcg6N6cXR8M\nsylCnKPP1cbBgy9zXV7wHuo8Za9Fw9u5zboogB86etqM68C9cFU83cS2cQKBgQCT\nDeVHlllex0CCCJmLhz8E0Jtn1gxXugPMcjgTgJUfJOxuXkMhBRJARo8Fhkt6BBaF\nJDAyo1U1oIyI+z2uKDdV14+JHnO3iU4s6iFeAT0XN/G+7o5efDqchm/tloexVp2v\n49MVDImq2+a68CANDdQkDQDSx7iVb8y535nyO7OxKQKBgQCrOmrf12SDCX8sZchq\nXhPltThu4hKAGQJjqyDa+pwOQA+CQN1oSJB+1CIhoHyxBg9uP3YH+yC2XfmtuhzB\n14Hmm+TeMyQ1GTgFRAel+g9KFortg5cH3Zp7pztsMdzDlfITF4nTFMpiVnJKKQFx\nBZI1+/CohqksXjfvQmkP0IQZKg==\n-----END PRIVATE KEY-----\n";

import jwt from 'jwt-encode';

async function getAccessToken() {
  try {
    console.log('Getting access token...');
    
    const now = Math.floor(Date.now() / 1000);
    const oneHour = 60 * 60;

    // Create the JWT claim
    const claim = {
      iss: CLIENT_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + oneHour,
      iat: now
    };

    // Sign the JWT with the private key
    const privateKey = PRIVATE_KEY.replace(/\\n/g, '\n');
    const assertion = jwt(claim, privateKey, { algorithm: 'RS256' });

    console.log('JWT created, requesting access token...');

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: assertion
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Token request failed:', errorText);
      throw new Error(`Token request failed: ${errorText}`);
    }

    const data = await response.json();
    console.log('Access token received successfully');
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

export const logOrderToGoogleSheet = async (orderDetails) => {
  try {
    console.log('Starting to log order to Google Sheets:', orderDetails);
    
    const accessToken = await getAccessToken();
    console.log('Got access token');

    const values = [
      [
        orderDetails.planName || '',
        orderDetails.price?.toString() || '',
        new Date().toISOString(),
        JSON.stringify(orderDetails)
      ]
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:D:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sheets API request failed:', errorText);
      throw new Error(`Sheets API request failed: ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully logged to Google Sheets:', data);
    return data;
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    throw error;
  }
}