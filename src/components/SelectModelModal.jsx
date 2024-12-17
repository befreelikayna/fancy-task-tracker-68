import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const models = [
  { name: 'Model 1', image: '/Model1.jpeg' },
  { name: 'Model 2', image: '/Model2.jpeg' },
  { name: 'Model 3', image: '/Model3.jpeg' },
  { name: 'Model 4', image: '/Model4.jpeg' },
  { name: 'Model 5', image: '/Model5.jpeg' },
  { 
    name: 'Exclusive Model', 
    images: [
      '/Exclusive.jpeg',
      '/Exclusive1.jpeg',
      '/Exclusive2.jpeg',
      '/Exclusive3.jpeg'
    ],
    isExclusive: true
  }
];

const SelectModelModal = ({ isOpen, onClose, onSelect, selectedPlan }) => {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setSelectedModel(models[0]);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setCurrentImageIndex(0);
  };

  const handleConfirmSelection = () => {
    onSelect(selectedModel);
    onClose();
  };

  const isExclusiveDisabled = () => {
    if (!selectedModel.isExclusive) return false;
    if (!selectedPlan) return true;
    
    const duration = parseInt(selectedPlan.match(/\d+/)?.[0] || '0');
    return duration < 30;
  };

  const ModelImage = ({ model }) => {
    if (model.isExclusive) {
      return (
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {model.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center items-center h-[400px]">
                    <img
                      src={image}
                      alt={`${model.name} ${index + 1}`}
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex justify-center mt-2 space-x-2">
            {model.images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center h-[400px]">
        <img
          src={model.image}
          alt={model.name}
          className="max-h-full max-w-full w-auto h-auto object-contain"
        />
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">Select Model</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            {models.map((model) => (
              <Button
                key={model.name}
                onClick={() => handleModelSelect(model)}
                className={`bg-gray-800 hover:bg-gray-700 text-gray-100 ${
                  selectedModel.name === model.name ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {model.name}
              </Button>
            ))}
          </div>
          
          {isExclusiveDisabled() && (
            <p className="text-sm text-red-400">
              Note: Exclusive Model can only be selected for video calls of 30 minutes or more.
            </p>
          )}
          
          <div className="mt-4">
            <ModelImage model={selectedModel} />
          </div>
          
          <Button
            onClick={handleConfirmSelection}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isExclusiveDisabled()}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectModelModal;