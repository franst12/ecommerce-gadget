import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Product from '../products/Product';
import { Link } from 'react-router';
import { fetchDatas } from '../routes/route';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const gettoken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = gettoken();
    if (!token) {
      window.location.href = '/';
      return;
    }

    try {
      const fetchData = async () => {
        const response = await fetchDatas('products/v1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response);
        setIsLoading(!isLoading);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Sidebar />
      <div className="mx-44 p-3 bg-base-300 mt-5">
        <Link to="/product/add" className="btn btn-primary p-2 rounded text-white">
          Add Product
        </Link>
        <div className="mt-5">
          {isLoading ? (
            <h3 className="text-2xl font-bold text-center">
              Memuat <span className="loading loading-dots loading-xl"></span>
            </h3>
          ) : (
            <Product products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
