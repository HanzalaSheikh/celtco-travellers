// src/pages/AdminLogin.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin({ email, password, company });
    if (success) {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid credentials or company');
    }
  };

  return (
    <AuthLayout
      title="Admin Login"
      leftTitle="Hello, Admin!"
      leftText="To create a new admin account, please sign in."
      linkTo="/admin-signup"
      linkLabel="Sign up"
      theme="green"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border px-4 py-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border px-4 py-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Login</button>
      </form>
    </AuthLayout>
  );
}
