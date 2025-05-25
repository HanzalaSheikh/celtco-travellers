// src/pages/DriverTrip.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PassengerForm from '../components/PassengerForm';
import { useAuth } from '../context/AuthContext';

export default function DriverTrip() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [passengers, setPassengers] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [tripData, setTripData] = useState({
    tripDate: '',
    totalPassengers: ''
  });

  const addPassenger = (p) => {
    if (!p.name || !p.from || !p.to || !p.idNumber) {
      alert('Please fill in all required fields: Name, ID Number, From, To');
      return;
    }

    if (passengers.length >= parseInt(tripData.totalPassengers)) {
      alert(`Cannot add more than ${tripData.totalPassengers} passengers.`);
      return;
    }

    setPassengers([...passengers, p]);
  };

  const deletePassenger = (index) => {
    const updated = passengers.filter((_, i) => i !== index);
    setPassengers(updated);
  };

  const handleSaveTrip = () => {
    if (!tripData.tripDate || !tripData.totalPassengers) {
      alert('Please enter Trip Date and Total Passengers before saving.');
      return;
    }
    setIsSaved(true);
  };

  const handleConfirmTrip = () => {
    if (passengers.length !== parseInt(tripData.totalPassengers)) {
      alert(`You must add exactly ${tripData.totalPassengers} passengers.`);
      return;
    }

    const confirmedTrips = JSON.parse(localStorage.getItem('confirmedTrips') || '[]');
    confirmedTrips.push({
      id: tripId,
      driverName: user.driverName,
      registrationNumber: user.registrationNumber,
      company: user.company,
      tripDate: tripData.tripDate,
      passengers
    });
    localStorage.setItem('confirmedTrips', JSON.stringify(confirmedTrips));

    navigate('/driver-dashboard');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">Trip Details</h1>
          <p className="text-lg text-gray-700">
            Driver: <span className="font-semibold">{user?.driverName}</span> — Reg#: <span className="font-semibold">{user?.registrationNumber}</span> — Company: <span className="font-semibold">{user?.company}</span>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={tripData.tripDate}
              onChange={(e) => setTripData({ ...tripData, tripDate: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              placeholder="Trip Date"
            />
            <input
              type="number"
              value={tripData.totalPassengers}
              onChange={(e) => setTripData({ ...tripData, totalPassengers: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              placeholder="Total Passengers"
            />
          </div>

          {!isSaved && (
            <div className="text-center">
              <button
                onClick={handleSaveTrip}
                className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700"
              >
                Save Trip
              </button>
            </div>
          )}
        </div>

        {isSaved && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Passengers</h2>
            <PassengerForm addPassenger={addPassenger} />

            <table className="table-auto w-full mt-6 text-sm border border-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">ID Number</th>
                  <th className="p-2">Nationality</th>
                  <th className="p-2">From</th>
                  <th className="p-2">To</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((p, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.idNumber}</td>
                    <td className="p-2">{p.nationality}</td>
                    <td className="p-2">{p.from}</td>
                    <td className="p-2">{p.to}</td>
                    <td className="p-2">
                      <button
                        onClick={() => deletePassenger(index)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-6">
              <button
                onClick={handleConfirmTrip}
                className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700"
              >
                Confirm Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  