import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getProductById } from '../routes/route';
import { Link } from 'react-router';

const DetailProduct = () => {
  const _id = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
    }
    const fetchData = async () => {
      const response = await getProductById('products/v1/', _id.id);
      setProduct(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1>Hallaman detail product</h1>
      <Link to="/" className="btn btn-info p-2 text-white my-3">
        Kembali
      </Link>
      <div className="container max-h-screen grid grid-cols-2 gap-5 my-5">
        <div className=" flex justify-center max-h-screen items-center rounded bg-gray-200">
          <div className="grid grid-cols-2 gap-3 p-3 justify-center w-full">
            {product?.images?.map((image, i) => (
              <div className="card w-full" key={i}>
                <img src={`${import.meta.env.VITE_BASE_IMG}/${image}`} className="w-full rounded-lg" alt="Tailwind CSS Carousel component" />
              </div>
            ))}
          </div>
        </div>
        <div className="max-h-screen overflow-y-scroll relative flex  px-3 w-full bg-gray-200 rounded flex-col">
          <h1 className="p-4 my-3 pb-2 font-semibold text-4xl opacity-70 tracking-wide">{product.name}</h1>
          <ul className="list mb-5 bg-base-100 rounded-box shadow-md">
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Nama Brand</h3>
                <div className="text-lg uppercase font-semibold opacity-60">{product?.brand?.name}</div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Type</h3>
                <div className="text-lg uppercase font-semibold opacity-60">{product.seri}</div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Spesifikasi</h3>
                <div className="text-lg uppercase font-semibold opacity-60">
                  {product.specification?.map((spec, i) => (
                    <div key={i}>
                      {spec.key}: {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Spesifikasi</h3>
                <div className="text-lg uppercase font-semibold opacity-60">
                  {product.specification?.map((spec, i) => (
                    <div key={i}>
                      {spec.key}: {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Spesifikasi</h3>
                <div className="text-lg uppercase font-semibold opacity-60">
                  {product.specification?.map((spec, i) => (
                    <div key={i}>
                      {spec.key}: {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Spesifikasi</h3>
                <div className="text-lg uppercase font-semibold opacity-60">
                  {product.specification?.map((spec, i) => (
                    <div key={i}>
                      {spec.key}: {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Spesifikasi</h3>
                <div className="text-lg uppercase font-semibold opacity-60">
                  {product.specification?.map((spec, i) => (
                    <div key={i}>
                      {spec.key}: {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Spesifikasi</h3>
                <div className="text-lg uppercase font-semibold opacity-60">
                  {product.specification?.map((spec, i) => (
                    <div key={i}>
                      {spec.key}: {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Stok</h3>
                <div className="text-lg uppercase font-semibold opacity-60">{product.stock}</div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Kondisi</h3>
                <div className="text-lg uppercase font-semibold opacity-60">{product.condition}</div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Keterangan Produk</h3>
                <div className="text-lg overflow-auto max-h-96 uppercase font-semibold opacity-60">{product.description}</div>
              </div>
            </li>
            <li className="list-row">
              <div className="list-col-grow">
                <h3 className="text-lg uppercase font-semibold opacity-75">Harga</h3>
                <div className="text-lg uppercase font-semibold opacity-60">Rp. {product.price}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
