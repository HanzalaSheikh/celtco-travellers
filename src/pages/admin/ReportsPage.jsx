import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { generateTripPDF } from '../../utils/generatePdf';


export default function ReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);

  const handleViewPDF = async (report) => {
    // Use the actual window location origin for the QR code URL
    const reportUrl = `${window.location.origin}/report/${report.id}`;
    await generateTripPDF(report, reportUrl);
  };

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    const filtered = storedReports.filter((r) => r.company === user?.company);
    setReports(filtered);
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Submitted Reports</h1>

      <div className="bg-white p-6 rounded shadow">
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Driver</th>
                  <th className="px-4 py-2">Vehicle</th>
                  <th className="px-4 py-2">Total Passengers</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">View PDF</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-blue-50">
                    <td className="px-4 py-2">{report.tripDate}</td>
                    <td className="px-4 py-2">{report.driver}</td>
                    <td className="px-4 py-2">{report.registrationNumber}</td>
                    <td className="px-4 py-2">{report.passengers.length}</td>
                    <td className="px-4 py-2 text-green-600 font-medium">Submitted</td>
                    <td className="px-4 py-2"><button onClick={() => handleViewPDF(report)} className="text-blue-600 hover:underline text-sm">View PDF</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
