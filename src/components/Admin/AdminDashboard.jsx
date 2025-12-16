import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import TaskList from './TaskList';
import UserList from './UserList';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });
  const [draggedTask, setDraggedTask] = useState(null);
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setTasks(storedTasks);
    setUsers(storedUsers.filter(u => u.role === 'user'));
  };

  const saveData = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleCreateTask = () => {
    if (newTask.title && newTask.assignedTo) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        status: 'pending',
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
      };
      const updatedTasks = [...tasks, task];
      saveData(updatedTasks);
      setNewTask({ title: '', description: '', assignedTo: '' });
    }
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnUser = (username) => {
    if (draggedTask && draggedTask.assignedTo !== username) {
      const updatedTasks = tasks.map(t =>
        t.id === draggedTask.id ? { ...t, assignedTo: username } : t
      );
      saveData(updatedTasks);
      setDraggedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, <span className="font-semibold">{currentUser?.username}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Task Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter description"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.username} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleCreateTask}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
                >
                  Create Task
                </button>
              </div>
            </div>

            {/* UserList Component */}
            <UserList 
              users={users}
              onDragOver={handleDragOver}
              onDropOnUser={handleDropOnUser}
            />
          </div>

          {/* TaskList Component - THIS IS THE FIX */}
          <div className="lg:col-span-2">
            <TaskList 
              tasks={tasks}
              onDragStart={handleDragStart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;