import React, { useState } from 'react';

const PassengerForm = ({ addPassenger }) => {
  const [passenger, setPassenger] = useState({
    name: '',
    idNumber: '',
    nationality: '',
    from: '',
    to: '',
  });

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPassenger(passenger);
    setPassenger({ name: '', idNumber: '', nationality: '', from: '', to: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-green-600">Add Passenger</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={passenger.name} onChange={handleChange} placeholder="Passenger Name" className="border rounded px-4 py-2" />
        <input name="idNumber" value={passenger.idNumber} onChange={handleChange} placeholder="Passport/Iqama Number" className="border rounded px-4 py-2" />
        <input name="nationality" value={passenger.nationality} onChange={handleChange} placeholder="Nationality" className="border rounded px-4 py-2" />
        <input name="from" value={passenger.from} onChange={handleChange} placeholder="From" className="border rounded px-4 py-2" />
        <input name="to" value={passenger.to} onChange={handleChange} placeholder="To" className="border rounded px-4 py-2" />
      </div>
      <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Add Passenger</button>
    </form>
  );
};

export default PassengerForm;
