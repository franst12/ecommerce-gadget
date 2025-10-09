import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Product from '../products/Product';
import Header from '../components/Header';

const Dashboard = () => {
  const token = () => localStorage.getItem('token');
  useEffect(() => {
    const getToken = token();
    if (!getToken) {
      window.location.href = '/';
    }
  });
  return (
    <>
      <div className="p-3 relative pt-20">
        <div className="bg-teal-700 absolute top-0 left-0 right-0 p-5">
          <Header />
        </div>
        <div className="bg-base-300 my-5 p-3 md:p-5 mx-auto rounded">
          <Link to="/product/add" className="btn btn-primary p-2 rounded text-white">
            Add Product
          </Link>
          <div>
            <Product />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
