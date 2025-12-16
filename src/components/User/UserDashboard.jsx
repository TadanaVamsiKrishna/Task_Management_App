import React, { useState, useEffect } from 'react';  // ← ADD useState and useEffect
import { useAuth } from '../../context/AuthContext';
import TaskCard from '@/components/Common/TaskCard';


const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    loadTasks();
  }, [currentUser]);

  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const userTasks = storedTasks.filter(t => t.assignedTo === currentUser.username);
    setTasks(userTasks);
  };

  const handleComplete = (taskId) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = allTasks.map(t =>
      t.id === taskId ? { ...t, status: 'completed', completedAt: new Date().toISOString() } : t
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks();
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">User Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, <span className="font-semibold">{currentUser?.username}</span></span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Pending Tasks 
              <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                {pendingTasks.length}
              </span>
            </h2>
            {pendingTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pending tasks</p>
            ) : (
              <div className="space-y-4">
                {pendingTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Completed Tasks
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {completedTasks.length}
              </span>
            </h2>
            {completedTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No completed tasks yet</p>
            ) : (
              <div className="space-y-4">
                {completedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;