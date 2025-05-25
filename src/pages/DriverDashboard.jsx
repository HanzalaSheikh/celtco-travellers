// src/pages/DriverDashboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPlus } from 'react-icons/fa';

export default function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  const handleAddTrip = () => {
    const tripId = Date.now();
    setTrips([...trips, { id: tripId, name: `Trip ${trips.length + 1}` }]);
    navigate(`/driver-trip/${tripId}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">Driver Dashboard</h1>
          <p className="text-lg text-gray-700">
            Logged in as <span className="font-semibold">{user?.driverName}</span> from <span className="font-semibold">{user?.company}</span>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">Your Trips</h2>
            <button
              onClick={handleAddTrip}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700"
            >
              <FaPlus /> Add Trip
            </button>
          </div>

          {trips.length === 0 ? (
            <p className="text-gray-500">No trips added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/driver-trip/${trip.id}`)}
                  className="bg-blue-100 p-4 rounded-lg cursor-pointer hover:bg-blue-200 transition"
                >
                  <h3 className="text-lg font-semibold text-blue-800">{trip.name}</h3>
                  <p className="text-sm text-blue-600">Click to continue</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
