import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();
      setTasks([...tasks, { 
        id: Date.now(), 
        title: newTask, 
        date: formattedDate,
        time: formattedTime,
        priority: newPriority,
        completed: false 
      }]);
      setNewTask('');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="mb-8 text-white"
        >
          <ArrowLeft size={32} />
        </motion.button>
        
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">To-Do List 📝</h1>
          
          <div className="flex flex-col mb-6">
            <input
              type="text"
              placeholder="Add your task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500 text-gray-700"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500 text-gray-700"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={addTask}
              className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300"
            >
              ADD TASK
            </button>
          </div>

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
                <div className="flex flex-col">
                  <span className={`text-gray-800 ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {task.date} at {task.time} - {task.priority} priority
                  </span>
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
        </div>
      </div>
    </div>
  );
};

export default TodoList;
