import React from 'react';
import { BrowserRouter, Router, Routes } from 'react-router';
import Sidebar from '../components/Sidebar';

const Layouts = () => {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Router path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layouts;
