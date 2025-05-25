import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

export default function DriverSignup() {
  const [form, setForm] = useState({
    driverName: '',
    residencyNumber: '',
    vehicleType: '',
    registrationNumber: '',
    company: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('drivers') || '[]');
    existing.push(form);
    localStorage.setItem('drivers', JSON.stringify(existing));
    alert('Signup successful!');
    navigate('/driver-login');
  };

  return (
    <AuthLayout
      title="Driver Sign Up"
      leftTitle="Welcome Back!"
      leftText="To keep connected with us please login with your personal info"
      linkTo="/driver-login"
      linkLabel="Sign In"
      theme="blue"
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <input name="driverName" placeholder="Name" className="border px-4 py-2 w-full rounded" onChange={handleChange} />
        <input name="residencyNumber" placeholder="Residency Number" className="border px-4 py-2 w-full rounded" onChange={handleChange} />
        <input name="vehicleType" placeholder="Vehicle Type" className="border px-4 py-2 w-full rounded" onChange={handleChange} />
        <input name="registrationNumber" placeholder="Registration Number" className="border px-4 py-2 w-full rounded" onChange={handleChange} />
        <select name="company" value={form.company} onChange={handleChange} className="border px-4 py-2 w-full rounded">
          <option value="">Select Company</option>
          <option value="Celtco">Celtco</option>
          <option value="TNT">TNT</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </AuthLayout>
  );
}
