import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reports') || '[]');
    const filtered = stored.filter(r => r.company === user?.company);
    setReports(filtered);
  }, [user]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-md text-gray-600">
            Logged in as <span className="font-semibold">{user?.email}</span> from <span className="font-semibold">{user?.company}</span>
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Submitted Reports</h2>

          {reports.length === 0 ? (
            <div className="alert alert-info shadow-lg">
              <span>No reports submitted yet.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Driver</th>
                    <th>Vehicle</th>
                    <th>Passengers</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.tripDate}</td>
                      <td>{report.driver}</td>
                      <td>{report.registrationNumber}</td>
                      <td>{report.passengers.length}</td>
                      <td>
                        <div className="badge badge-success">Submitted</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
