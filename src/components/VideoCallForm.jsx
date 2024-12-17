import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";

const VideoCallForm = ({
  contactMethod,
  setContactMethod,
  username,
  setUsername,
  selectedPlan,
  setSelectedPlan,
  selectedModel,
  setIsSelectModelOpen,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  meetingPlatform,
  setMeetingPlatform,
  handleDateTimeSelect,
  getPriceForPlan,
  handleConfirm
}) => {
  const [customDuration, setCustomDuration] = useState('10');

  const handleCustomDurationChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomDuration(value);
      
      if (value === '') {
        setSelectedPlan('custom');
        return;
      }

      const duration = parseInt(value);
      if (duration >= 10 && duration % 5 === 0) {
        setSelectedPlan(`Video Call ${duration} Minutes`);
      } else if (duration !== 0) {
        toast.error("Duration must be in multiples of 5 minutes and minimum 10 minutes");
        setSelectedPlan('custom');
      }
    }
  };

  React.useEffect(() => {
    if (selectedPlan === 'custom') {
      setSelectedPlan(`Video Call ${customDuration} Minutes`);
    }
  }, []);

  return (
    <div className="grid gap-6 py-4">
      <div className="grid grid-cols-3 gap-4">
        {['Instagram', 'Telegram', 'Whatsapp'].map((method) => (
          <Button 
            key={method} 
            onClick={() => setContactMethod(method)}
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
      
      <div className="space-y-4">
        <Select 
          value={selectedPlan} 
          onValueChange={(value) => {
            setSelectedPlan(value);
            if (value === 'custom') {
              setCustomDuration('10');
            }
          }}
        >
          <SelectTrigger className="bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="Select Plan" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            <SelectItem value="Video Call 10 Minutes">Video Call 10 Minutes</SelectItem>
            <SelectItem value="Video Call 15 Minutes">Video Call 15 Minutes</SelectItem>
            <SelectItem value="Video Call 30 Minutes">Video Call 30 Minutes</SelectItem>
            <SelectItem value="custom">Custom Duration</SelectItem>
          </SelectContent>
        </Select>

        {(selectedPlan === 'custom' || customDuration) && (
          <div className="space-y-2">
            <Label className="text-gray-300">Enter Duration (minutes)</Label>
            <Input
              type="number"
              min="10"
              step="5"
              value={customDuration}
              onChange={handleCustomDurationChange}
              placeholder="Enter duration in minutes"
              className="bg-gray-800 text-gray-100 border-gray-700"
            />
            <p className="text-sm text-gray-400">Duration must be in multiples of 5 minutes (minimum 10 minutes)</p>
          </div>
        )}
      </div>
      
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
      
      {selectedPlan && <p className="text-gray-300">Price: ₹{getPriceForPlan()}</p>}
      
      <Button 
        onClick={handleConfirm}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Confirm
      </Button>
    </div>
  );
};

export default VideoCallForm;