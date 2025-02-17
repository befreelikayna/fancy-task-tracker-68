import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminPanel = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadLogs();
    }
  }, [isOpen]);

  const loadLogs = async () => {
    try {
      setIsLoading(true);
      console.log('Loading logs from localStorage...');
      const storedLogs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
      console.log('Fetched logs:', storedLogs);
      setLogs(Array.isArray(storedLogs) ? storedLogs : []);
    } catch (error) {
      console.error('Error loading logs:', error);
      toast.error("Failed to load logs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLogs = async () => {
    try {
      console.log('Clearing logs...');
      localStorage.setItem('adminLogs', '[]');
      setLogs([]);
      toast.success("Logs cleared successfully");
    } catch (error) {
      console.error('Error clearing logs:', error);
      toast.error("Failed to clear logs");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">Admin Panel</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <Button 
            onClick={handleClearLogs}
            variant="destructive"
            className="w-full"
          >
            Clear Logs
          </Button>
        </div>
        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
          {isLoading ? (
            <div className="text-center text-gray-400 mt-4">
              Loading logs...
            </div>
          ) : (
            <>
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
            </>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;