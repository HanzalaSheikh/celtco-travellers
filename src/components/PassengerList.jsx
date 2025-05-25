const PassengerList = ({ passengers }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4 text-purple-600">Passenger List</h2>
    <ul className="space-y-2">
      {passengers.map((p, index) => (
        <li key={index} className="border-b pb-2">
          <strong>{index + 1}. {p.name}</strong> - {p.idNumber}, {p.nationality}, {p.from} → {p.to}
        </li>
      ))}
    </ul>
  </div>
);

export default PassengerList;
