import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './auth/login';
import Dashboard from './admin/Dashboard';
import Update from './products/Update';
import AddProduct from './products/AddProduct';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';

function App() {
  const [isLogedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isWindow = window.location.pathname === '/';

    if (token && !isWindow) {
      setIsLoggedIn(true);
    } else if (!token && isWindow) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Sidebar isLogedIn={isLogedIn} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
