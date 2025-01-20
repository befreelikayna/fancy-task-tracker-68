import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminPanel = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const storedLogs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
      setLogs(storedLogs);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">Admin Panel</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
          {logs.map((log, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <div className="font-bold text-purple-400">Order Type: {log.type}</div>
              <div className="text-sm text-gray-300 mt-2">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </div>
              {log.details.paymentScreenshot && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Payment Screenshot:</p>
                  <img 
                    src={log.details.paymentScreenshot} 
                    alt="Payment Screenshot" 
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <div className="text-xs text-gray-400 mt-2">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              No logs available
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;