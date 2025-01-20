import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = ({ isOpen, onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = () => {
    if (credentials.username === 'Admin' && credentials.password === 'Nikh3110') {
      onLogin();
      onClose();
      toast.success('Successfully logged in as admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">Admin Login</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            className="bg-gray-800 text-gray-100 border-gray-700"
          />
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            className="bg-gray-800 text-gray-100 border-gray-700"
          />
          <Button onClick={handleLogin} className="bg-purple-600 hover:bg-purple-700">
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;