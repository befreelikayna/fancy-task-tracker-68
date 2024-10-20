import React from 'react';
import { Button } from "@/components/ui/button";

const PaymentPage = ({ planName, price, additionalDetails = {} }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">{planName}</h1>
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
    </div>
  );
};

export default PaymentPage;