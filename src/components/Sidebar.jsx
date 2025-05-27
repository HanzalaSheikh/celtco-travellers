// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <NavLink to="/admin-dashboard/overview" className="block text-gray-700 hover:text-blue-600 font-medium">
          Dashboard
        </NavLink>
        <NavLink to="/admin-dashboard/drivers" className="block text-gray-700 hover:text-blue-600 font-medium">
          Drivers
        </NavLink>
        <NavLink to="/admin-dashboard/vehicles" className="block text-gray-700 hover:text-blue-600 font-medium">
          Vehicles
        </NavLink>
        <NavLink to="/admin-dashboard/reports" className="block text-gray-700 hover:text-blue-600 font-medium">
          Reports
        </NavLink>
      </nav>
    </div>
  );
}
