import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import SelectModelModal from './SelectModelModal';

const VideoCallModal = ({ isOpen, onClose }) => {
  const [contactMethod, setContactMethod] = useState('');
  const [username, setUsername] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingPlatform, setMeetingPlatform] = useState('');
  const [isSelectModelOpen, setIsSelectModelOpen] = useState(false);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleContactMethodSelect = (method) => {
    setContactMethod(method);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    if (selectedModel && selectedModel.name === 'Model 3' && plan !== 'Video Call 30 Minutes') {
      setSelectedModel(null);
    }
  };

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      toast.success("Slot is available");
    } else {
      toast.error("Please select both date and time");
    }
  };

  useEffect(() => {
    if (!isSelectModelOpen && selectedModel) {
      document.querySelectorAll('[id^="model-image-"]').forEach(img => {
        img.classList.add('hidden');
      });
    }
  }, [isSelectModelOpen, selectedModel]);

  const getPriceForPlan = () => {
    switch (selectedPlan) {
      case 'Video Call 10 Minutes': return '₹299';
      case 'Video Call 15 Minutes': return '₹539';
      case 'Video Call 30 Minutes': return '₹999';
      default: return '';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-100">Video Call Booking</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              {['Instagram', 'Telegram', 'Whatsapp'].map((method) => (
                <Button 
                  key={method} 
                  onClick={() => handleContactMethodSelect(method)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                >
                  <img src={`/${method}.png`} alt={method} className="w-8 h-8 mx-auto object-cover" />
                </Button>
              ))}
            </div>
            
            {contactMethod && (
              <Input
                placeholder={`Enter ${contactMethod} ${contactMethod === 'Whatsapp' ? 'Number' : 'Username'}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 text-gray-100 border-gray-700"
              />
            )}
            
            <Select onValueChange={handlePlanSelect}>
              <SelectTrigger className="bg-gray-800 text-gray-100 border-gray-700">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                <SelectItem value="Video Call 10 Minutes">Video Call 10 Minutes</SelectItem>
                <SelectItem value="Video Call 15 Minutes">Video Call 15 Minutes</SelectItem>
                <SelectItem value="Video Call 30 Minutes">Video Call 30 Minutes</SelectItem>
              </SelectContent>
            </Select>
            {selectedPlan && <p className="text-gray-300">Selected Plan: {selectedPlan}</p>}
            
            <div className="space-y-2">
              <Button 
                onClick={() => setIsSelectModelOpen(true)}
                className="bg-gray-800 hover:bg-gray-700 text-gray-100"
              >
                Select Model
              </Button>
              {selectedModel && (
                <div className="flex items-center space-x-2">
                  <img src={selectedModel.image} alt={selectedModel.name} className="w-12 h-12 rounded-full mx-auto object-cover" />
                  <p className="text-gray-300">Selected Model: {selectedModel.name}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <DatePicker 
                date={selectedDate} 
                onDateChange={setSelectedDate}
                className="bg-gray-800 text-gray-100 border-gray-700"
              />
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-gray-800 text-gray-100 border-gray-700">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                  {Array.from({ length: 10 }, (_, i) => i + 17).map((hour) => (
                    <SelectItem key={hour} value={`${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`}>
                      {`${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`}
                    </SelectItem>
                  ))}
                  {[1, 2].map((hour) => (
                    <SelectItem key={hour} value={`${hour}:00 AM`}>
                      {`${hour}:00 AM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleDateTimeSelect}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Check Availability
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Select Meeting Platform *</Label>
              <div className="flex justify-between gap-2">
                {['Google Meet', 'Telegram', 'Instagram'].map((platform) => (
                  <Button
                    key={platform}
                    onClick={() => setMeetingPlatform(platform)}
                    className={`flex-1 ${meetingPlatform === platform ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700 text-white`}
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>
            
            {selectedPlan && <p className="text-gray-300">Price: {getPriceForPlan()}</p>}
            
            <Button 
              onClick={() => {
                if (!meetingPlatform) {
                  toast.error("Please select a meeting platform");
                } else {
                  onClose();
                  toast.success("Booking confirmed!");
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <SelectModelModal 
        isOpen={isSelectModelOpen} 
        onClose={() => setIsSelectModelOpen(false)} 
        onSelect={handleModelSelect}
        selectedPlan={selectedPlan}
      />
    </>
  );
};

export default VideoCallModal;
