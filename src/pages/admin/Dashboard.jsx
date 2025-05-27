import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaTruck, FaFileAlt, FaMapMarkedAlt } from 'react-icons/fa';

export default function Dashboard() {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const allDrivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    const allVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    const allReports = JSON.parse(localStorage.getItem('reports') || '[]');

    setDrivers(allDrivers.filter((d) => d.company === user.company));
    setVehicles(allVehicles);
    setReports(allReports.filter((r) => r.company === user.company));
  }, [user]);

  const activeVehicles = vehicles.filter((v) => v.status === 'In Use').length;
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'Maintenance').length;
  const freeVehicles = vehicles.filter((v) => v.status === 'Free').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Company Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={<FaUser />} title="Total Drivers" value={drivers.length} change="+2" />
        <DashboardCard icon={<FaTruck />} title="Active Vehicles" value={activeVehicles} change="0" />
        <DashboardCard icon={<FaFileAlt />} title="Reports Generated" value={reports.length} change="+5" />
        <DashboardCard icon={<FaMapMarkedAlt />} title="Active Routes" value={8} change="+1" />
      </div>

      {/* Lower Section: Reports + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <div className="col-span-2 bg-white rounded shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
          <ul className="space-y-3">
            {reports.slice(-5).reverse().map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100"
              >
                <div>
                  <p className="font-medium text-blue-700">Passenger Transport Report #{reports.length - i}</p>
                  <p className="text-xs text-gray-500">Generated {Math.floor(Math.random() * 5) + 1} hours ago</p>
                </div>
                <button className="text-blue-600 hover:underline text-sm">View</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Vehicle Status */}
        <div className="bg-white rounded shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Vehicle Status</h2>
          <StatusBar label="Active" value={activeVehicles} color="bg-green-500" />
          <StatusBar label="Maintenance" value={maintenanceVehicles} color="bg-yellow-400" />
          <StatusBar label="Free" value={freeVehicles} color="bg-gray-400" />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, value, change }) {
  return (
    <div className="bg-white p-5 rounded shadow flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-blue-700">{value} <span className="text-green-600 text-base ml-1">{change}</span></h2>
      </div>
      <div className="text-3xl text-blue-500">{icon}</div>
    </div>
  );
}

function StatusBar({ label, value, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(100, value * 10)}%` }} />
      </div>
    </div>
  );
}
