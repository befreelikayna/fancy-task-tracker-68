import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBackground from '../components/LiveBackground';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    setNewDate(now.toISOString().split('T')[0]);
    setNewTime(now.toTimeString().split(' ')[0].slice(0, 5));
  }, []);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        title: newTask, 
        date: newDate,
        time: newTime,
        priority: newPriority,
        completed: false 
      }]);
      setNewTask('');
      const now = new Date();
      setNewDate(now.toISOString().split('T')[0]);
      setNewTime(now.toTimeString().split(' ')[0].slice(0, 5));
      setNewPriority('medium');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LiveBackground />
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="mb-8 text-white"
        >
          <ArrowLeft size={32} />
        </motion.button>
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-8 border border-white">
          <h1 className="text-4xl font-bold text-white mb-6">To-Do List 📝</h1>
          
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Add your task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white placeholder-white"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-32 p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white"
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-32 p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-40 p-3 border-2 border-white rounded-lg focus:outline-none focus:border-purple-500 bg-white bg-opacity-50 text-white"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
            >
              Add Task
            </button>
          </div>

          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between p-4 mb-4 rounded-lg border border-white ${
                  task.completed ? 'bg-green-400 bg-opacity-50' : 'bg-white bg-opacity-50'
                } transition-colors duration-300 ease-in-out`}
              >
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleComplete(task.id)}
                    className={`mr-4 ${task.completed ? 'text-green-700' : 'text-white'}`}
                  >
                    <CheckCircle size={24} />
                  </motion.button>
                  <div className="flex flex-col">
                    <span className={`text-white font-semibold ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </span>
                    <span className="text-sm text-white">
                      {task.date} at {task.time} - {task.priority} priority
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTask(task.id)}
                  className="text-white hover:text-red-300"
                >
                  <Trash2 size={24} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
