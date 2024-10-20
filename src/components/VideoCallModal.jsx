import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";

const VideoCallModal = ({ isOpen, onClose }) => {
  const [contactMethod, setContactMethod] = useState('');
  const [username, setUsername] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedModel, setSelectedModel] = useState('Model 1');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingPlatform, setMeetingPlatform] = useState('');

  const handleContactMethodSelect = (method) => {
    setContactMethod(method);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleModelSelect = (model) => {
    if (model === 'Model 3' && selectedPlan !== 'Video Call 30 Minutes') {
      toast.error("Model 3 can only be selected for video calls of 30 minutes. Please check Custom Video Call.");
      return;
    }
    setSelectedModel(model);
  };

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      toast.success("Slot is available");
    } else {
      toast.error("Please select both date and time");
    }
  };

  const getPriceForPlan = () => {
    switch (selectedPlan) {
      case 'Video Call 10 Minutes': return '₹299';
      case 'Video Call 15 Minutes': return '₹539';
      case 'Video Call 30 Minutes': return '₹999';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Video Call Booking</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            {['Instagram', 'Telegram', 'Whatsapp'].map((method) => (
              <Button key={method} onClick={() => handleContactMethodSelect(method)}>
                <img src={`/${method}.png`} alt={method} className="w-8 h-8" />
              </Button>
            ))}
          </div>
          
          {contactMethod && (
            <Input
              placeholder={`Enter ${contactMethod} ${contactMethod === 'Whatsapp' ? 'Number' : 'Username'}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          
          <Select onValueChange={handlePlanSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Video Call 10 Minutes">Video Call 10 Minutes</SelectItem>
              <SelectItem value="Video Call 15 Minutes">Video Call 15 Minutes</SelectItem>
              <SelectItem value="Video Call 30 Minutes">Video Call 30 Minutes</SelectItem>
            </SelectContent>
          </Select>
          {selectedPlan && <p>Selected Plan: {selectedPlan}</p>}
          
          <div className="space-y-2">
            <p>Select Model:</p>
            <div className="flex space-x-2">
              <Button onClick={() => handleModelSelect('Model 1')}>Model 1</Button>
              <Button onClick={() => handleModelSelect('Model 2')}>Model 2</Button>
              <Button onClick={() => handleModelSelect('Model 3')}>Model 3</Button>
            </div>
            {selectedPlan !== 'Video Call 30 Minutes' && (
              <p className="text-sm text-red-500">Model 3 can only be selected for video calls of 30 minutes. Please check Custom Video Call.</p>
            )}
            {selectedModel && <p>Selected Model: {selectedModel}</p>}
          </div>
          
          <div className="space-y-2">
            <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
            <Select onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
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
            <Button onClick={handleDateTimeSelect}>Check Availability</Button>
          </div>
          
          <RadioGroup onValueChange={setMeetingPlatform}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Google Meet" id="google-meet" />
              <Label htmlFor="google-meet">Google Meet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Telegram" id="telegram" />
              <Label htmlFor="telegram">Telegram</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Instagram" id="instagram" />
              <Label htmlFor="instagram">Instagram</Label>
            </div>
          </RadioGroup>
          
          {selectedPlan && <p>Price: {getPriceForPlan()}</p>}
          
          <Button onClick={onClose}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallModal;