import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PublicReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const allReports = JSON.parse(localStorage.getItem('reports') || '[]');
    const found = allReports.find(r => String(r.id) === id);
    setReport(found || null);
  }, [id]);

  if (!report) {
    return <div className="p-10 text-center text-red-600 font-bold">Report Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-700 text-center">Trip Report</h1>

        <div className="space-y-1 text-sm">
          <p><strong>Driver:</strong> {report.driverName}</p>
          <p><strong>Residency Number:</strong> {report.residencyNumber}</p>
          <p><strong>Company:</strong> {report.company}</p>
          <p><strong>Vehicle:</strong> {report.vehicleType} ({report.registrationNumber})</p>
          <p><strong>Trip Date:</strong> {report.tripDate}</p>
          <p><strong>Total Passengers:</strong> {report.passengers?.length}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mt-4 border text-sm">
            <thead className="bg-blue-200">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">ID Number</th>
                <th className="p-2 border">Nationality</th>
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
              </tr>
            </thead>
            <tbody>
              {report.passengers.map((p, i) => (
                <tr key={i} className="even:bg-gray-100">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.idNumber}</td>
                  <td className="p-2 border">{p.nationality}</td>
                  <td className="p-2 border">{p.from}</td>
                  <td className="p-2 border">{p.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center text-gray-500 text-xs mt-6">
          Generated on: {new Date(Number(report.id)).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
