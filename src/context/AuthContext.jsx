import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const dummyAdmins = [
  { email: 'admin@celtco.com', password: 'admin123', company: 'Celtco' },
  { email: 'admin@tnt.com', password: 'admin123', company: 'TNT' },
];

const dummyDrivers = [
  { residencyNumber: '12345', driverName: 'Ali', company: 'Celtco' },
  { residencyNumber: '67890', driverName: 'Hanzala', company: 'TNT' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // will include company & role
  const [role, setRole] = useState(null); // 'admin' or 'driver'

  const loginAdmin = ({ email, password, company }) => {
    const found = dummyAdmins.find(
      (a) => a.email === email && a.password === password && a.company === company
    );
    if (found) {
      setUser(found);
      setRole('admin');
      return true;
    }
    return false;
  };

const loginDriver = ({ residencyNumber, company }) => {
  const stored = JSON.parse(localStorage.getItem('drivers') || '[]');
  const found = stored.find(
    (d) => d.residencyNumber === residencyNumber && d.company === company
  );

  if (found) {
    setUser(found);
    setRole('driver');
    return true;
  }
  return false;
};

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAdmin, loginDriver, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
