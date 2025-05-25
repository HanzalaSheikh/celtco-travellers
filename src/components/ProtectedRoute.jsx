import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role } = useAuth();

  if (!user || role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}
