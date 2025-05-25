// src/components/AuthLayout.jsx
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUserShield, FaUser } from 'react-icons/fa';

export default function AuthLayout({
  title = 'Create Account',
  children,
  leftTitle = 'Welcome Back!',
  leftText = 'To keep connected with us please login with your personal info',
  linkTo = '/login',
  linkLabel = 'Sign In',
  theme = 'blue'
}) {
  const leftBg = theme === 'blue' ? 'bg-blue-600' : 'bg-green-700';
  const hoverStyles = theme === 'blue'
    ? 'hover:bg-white hover:text-blue-600'
    : 'hover:bg-white hover:text-green-600';

  const altRoleLink = theme === 'blue'
    ? { to: '/admin-login', label: 'Admin Login', icon: <FaUserShield className="inline mr-1" /> }
    : { to: '/driver-login', label: 'Driver Login', icon: <FaUser className="inline mr-1" /> };

  const badgeLabel = theme === 'blue' ? 'Driver' : 'Admin';
  const badgeColor = theme === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600';

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side (hidden on small screens) */}
      <div className={`hidden md:flex w-1/2 flex-col items-center justify-center text-white p-10 ${leftBg}`}>
        <h2 className="text-3xl font-bold mb-4">{leftTitle}</h2>
        <p className="mb-6 text-center px-4">{leftText}</p>
        <Link to={linkTo}>
          <button className={`bg-none text-md text-white px-10 py-2 border-2 rounded-full shadow transition ${hoverStyles}`}>
            {linkLabel}
          </button>
        </Link>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <div className={`px-4 py-1 mb-4 rounded-full text-sm font-semibold ${badgeColor}`}>{badgeLabel} Panel</div>

        <h2 className="text-3xl font-bold mb-2 text-gray-700">{title}</h2>
        <p className="text-gray-500 text-sm mb-6">Or use your email to register</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mb-4">
          <button className="border p-2 rounded-full hover:bg-gray-100">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="border p-2 rounded-full hover:bg-gray-100">
            <i className="fab fa-google"></i>
          </button>
          <button className="border p-2 rounded-full hover:bg-gray-100">
            <i className="fab fa-linkedin-in"></i>
          </button>
        </div>

        <div className="w-full max-w-sm mb-6">{children}</div>

        {/* Relocation Button */}
        <Link to={altRoleLink.to} className="text-sm text-blue-600 flex items-center space-x-1 mb-4">
          {altRoleLink.icon}
          <span>Not a {badgeLabel}? Go to {altRoleLink.label}</span>
        </Link>

        {/* Bottom login button for small screens */}
        <div className="block md:hidden mt-6">
          <p className="text-center mb-2 text-gray-500">Already have an account?</p>
          <Link to={linkTo}>
            <button className={`w-full px-8 py-2 rounded-full border transition ${hoverStyles}`}>
              {linkLabel} <FaArrowRight className="inline ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
