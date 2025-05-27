// 

// src/pages/AdminDashboard.jsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard by default
  useEffect(() => {
    if (location.pathname === '/admin-dashboard') {
      navigate('/admin-dashboard/overview');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
