import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, CheckCircle } from 'lucide-react';
import LiveBackground from '../components/LiveBackground';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', date: '', time: '', priority: 'medium' });

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5);
    setNewTask(prev => ({ ...prev, date: formattedDate, time: formattedTime }));
  }, []);

  const addTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask(prev => ({ ...prev, title: '' }));
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
    <div className="min-h-screen relative">
      <LiveBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">To-Do List</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="flex-grow p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={addTask}
              className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-300 flex items-center"
            >
              <PlusCircle size={24} className="mr-2" /> Add Task
            </button>
          </div>
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-center justify-between p-4 mb-4 rounded-lg ${
                  task.completed ? 'bg-green-100' : 'bg-gray-100'
                } transition-colors duration-300 ease-in-out`}
              >
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleComplete(task.id)}
                    className={`mr-4 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
                  >
                    <CheckCircle size={24} />
                  </motion.button>
                  <div className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">
                      {task.date} {task.time} - Priority: {task.priority}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600"
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
