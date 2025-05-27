import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DriversPage() {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    driverName: '',
    residencyNumber: '',
    registrationNumber: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('drivers') || '[]');
    const filtered = stored.filter(d => d.company === user.company);
    setDrivers(filtered);
  }, [user]);

  const handleChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const handleAddDriver = (e) => {
    e.preventDefault();

    const { driverName, residencyNumber, registrationNumber } = newDriver;

    if (!driverName || !residencyNumber || !registrationNumber) {
      return alert('Please fill all required fields.');
    }

    const existing = JSON.parse(localStorage.getItem('drivers') || '[]');
    const updated = [
      ...existing,
      {
        ...newDriver,
        company: user.company,
      },
    ];

    localStorage.setItem('drivers', JSON.stringify(updated));
    setDrivers(updated.filter(d => d.company === user.company));

    setNewDriver({ driverName: '', residencyNumber: '', registrationNumber: '' });
  };

  const handleDelete = (residencyNumber) => {
    const updated = drivers.filter(d => d.residencyNumber !== residencyNumber);
    const all = JSON.parse(localStorage.getItem('drivers') || '[]').filter(d => d.residencyNumber !== residencyNumber);

    localStorage.setItem('drivers', JSON.stringify(all));
    setDrivers(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Drivers</h1>

      <form onSubmit={handleAddDriver} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-6">
        <input
          type="text"
          name="driverName"
          placeholder="Driver Name"
          value={newDriver.driverName}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="residencyNumber"
          placeholder="Residency Number"
          value={newDriver.residencyNumber}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={newDriver.registrationNumber}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1 sm:col-span-2"
        >
          Create Driver
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Drivers List</h2>
        {drivers.length === 0 ? (
          <p className="text-gray-500">No drivers found.</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Residency #</th>
                <th className="px-4 py-2">Reg. Number</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.residencyNumber} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2">{d.driverName}</td>
                  <td className="px-4 py-2">{d.residencyNumber}</td>
                  <td className="px-4 py-2">{d.registrationNumber}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(d.residencyNumber)}
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
