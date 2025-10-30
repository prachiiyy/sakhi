import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {role: 'admin'|'ngo', token, name, email}
  useEffect(() => {
    // load from localStorage if present
    const raw = localStorage.getItem('sakhi_auth');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('sakhi_auth', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sakhi_auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
