import jsPDF from 'jspdf';

export const generateInvoice = (orderDetails) => {
  const doc = new jsPDF();
  const invoiceDate = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${Date.now()}`;

  // Add content to PDF
  doc.setFontSize(22);
  doc.text('INVOICE', 105, 20, { align: 'center' });

  // Add logo (base64 image)
  const img = new Image();
  img.src = '/AnkitaSharma.png';
  doc.addImage(img, 'PNG', 85, 30, 40, 40);

  // Invoice details
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${invoiceNumber}`, 20, 90);
  doc.text(`Date: ${invoiceDate}`, 20, 100);
  doc.text(`Order Type: ${orderDetails.planName}`, 20, 110);

  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, 120, 170, 10, 'F');
  doc.text('Description', 30, 127);
  doc.text('Amount', 150, 127);

  // Table content
  doc.text(orderDetails.planName, 30, 140);
  doc.text(`₹${orderDetails.price}`, 150, 140);

  // Total
  doc.setFontSize(14);
  doc.text(`Total Amount: ₹${orderDetails.price}`, 150, 160, { align: 'right' });

  // Footer
  doc.setFontSize(12);
  doc.text('Thank you for your business!', 105, 200, { align: 'center' });
  doc.text('For any queries, please contact us on Instagram or Telegram', 105, 210, { align: 'center' });

  return doc;
};

export const downloadInvoice = (orderDetails) => {
  const doc = generateInvoice(orderDetails);
  doc.save(`invoice-${Date.now()}.pdf`);
};