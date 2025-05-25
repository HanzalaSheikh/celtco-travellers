// src/pages/DriverDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';

export default function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const confirmed = JSON.parse(localStorage.getItem('confirmedTrips') || '[]');
    setTrips(confirmed.filter(t => t.driverName === user?.driverName && t.company === user?.company));
  }, [user]);

  const handleSubmitReport = (trip) => {
    const report = {
      ...trip,
      id: Date.now(),
      submitted: true
    };
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
    alert('Report submitted to admin');
  };

  const handleAddTrip = () => {
    const tripId = Date.now();
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
              className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700"
            >
              + Add Trip
            </button>
          </div>

          {trips.length === 0 ? (
            <p className="text-gray-500">No confirmed trips yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trips.map((trip) => (
                <div key={trip.id} className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-700">Trip on {trip.tripDate}</h3>
                  <p className="text-sm text-gray-600">Passengers: {trip.passengers.length}</p>
                  <p className="text-sm text-gray-600 mb-2">Reg#: {trip.registrationNumber}</p>

                    {trip.submitted ? (
                      <span className="text-green-600 font-semibold">Report Submitted</span>
                    ) : (
                      <button
                        onClick={() => handleSubmitReport(trip)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow hover:bg-blue-700"
                      >
                        <FaPaperPlane /> Submit Report
                      </button>
                    )}


                  {/* <button
                    onClick={() => handleSubmitReport(trip)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow hover:bg-blue-700"
                  >
                    <FaPaperPlane /> Submit Report
                  </button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
