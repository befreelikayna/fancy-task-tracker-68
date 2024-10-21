import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import SelectModelModal from './SelectModelModal';
import PaymentModal from './PaymentModal';
import VideoCallForm from './VideoCallForm';

const initialState = {
  contactMethod: '',
  username: '',
  selectedPlan: '',
  selectedModel: null,
  selectedDate: null,
  selectedTime: '',
  meetingPlatform: '',
};

const VideoCallModal = ({ isOpen, onClose }) => {
  const [state, setState] = useState(initialState);
  const [isSelectModelOpen, setIsSelectModelOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setState(initialState);
    }
  }, [isOpen]);

  const handleModelSelect = (model) => {
    setState(prevState => ({ ...prevState, selectedModel: model }));
  };

  const handleDateTimeSelect = () => {
    if (state.selectedDate && state.selectedTime) {
      toast.success("Slot is available");
    } else {
      toast.error("Please select both date and time");
    }
  };

  const getPriceForPlan = () => {
    switch (state.selectedPlan) {
      case 'Video Call 10 Minutes': return 299;
      case 'Video Call 15 Minutes': return 539;
      case 'Video Call 30 Minutes': return 999;
      default: return 0;
    }
  };

  const handleConfirm = () => {
    if (!state.meetingPlatform) {
      toast.error("Please select a meeting platform");
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-100">Video Call Booking</DialogTitle>
          </DialogHeader>
          <VideoCallForm
            {...state}
            setContactMethod={(contactMethod) => setState(prevState => ({ ...prevState, contactMethod }))}
            setUsername={(username) => setState(prevState => ({ ...prevState, username }))}
            setSelectedPlan={(selectedPlan) => setState(prevState => ({ ...prevState, selectedPlan }))}
            setIsSelectModelOpen={setIsSelectModelOpen}
            setSelectedDate={(selectedDate) => setState(prevState => ({ ...prevState, selectedDate }))}
            setSelectedTime={(selectedTime) => setState(prevState => ({ ...prevState, selectedTime }))}
            setMeetingPlatform={(meetingPlatform) => setState(prevState => ({ ...prevState, meetingPlatform }))}
            handleDateTimeSelect={handleDateTimeSelect}
            getPriceForPlan={getPriceForPlan}
            handleConfirm={handleConfirm}
          />
        </DialogContent>
      </Dialog>
      <SelectModelModal 
        isOpen={isSelectModelOpen} 
        onClose={() => setIsSelectModelOpen(false)} 
        onSelect={handleModelSelect}
        selectedPlan={state.selectedPlan}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        planName={state.selectedPlan}
        price={getPriceForPlan()}
        additionalDetails={{
          "Plan Type": "Video Call",
          "Model Selected": state.selectedModel ? state.selectedModel.name : "Not selected",
          "Meeting Platform": state.meetingPlatform
        }}
      />
    </>
  );
};

export default VideoCallModal;