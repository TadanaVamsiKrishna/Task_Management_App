
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return currentUser.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
}

//export default App;