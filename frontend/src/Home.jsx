import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { getProducts } from './routes/route';
import Product from './products/Product';

function Home() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchDatas = async () => {
      const response = await getProducts('products/v1');
      try {
        setProduct(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDatas();
  }, []);
  return (
    <>
      <Navbar />
      <h1>Hello world Home</h1>
      <div>
        <div className="flex justify-around items-center gap-5">
          <Product products={product} />
        </div>
      </div>
    </>
  );
}

export default Home;
