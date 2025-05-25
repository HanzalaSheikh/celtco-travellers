// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DriverLogin from './pages/DriverLogin';
import DriverSignup from './pages/DriverSignup';
import DriverDashboard from './pages/DriverDashboard';
import DriverTrip from './pages/DriverTrip';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/driver-login" />} />

      {/* Driver routes */}
      <Route path="/driver-login" element={<DriverLogin />} />
      <Route path="/driver-signup" element={<DriverSignup />} />
      <Route
        path="/driver-dashboard"
        element={
          <ProtectedRoute allowedRole="driver">
            <DriverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driver-trip/:tripId"
        element={
          <ProtectedRoute allowedRole="driver">
            <DriverTrip />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-signup" element={<AdminSignup />} />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
