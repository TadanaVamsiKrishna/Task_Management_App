import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../index.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const { login } = useAuth();

  const handleSubmit = () => {
    if (username.trim()) {
      login(username, role);
      
      // Initialize users in localStorage if not exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (!users.find(u => u.username === username)) {
        users.push({ username, role });
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Task Manager</h2>
        <div className="login-card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;