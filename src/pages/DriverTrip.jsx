// src/pages/DriverTrip.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import DriverForm from '../components/DriverForm';
import PassengerForm from '../components/PassengerForm';
import { useAuth } from '../context/AuthContext';

export default function DriverTrip() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // const [driver, setDriver] = useState({
  //   driverName: user?.driverName || '',
  //   residencyNumber: '',
  //   vehicleType: '',
  //   registrationNumber: '',
  //   totalPassengers: '',
  //   tripDate: ''
  // });

  const [passengers, setPassengers] = useState([]);

  const addPassenger = (p) => {
    if (passengers.length < 10) {
      setPassengers([...passengers, p]);
    } else {
      alert('Maximum 10 passengers allowed!');
    }
  };

  const deletePassenger = (index) => {
    const updated = passengers.filter((_, i) => i !== index);
    setPassengers(updated);
  };

  const handleSubmit = () => {
    const newReport = {
      id: Date.now(),
      tripId,
      driver,
      company: user.company,
      passengers,
      date: driver.tripDate
    };

    const stored = JSON.parse(localStorage.getItem('reports') || '[]');
    stored.push(newReport);
    localStorage.setItem('reports', JSON.stringify(stored));

    alert('Trip submitted!');
    navigate('/driver-dashboard');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">Trip Form</h1>
          <p className="text-lg text-gray-700">
            Driver: <span className="font-semibold">{user?.driverName}</span> — Company: <span className="font-semibold">{user?.company}</span>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Trip Information</h2>
           {/* <DriverForm driver={driver} setDriver={setDriver} />  */}
        </div>

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
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700"
          >
            Submit Trip Report
          </button>
        </div>
      </div>
    </div>
  );
}
