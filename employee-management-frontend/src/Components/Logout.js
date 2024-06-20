// src/Components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userName');

    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Logout;
