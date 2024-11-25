import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaymentModal from './PaymentModal';

const GroupModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [username, setUsername] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const groupPricing = {
    'Premium Group': {
      '2 Months': 399,
      '4 Months': 499,
      '6 Months': 599,
      '8 Months': 699,
      '10 Months': 799,
      '12 Months': 899,
      'Lifetime': 1999
    },
    'Exclusive Group': {
      '2 Months': 499,
      '4 Months': 799,
      '6 Months': 999,
      '8 Months': 1299,
      '10 Months': 1399,
      '12 Months': 1499,
      'Lifetime': 2999
    },
    'Real Cam CCTV Group': {
      '2 Months': 599,
      '4 Months': 899,
      '6 Months': 1199,
      '8 Months': 1499,
      '10 Months': 1699,
      '12 Months': 1999,
      'Lifetime': 4999
    }
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setStep(2);
  };

  const handleSubmit = () => {
    if (!username || !contactMethod || !selectedDuration) {
      return;
    }
    setShowPaymentModal(true);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedGroup('');
    setUsername('');
    setContactMethod('');
    setSelectedDuration('');
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-gray-900 text-gray-100 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-100">
              {step === 1 ? 'Select Group' : selectedGroup}
            </DialogTitle>
          </DialogHeader>

          {step === 1 ? (
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => window.open('https://t.me/demo_group', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 animate-pulse shadow-lg"
              >
                Join Demo Group
              </Button>
              {Object.keys(groupPricing).map((group) => (
                <Button
                  key={group}
                  onClick={() => handleGroupSelect(group)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-100 transform transition-all duration-200 hover:scale-105"
                >
                  {group}
                </Button>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 py-4">
              <Input
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 text-gray-100 border-gray-700"
              />

              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Select the platform where you'll like to receive the joining link.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {['Instagram', 'Telegram', 'Whatsapp'].map((method) => (
                    <Button 
                      key={method} 
                      onClick={() => setContactMethod(method)}
                      className={`bg-gray-800 hover:bg-gray-700 text-gray-100 ${
                        contactMethod === method ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img src={`/${method}.png`} alt={method} className="w-8 h-8 mx-auto object-cover" />
                    </Button>
                  ))}
                </div>
              </div>

              {contactMethod && (
                <Input
                  placeholder={`Enter ${contactMethod} ${contactMethod === 'Whatsapp' ? 'Number' : 'Username'}`}
                  className="bg-gray-800 text-gray-100 border-gray-700"
                />
              )}

              <Select onValueChange={setSelectedDuration}>
                <SelectTrigger className="bg-gray-800 text-gray-100 border-gray-700">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                  {Object.entries(groupPricing[selectedGroup] || {}).map(([duration, price]) => (
                    <SelectItem key={duration} value={duration}>
                      {`${duration} - ₹${price}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedDuration && (
                <p className="text-gray-300">
                  Price: ₹{groupPricing[selectedGroup][selectedDuration]}
                </p>
              )}

              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={!username || !contactMethod || !selectedDuration}
              >
                Proceed
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        planName={selectedGroup}
        price={selectedDuration ? groupPricing[selectedGroup][selectedDuration] : 0}
        additionalDetails={{
          'Duration': selectedDuration,
          'Contact Method': contactMethod
        }}
      />
    </>
  );
};

export default GroupModal;