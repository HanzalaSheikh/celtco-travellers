import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function VehiclesPage() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    model: '',
    registrationNumber: '',
    status: 'Free',
    assignedTo: ''
  });

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    const storedDrivers = JSON.parse(localStorage.getItem('drivers') || '[]');

    const companyDrivers = storedDrivers.filter(d => d.company === user.company);
    setVehicles(storedVehicles);
    setDrivers(companyDrivers);
  }, [user]);

  const handleChange = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const { model, registrationNumber } = newVehicle;

    if (!model || !registrationNumber) {
      return alert('Model and Registration Number are required.');
    }

    const updated = [...vehicles, newVehicle];
    localStorage.setItem('vehicles', JSON.stringify(updated));
    setVehicles(updated);
    setNewVehicle({ model: '', registrationNumber: '', status: 'Free', assignedTo: '' });
  };

  const handleDelete = (regNo) => {
    const updated = vehicles.filter(v => v.registrationNumber !== regNo);
    setVehicles(updated);
    localStorage.setItem('vehicles', JSON.stringify(updated));
  };

  const handleStatusChange = (regNo, newStatus) => {
    const updated = vehicles.map(v =>
      v.registrationNumber === regNo ? { ...v, status: newStatus } : v
    );
    setVehicles(updated);
    localStorage.setItem('vehicles', JSON.stringify(updated));
  };

  const handleAssignDriver = (regNo, driverName) => {
    const updated = vehicles.map(v =>
      v.registrationNumber === regNo
        ? { ...v, assignedTo: driverName, status: 'In Use' }
        : v
    );
    setVehicles(updated);
    localStorage.setItem('vehicles', JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Vehicles</h1>

      {/* Add vehicle */}
      <form onSubmit={handleAddVehicle} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-6">
        <input
          type="text"
          name="model"
          placeholder="Vehicle Model"
          value={newVehicle.model}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={newVehicle.registrationNumber}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1 sm:col-span-2"
        >
          Add Vehicle
        </button>
      </form>

      {/* Vehicle list */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Vehicle List</h2>
        {vehicles.length === 0 ? (
          <p className="text-gray-500">No vehicles found.</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">Reg. No</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Assigned To</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.registrationNumber} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2">{v.model}</td>
                  <td className="px-4 py-2">{v.registrationNumber}</td>
                  <td className="px-4 py-2">
                    <select
                      value={v.status}
                      onChange={(e) => handleStatusChange(v.registrationNumber, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="Free">Free</option>
                      <option value="In Use">In Use</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={v.assignedTo || ''}
                      onChange={(e) => handleAssignDriver(v.registrationNumber, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="">-- Select Driver --</option>
                      {drivers.map(d => (
                        <option key={d.residencyNumber} value={d.driverName}>
                          {d.driverName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(v.registrationNumber)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
