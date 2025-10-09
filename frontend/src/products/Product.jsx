import { Link } from 'react-router';

const Product = ({ products }) => {
  return (
    <div className="grid px-5 py-3 grid-cols-3 gap-5">
      {products?.data?.map((product) => (
        <div key={product.id} className="card bg-base-100 w-96 shadow-sm">
          <div className="carousel rounded-box w-96">
            <div className="carousel-item w-full h-96">
              <img src={`${import.meta.env.VITE_BASE_IMG}/${product.coverImage}`} className="w-full p-1 rounded-t-lg" />
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title text-xl-center">{product.name}</h2>
            <p>{product.condition}</p>
            <div className="card-actions justify-end">
              <Link to={'/product/details/' + product.id} className="btn btn-primary p-2 rounded text-white">
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
