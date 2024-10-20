import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PaymentModal = ({ isOpen, onClose, planName, price, additionalDetails = {} }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{planName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-xl text-center mb-4">Price: ₹{price}</p>
          
          {Object.entries(additionalDetails).map(([key, value]) => (
            <p key={key} className="text-sm mb-2">
              <span className="font-semibold">{key}:</span> {value}
            </p>
          ))}
          
          <div className="flex justify-center my-6">
            <img src="/QR.png" alt="Payment QR Code" className="w-48 h-48 mx-auto object-cover" />
          </div>
          
          <Button 
            className="w-full mb-4"
            variant="outline"
            onClick={() => navigator.clipboard.writeText("npshorts23@oksbi")}
          >
            UPI ID: npshorts23@oksbi
          </Button>
          
          <Button className="w-full">
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;