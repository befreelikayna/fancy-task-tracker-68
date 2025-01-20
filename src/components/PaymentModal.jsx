import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PaymentConfirmation from './PaymentConfirmation';

const PaymentModal = ({ isOpen, onClose, planName, price, additionalDetails = {} }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleProceed = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gray-900 text-gray-100 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-100">{planName}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <p className="text-xl text-center mb-4 text-gray-300">Price: ₹{price}</p>
            
            {Object.entries(additionalDetails).map(([key, value]) => (
              <p key={key} className="text-sm mb-2 text-gray-300">
                <span className="font-semibold">{key}:</span> {value}
              </p>
            ))}
            
            <div className="flex justify-center my-6">
              <img src="/QR.png" alt="Payment QR Code" className="w-48 h-48 mx-auto object-cover" />
            </div>
            
            <Button 
              className="w-full mb-4 bg-gray-800 hover:bg-gray-700 text-gray-100"
              variant="outline"
              onClick={() => navigator.clipboard.writeText("npshorts23@oksbi")}
            >
              UPI ID: npshorts23@oksbi
            </Button>
            
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentConfirmation
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          onClose();
        }}
        orderDetails={{
          planName,
          price,
          ...additionalDetails
        }}
      />
    </>
  );
};

export default PaymentModal;