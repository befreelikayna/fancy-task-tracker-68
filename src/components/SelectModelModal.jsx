import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const models = [
  { name: 'Model 1', image: '/Model1.jpeg' },
  { name: 'Model 2', image: '/Model2.jpeg' },
  { name: 'Model 3', image: '/Model3.jpeg' },
];

const SelectModelModal = ({ isOpen, onClose, onSelect, selectedPlan }) => {
  const handleModelSelect = (model) => {
    if (model.name === 'Model 3' && selectedPlan !== 'Video Call 30 Minutes') {
      alert("Model 3 can only be selected for video calls of 30 minutes. Please check Custom Video Call.");
      return;
    }
    onSelect(model);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">Select Model</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {models.map((model) => (
            <Button
              key={model.name}
              onClick={() => handleModelSelect(model)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-100 flex items-center space-x-4"
            >
              <img src={model.image} alt={model.name} className="w-12 h-12 rounded-full mx-auto object-cover" />
              <span>{model.name}</span>
            </Button>
          ))}
          {selectedPlan !== 'Video Call 30 Minutes' && (
            <p className="text-sm text-red-400">Note: Model 3 can only be selected for video calls of 30 minutes.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectModelModal;