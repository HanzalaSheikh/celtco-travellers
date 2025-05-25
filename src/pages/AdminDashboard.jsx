import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale);
import { useAuth } from "../context/AuthContext";


export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const { user } = useAuth();




const data = {
  labels: reports.map((r) => r.date),
  datasets: [
    {
      label: 'Reports Submitted',
      data: reports.map((r) => r.passengers.length),
      backgroundColor: 'rgba(59,130,246,0.6)'
    }
  ]
};


    useEffect(() => {
    const all = JSON.parse(localStorage.getItem('reports') || '[]');
    const filtered = all.filter((r) => r.company === user.company);
    setReports(filtered);
    }, []);

  // Simulated data fetch
  useEffect(() => {
    // Later, replace with an API call
    const dummyData = [
      {
        id: 'rpt001',
        driverName: 'Inzemam Ul Haq',
        residencyNumber: '2530722947',
        vehicleType: 'Hyundai Starex 9697 RXA',
        registrationNumber: '493790120',
        totalPassengers: 6,
        tripDate: '2025-03-04',
        passengers: [
          { name: 'Amna', idNumber: 'HJ5759832' },
          { name: 'Saleem', idNumber: 'ER5751813' },
          { name: 'Waqas', idNumber: 'BC6313132' },
          // ...
        ]
      },
      // more reports...
    ];

    setReports(dummyData);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold text-blue-600">Driver: {report.driverName}</h2>
              <p><strong>Vehicle:</strong> {report.vehicleType}</p>
              <p><strong>Registration No:</strong> {report.registrationNumber}</p>
              <p><strong>Total Passengers:</strong> {report.totalPassengers}</p>
              <p><strong>Date:</strong> {report.tripDate}</p>

              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-blue-500">View Passengers</summary>
                <ul className="mt-2 list-disc ml-6 text-sm">
                  {report.passengers.map((p, i) => (
                    <li key={i}>{p.name} – {p.idNumber}</li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}
    <Bar data={data} />

    </div>

  );
}
