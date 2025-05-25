import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function DriverLogin() {
  const [residencyNumber, setResidencyNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Assume residencyNumber = login key
    if (residencyNumber) {
      navigate('/driver-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">Driver Login</h2>
        <input type="text" placeholder="Residency Number" className="w-full mb-4 px-4 py-2 border rounded" value={residencyNumber} onChange={(e) => setResidencyNumber(e.target.value)} />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
        <p className="text-center mt-2 text-sm text-gray-600">
          Don't have an account? <a href="/driver-signup" className="text-blue-600">Sign up</a>
        </p>
      </form>
    </div>
  );
}
