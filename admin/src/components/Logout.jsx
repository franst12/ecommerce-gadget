import React from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const token = () => localStorage.getItem('token');

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = confirm('Anda ingin logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-warning w-full">
      Logout
    </button>
  );
};

export default Logout;
