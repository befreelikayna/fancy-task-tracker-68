import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ComingSoonModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">
            Coming Soon...
          </DialogTitle>
        </DialogHeader>
        <p className="py-4 text-gray-300">
          This feature is currently under development. Please check back later!
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonModal;