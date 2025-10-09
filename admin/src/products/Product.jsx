import { useEffect, useState } from 'react';
import { fetchDatas } from '../routes/route';
import { Link } from 'react-router';
import Delete from './Delete';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_IMG = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDatas('api/products', 'v1');
      setProducts(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex mx-auto gap-5 mt-7">
      {isLoading && <progress className="mx-auto my-12 progress w-56"></progress>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products?.map((product) => (
          <div key={product.id} className="card p-1 bg-base-100 md:w-96 w-full shadow-sm">
            <figure className="p-1">
              <img src={`${API_IMG}${product.coverImage}`} alt="Shoes" className="rounded-t-md w-full h-90 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.condition}</p>
              <p>Rp. {product.price}</p>
              <div className="card-actions justify-end">
                <Link to={`/product/edit/${product.id}`} className="btn btn-primary">
                  Edit
                </Link>
                <Delete id={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
