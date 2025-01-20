export const generateInvoice = (orderDetails) => {
  const invoiceDate = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${Date.now()}`;

  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .invoice-details { margin-bottom: 30px; }
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .total { text-align: right; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>INVOICE</h1>
        <img src="/AnkitaSharma.png" alt="Logo" style="width: 100px; height: 100px; border-radius: 50%;">
      </div>
      
      <div class="invoice-details">
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <p><strong>Date:</strong> ${invoiceDate}</p>
        <p><strong>Order Type:</strong> ${orderDetails.planName}</p>
      </div>

      <table class="invoice-table">
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>${orderDetails.planName}</td>
          <td>₹${orderDetails.price}</td>
        </tr>
      </table>

      <div class="total">
        <h3>Total Amount: ₹${orderDetails.price}</h3>
      </div>

      <div style="margin-top: 50px; text-align: center;">
        <p>Thank you for your business!</p>
        <p>For any queries, please contact us on Instagram or Telegram</p>
      </div>
    </body>
    </html>
  `;

  return invoiceHTML;
};

export const downloadInvoice = (orderDetails) => {
  const invoiceHTML = generateInvoice(orderDetails);
  const blob = new Blob([invoiceHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${Date.now()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};