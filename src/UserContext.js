import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      fetch(`http://localhost:3001/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};