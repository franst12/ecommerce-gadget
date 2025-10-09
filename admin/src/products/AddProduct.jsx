import React, { useEffect, useState } from 'react';
import { getDatas, postData } from '../routes/route';
import { Link, useNavigate } from 'react-router-dom'; // Perbaikan import Link

const AddProduct = () => {
  const [name, setName] = useState('');
  const [specs, setSpecs] = useState([{ key: '', value: '' }]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [seri, setSeri] = useState('');
  const [condition, setCondition] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
    }

    const fetchData = async () => {
      try {
        const [getBrands, getCategories] = await Promise.all([getDatas('api/products/brand'), getDatas('api/products/category')]);

        setCategories(getCategories?.data || []);
        setBrands(getBrands?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleSpecChange = (index, e) => {
    const { name, value } = e.target;
    const newSpecs = [...specs];
    newSpecs[index][name] = value;
    setSpecs(newSpecs);
  };

  const addSpecField = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const removeSpecField = (index) => {
    const newSpecs = [...specs];
    newSpecs.splice(index, 1);
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const specsJsonString = JSON.stringify(specs.filter((s) => s.key && s.value));

    formData.append('name', name);
    formData.append('specification', specsJsonString);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('seri', seri);
    formData.append('condition', condition);

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    images.forEach((image) => formData.append('images', image));

    try {
      const response = await postData('api/products/v1/', formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      console.log(response, 'berhasil ditambahkan');
      alert('Produk berhasil ditambahkan!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan produk!');
    }
  };

  return (
    <div className="flex justify-center items-center rounded-lg min-h-screen bg-gray-100 p-3 md:px-16">
      <div className="w-full mx-auto">
        <div className=" top-3 left-7">
          <Link to="/admin/dashboard" className="btn btn-info p-2 text-white my-3">
            Kembali
          </Link>
        </div>
        <div className="bg-white p-3 md:p-8 rounded-lg mx-auto h-1vh shadow-xl w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Tambahkan Produk Baru</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nama Produk
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Iphone 19 Pro Max"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Harga
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Rp 5.000.000"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan detail produk..."
                    rows="4"
                    required
                    className="mt-1 h-80 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Stok
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="100"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="seri" className="block text-sm font-medium text-gray-700">
                      Seri Produk
                    </label>
                    <input
                      type="text"
                      id="seri"
                      name="seri"
                      value={seri}
                      onChange={(e) => setSeri(e.target.value)}
                      placeholder="Pro X Series"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Kategori
                    </label>
                    <select id="category" name="category" onChange={(e) => setCategory(e.target.value)} value={category} required className="select select-bordered w-full">
                      <option value="" disabled>
                        Pilih Kategori
                      </option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <select id="brand" name="brand" onChange={(e) => setBrand(e.target.value)} value={brand} required className="select select-bordered w-full">
                      <option value="" disabled>
                        Pilih Brand
                      </option>
                      {brands?.map((brand) => (
                        <option key={brand._id} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                    Kondisi
                  </label>
                  <select id="condition" name="condition" onChange={(e) => setCondition(e.target.value)} value={condition} required className="select select-bordered w-full">
                    <option value="" disabled>
                      Pilih Kondisi
                    </option>
                    <option value="Baru">Baru</option>
                    <option value="Bekas">Bekas</option>
                  </select>
                </div>

                <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Spesifikasi Produk</h3>
                  <div className="h-80 overflow-y-auto">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex my-3 gap-3">
                        <input type="text" name="key" value={spec.key} onChange={(e) => handleSpecChange(index, e)} placeholder="Nama Spek (Contoh: RAM)" required className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        <input
                          type="text"
                          name="value"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, e)}
                          placeholder="Nilai Spek (Contoh: 8GB)"
                          required
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        {specs.length > 1 && (
                          <button type="button" onClick={() => removeSpecField(index)} className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors">
                            Hapus
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addSpecField} className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                    + Tambah Spek
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                      Gambar Cover
                    </label>
                    <input
                      type="file"
                      id="coverImage"
                      name="coverImage"
                      onChange={(e) => setCoverImage(e.target.files[0])}
                      required
                      className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-600
                    hover:file:bg-indigo-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                      Gambar Tambahan
                    </label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      onChange={(e) => setImages([...e.target.files])}
                      multiple
                      required
                      className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-600
                    hover:file:bg-indigo-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambahkan Produk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
