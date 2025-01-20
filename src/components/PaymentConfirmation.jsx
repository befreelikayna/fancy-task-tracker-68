import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sendTelegramNotification } from '../utils/adminNotifications';

const PaymentConfirmation = ({ isOpen, onClose, orderDetails }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      setScreenshot(file);
    }
  };

  const handleSubmit = () => {
    if (!screenshot) {
      toast.error("Please upload payment screenshot");
      return;
    }

    setIsSubmitting(true);
    
    // Convert screenshot to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedOrderDetails = {
        ...orderDetails,
        paymentScreenshot: reader.result,
        status: 'Pending Confirmation',
        timestamp: new Date().toISOString()
      };

      // Send to admin notifications
      sendTelegramNotification(updatedOrderDetails);
      
      setIsSubmitting(false);
      toast.success("Order placed successfully! You will receive confirmation soon.");
      onClose();
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