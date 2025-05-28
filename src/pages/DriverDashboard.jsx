// src/pages/DriverDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';
import { generateTripPDF } from '../utils/generatePdf';
// import { generateTripDOCX , downloadDOCX} from '../utils/generateDocx';


export default function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const confirmed = JSON.parse(localStorage.getItem('confirmedTrips') || '[]');
    setTrips(confirmed.filter(t => t.driverName === user?.driverName && t.company === user?.company));
  }, [user]);

 const handleSubmitReport = async (trip) => {
   try {
     // Create report object
     const report = {
       ...trip,
       id: Date.now(),
       submitted: true,
       submissionDate: new Date().toISOString()
     };

     // Save to local storage
     const reports = JSON.parse(localStorage.getItem('reports') || '[]');
     reports.push(report);
     localStorage.setItem('reports', JSON.stringify(reports));

     // Update the trip status in confirmedTrips
     const confirmedTrips = JSON.parse(localStorage.getItem('confirmedTrips') || '[]');
     const updatedTrips = confirmedTrips.map(t => 
       t.id === trip.id ? { ...t, submitted: true } : t
     );
     localStorage.setItem('confirmedTrips', JSON.stringify(updatedTrips));

     // Generate QR code URL for the report
     const qrUrl = `${window.location.origin}/report/${report.id}`;
     
     // Generate and download PDF
     await generateTripPDF(report, qrUrl);
     
     // Update local state
     setTrips(updatedTrips.filter(t => t.driverName === user?.driverName && t.company === user?.company));
     
     alert('Report submitted successfully and PDF downloaded');
   } catch (error) {
     console.error('Error submitting report:', error);
     alert('Failed to submit report. Please try again.');
   }
 };



// const handleSubmitReport = async (trip) => {
//   const report = {
//     ...trip,
//     id: Date.now(),
//     submitted: true
//   };

//   // Save to local storage
//   const reports = JSON.parse(localStorage.getItem('reports') || []);
//   reports.push(report);
//   localStorage.setItem('reports', JSON.stringify(reports));

//   // Generate and download DOCX
//   try {
//     const { doc, Packer } = await generateTripDOCX(report);
//     await downloadDOCX(doc, Packer, `trip_report_${report.id}.docx`);
//     alert('Report submitted and DOCX downloaded');
//   } catch (error) {
//     console.error('Error generating DOCX:', error);
//     alert('Failed to generate report');
//   }
// };

  const handleAddTrip = () => {

    // Fetch vehicle assigned to driver
    const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    const assigned = vehicles.find(v => v.assignedTo === user?.driverName);

    if (!assigned) {
      alert('No vehicle assigned to you by admin.');
      return;
    }

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
          {(() => {
            const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
            const assigned = vehicles.find(v => v.assignedTo === user?.driverName);
            return (
              <p className="text-md text-gray-600">
                Assigned Vehicle:{' '}
                <span className="font-medium">
                  {assigned ? `${assigned.model} (${assigned.registrationNumber})` : 'None'}
                </span>
              </p>
            );
          })()}
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
