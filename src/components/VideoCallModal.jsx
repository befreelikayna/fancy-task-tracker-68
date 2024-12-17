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

  useEffect(() => {
    // Check if the selected model is exclusive and the duration is less than 30 minutes
    if (state.selectedModel?.isExclusive) {
      const duration = state.selectedPlan ? parseInt(state.selectedPlan.match(/\d+/)?.[0] || '0') : 0;
      if (duration < 30) {
        setState(prev => ({ ...prev, selectedModel: null }));
        toast.warning("Exclusive Model is only available for 30-minute or longer calls. Please select another model.");
      }
    }
  }, [state.selectedPlan]);

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
    if (!state.selectedPlan) return 0;
    
    const matches = state.selectedPlan.match(/\d+/);
    if (!matches) return 0;
    
    const duration = parseInt(matches[0]);
    
    if (duration <= 10) return 299;
    if (duration <= 15) return 549;
    if (duration === 30) return 999;
    if (duration < 30) {
      const additionalBlocks = Math.floor((duration - 15) / 5);
      return 549 + (additionalBlocks * 90);
    }
    // Beyond 30 minutes
    const additionalBlocks = Math.floor((duration - 30) / 5);
    return 999 + (additionalBlocks * 95);
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
          "Model Selected": state.selectedModel ? 
            (state.selectedModel.isExclusive ? "Exclusive Model" : state.selectedModel.name) 
            : "Not selected",
          "Meeting Platform": state.meetingPlatform
        }}
      />
    </>
  );
};

export default VideoCallModal;