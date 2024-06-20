import React from 'react';
import { Navigate } from 'react-router-dom';
import './Dashbord.css';

const Dashboard = () => {
  const userName = localStorage.getItem('userName');

  return (
    <>
      {userName ? (
        <div className="dashboard-container">
          <h1>Welcome to Admin - {userName}</h1>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default Dashboard;
