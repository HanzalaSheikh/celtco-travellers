// src/pages/DriverLogin.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function DriverLogin() {
  const [residencyNumber, setResidencyNumber] = useState('');
  const [company, setCompany] = useState('');
  const { loginDriver } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginDriver({ residencyNumber, company });
    if (success) {
      navigate('/driver-dashboard');
    } else {
      alert('Invalid residency number or company');
    }
  };

  return (
    <AuthLayout
      title="Driver Login"
      leftTitle="Hello, Driver!"
      leftText="To create a new account, please sign up first."
      linkTo="/driver-signup"
      linkLabel="Sign Up"
      theme="blue"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          name="residencyNumber"
          placeholder="Residency Number"
          className="border px-4 py-2 w-full rounded"
          value={residencyNumber}
          onChange={(e) => setResidencyNumber(e.target.value)}
        />
        <select
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border px-4 py-2 w-full rounded"
        >
          <option value="">Select Company</option>
          <option value="Celtco">Celtco</option>
          <option value="TNT">TNT</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </AuthLayout>
  );
}
