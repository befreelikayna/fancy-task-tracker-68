import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { downloadInvoice } from '../utils/invoiceGenerator';
import { useNavigate } from 'react-router-dom';
import { fetchLogs, updateLogs } from '../utils/jsonBinService';
import { logOrderToGoogleSheet } from '../utils/googleSheetsService';

const PaymentConfirmation = ({ isOpen, onClose, orderDetails }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setScreenshot(file);
    }
  };

  const handleSubmit = async () => {
    if (!screenshot) {
      toast.error("Please upload payment screenshot");
      return;
    }

    setIsSubmitting(true);
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const updatedOrderDetails = {
        ...orderDetails,
        paymentScreenshot: reader.result,
        status: 'Pending Confirmation',
        timestamp: new Date().toISOString()
      };

      try {
        // Log to JSONBin
        const existingLogs = await fetchLogs();
        const newLog = {
          type: updatedOrderDetails.planName ? 
            (updatedOrderDetails.planName.includes('Video Call') ? 'Video Call' : 'Group Order') 
            : 'Unknown',
          details: updatedOrderDetails,
          timestamp: new Date().toISOString()
        };
        existingLogs.unshift(newLog);
        await updateLogs(existingLogs);

        // Log to Google Sheets
        try {
          await logOrderToGoogleSheet(updatedOrderDetails);
          console.log('Successfully logged to Google Sheets');
        } catch (error) {
          console.error('Failed to log to Google Sheets:', error);
          // Don't block the order process if Google Sheets logging fails
          toast.error("Note: Failed to log to backup system");
        }
        
        setIsSubmitting(false);
        toast.success("Order placed successfully! You will receive confirmation soon.");
        
        downloadInvoice(updatedOrderDetails);
        
        onClose();
        navigate('/');
      } catch (error) {
        console.error('Error saving log:', error);
        toast.error("Failed to save order details");
        setIsSubmitting(false);
      }
    };

    reader.readAsDataURL(screenshot);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">
            Payment Confirmation
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              Please upload a screenshot of your payment
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-gray-800 text-gray-100 border-gray-700"
            />
          </div>

          {screenshot && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(screenshot)}
                alt="Payment Screenshot"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!screenshot || isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmation;