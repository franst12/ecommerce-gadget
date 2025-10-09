import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatas, updateData } from '../routes/route';

const Update = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    category: '',
    seri: '',
    condition: '',
    coverImage: null,
    images: [],
  });
  const [specs, setSpecs] = useState([{ key: '', value: '' }]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState(null);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [getProductById, getBrand, getCategory] = await Promise.all([getDatas(`api/products/v1/${id}`), getDatas('api/products/brand'), getDatas('api/products/category')]);

        setCategory(getCategory?.data || []);
        setBrand(getBrand?.data || []);

        const dataProduct = getProductById?.data;
        if (dataProduct) {
          setFormData({
            name: dataProduct.name || '',
            description: dataProduct.description || '',
            price: dataProduct.price || '',
            stock: dataProduct.stock || '',
            brand: dataProduct.brand?._id || dataProduct.brand || '',
            category: dataProduct.category?._id || dataProduct.category || '',
            seri: dataProduct.seri || '',
            condition: dataProduct.condition || '',
            coverImage: dataProduct.coverImage || null,
            images: dataProduct.images || [],
          });
          setSpecs(dataProduct.specification && dataProduct.specification.length > 0 ? dataProduct.specification : [{ key: '', value: '' }]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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

  const handleFileChange = (e) => {
    if (e.target.name === 'coverImage') {
      setCoverImage(e.target.files[0]);
    } else {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    const dataToSubmit = new FormData();
    const specsJsonString = JSON.stringify(specs.filter((s) => s.key && s.value));

    Object.keys(formData).forEach((key) => {
      if (key !== 'coverImage' && key !== 'images') {
        dataToSubmit.append(key, formData[key]);
      }
    });

    dataToSubmit.append('specification', specsJsonString);

    if (coverImage) {
      dataToSubmit.append('coverImage', coverImage);
    }

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        dataToSubmit.append('images', images[i]);
      }
    } else if (formData.images && formData.images.length > 0) {
      formData.images.forEach((imagePath) => {
        dataToSubmit.append('images', imagePath);
      });
    }

    try {
      const response = await updateData('api/products/v1', id, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response, 'berhasil diupdate');
      alert('Produk berhasil diperbarui!');
    } catch (error) {
      console.error(error);
      alert('Product gagal diupdate');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 rounded-lg p-3 md:px-16">
      <div className="bg-white p-3 md:p-8 rounded-lg mx-auto h-1vh shadow-xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Perbarui Produk</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">
                    Harga
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="textarea textarea-bordered w-full h-80" required></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="stock" className="text-sm font-medium text-gray-700 mb-1">
                    Stok
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="seri" className="text-sm font-medium text-gray-700 mb-1">
                    Seri
                  </label>
                  <input
                    type="text"
                    name="seri"
                    value={formData.seri}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full" required>
                    <option value="" disabled>
                      Pilih Kategori
                    </option>
                    {category?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="brand" className="text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select value={formData.brand} name="brand" onChange={handleChange} className="select select-bordered w-full" required>
                    <option value="" disabled>
                      Pilih Brand
                    </option>
                    {brand?.map((brandItem) => (
                      <option key={brandItem._id} value={brandItem._id}>
                        {brandItem.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="condition" className="text-sm font-medium text-gray-100 mb-1">
                  Kondisi
                </label>
                <select name="condition" value={formData.condition} onChange={handleChange} className="select select-bordered w-full" required>
                  <option value="" disabled>
                    Pilih Kondisi
                  </option>
                  <option value="Baru">Baru</option>
                  <option value="Bekas">Bekas</option>
                </select>
              </div>

              {/* Input Spesifikasi Dinamis */}
              <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Spesifikasi Produk</h3>
                <div className="h-80 overflow-y-auto">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex my-3 gap-3">
                      <input type="text" name="key" value={spec.key} onChange={(e) => handleSpecChange(index, e)} placeholder="Nama Spek (Contoh: RAM)" required className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                      <input type="text" name="value" value={spec.value} onChange={(e) => handleSpecChange(index, e)} placeholder="Nilai Spek (Contoh: 8GB)" required className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                      <button type="button" onClick={() => removeSpecField(index)} className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors">
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addSpecField} className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                  + Tambah Spek
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="coverImage" className="text-sm font-medium text-gray-700 mb-1">
                    Ubah Gambar Cover (saat ini: {formData.coverImage ? 'Ada' : 'Kosong'})
                  </label>
                  <input type="file" name="coverImage" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
                </div>
                <div>
                  <label htmlFor="images" className="text-sm font-medium text-gray-700 mb-1">
                    Ubah Gambar Tambahan (saat ini: {formData.images?.length || 0} file)
                  </label>
                  <input type="file" name="images" multiple onChange={handleFileChange} className="file-input file-input-bordered w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="btn btn-primary px-6 py-3 text-lg font-semibold">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
