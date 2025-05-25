// src/pages/AdminSignup.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

export default function AdminSignup() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    company: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('admins') || '[]');
    existing.push(form);
    localStorage.setItem('admins', JSON.stringify(existing));
    alert('Admin account created!');
    navigate('/admin-login');
  };

  return (
    <AuthLayout
      title="Admin Sign Up"
      leftTitle="Already an Admin?"
      leftText="Login with your credentials to manage reports."
      linkTo="/admin-login"
      linkLabel="Sign In"
      theme="green"
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          className="border px-4 py-2 w-full rounded"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border px-4 py-2 w-full rounded"
          onChange={handleChange}
        />
        <select
          name="company"
          value={form.company}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        >
          <option value="">Select Company</option>
          <option value="Celtco">Celtco</option>
          <option value="TNT">TNT</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </AuthLayout>
  );
}
