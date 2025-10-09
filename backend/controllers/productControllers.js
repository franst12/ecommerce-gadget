const Brands = require('../models/Brands');
const Category = require('../models/Category');
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').populate('brand', 'name');
    const productFormat = products.map((product) => {
      return {
        id: product._id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        category: product.category.name,
        brand: product.brand.name,
        seri: product.seri,
        condition: product.condition,
        coverImage: product.coverImage,
        images: product.images,
      };
    });

    res.status(200).json({
      message: 'Produk berhasil didapatkan',
      succes: true,
      data: productFormat,
    });
  } catch (err) {
    res.status(500).json({
      message: 'gagal mendapatkan produk',
      succes: false,
      error: err.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();

    res.status(200).json({
      message: 'Kategori berhasil didapatkan',
      succes: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: 'gagal mendapatkan kategori',
      succes: false,
      error: error.message,
    });
  }
};

const getAllBrand = async (reqq, res) => {
  try {
    const brands = await Brands.find();
    res.status(200).json({
      message: 'Berhasil mendapatkan semua brand',
      succes: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal mendapatkan semua brand',
      succes: false,
      error: error.message,
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({
        message: 'Parameter category tidak boleh kosong',
        success: false,
      });
    }

    const categoryDoc = await Category.findOne({ name: { $regex: category, $options: 'i' } });
    if (!categoryDoc) {
      return res.status(404).json({
        message: `Kategori '${category}' tidak ditemukan`,
        success: false,
        data: [],
      });
    }

    const products = await Product.find({ category: categoryDoc._id }).populate('category', 'name').populate('brand', 'name');

    if (products.length === 0) {
      return res.status(404).json({
        message: `Tidak ada produk yang ditemukan untuk kategori '${category}'`,
        success: false,
        data: [],
      });
    }
    res.status(200).json({
      message: 'Produk berhasil didapatkan berdasarkan kategori',
      succes: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: 'gagal mendapatkan produk',
      succes: false,
      error: err.message,
    });
  }
};

const getProductByBrand = async (req, res) => {
  try {
    const { brand } = req.query;

    if (!brand) {
      return res.status(400).json({
        message: 'Parameter brand tidak boleh kosong',
        success: false,
      });
    }

    const brandDoc = await Brands.findOne({ name: { $regex: brand, $options: 'i' } });

    if (!brandDoc) {
      return res.status(404).json({
        message: `Brand '${brand}' tidak ditemukan`,
        success: false,
        data: [],
      });
    }

    const products = await Product.find({ brand: brandDoc._id }).populate('category', 'name').populate('brand', 'name');

    if (products.length === 0) {
      return res.status(404).json({
        message: `Tidak ada produk yang ditemukan untuk brand '${brand}'`,
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: `Produk berhasil didapatkan berdasarkan brand '${brand}'`,
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mendapatkan produk',
      success: false,
      error: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate('category', 'name').populate('brand', 'name');
    res.status(200).json({
      message: 'Produk berhasil didapatkan',
      succes: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: 'gagal mendapatkan produk',
      succes: false,
      error: err.message,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryName = name.toLowerCase();
    const category = new Category({ name: categoryName });

    const existCategory = await Category.findOne({ name: categoryName });
    if (existCategory) {
      return res.status(400).json({
        message: 'Kategori sudah ada',
        success: false,
      });
    }
    const newCategory = await category.save();
    return res.status(201).json({
      message: 'Kategori berhasil ditambahkan',
      success: true,
      data: newCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Gagal menambahkan kategori',
      success: false,
      error: error.message,
    });
  }
};

const addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brandName = name.toLowerCase();
    const brand = new Brands({ name: brandName });

    const existBrand = await Brands.findOne({ name: brandName });
    if (existBrand) {
      return res.status(400).json({
        message: 'Brand sudah ada',
        success: false,
      });
    }
    const newBrand = await brand.save();
    return res.status(201).json({
      message: 'Brand berhasil ditambahkan',
      success: true,
      data: newBrand,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Gagal menambahkan brand',
      success: false,
      error: error.message,
    });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { name, specification, description, stock, price, category, brand, seri, condition } = req.body;

    const brands = await Brands.find();
    const categories = await Category.find();

    const categoryDoc = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());
    const brandDoc = brands.find((b) => b.name.toLowerCase() === brand.toLowerCase());

    if (!name || !stock || !price || !category || !brand || !seri) {
      return res.status(400).json({
        message: 'Semua field utama harus diisi',
        success: false,
      });
    }
    if (!brandDoc) {
      return res.status(400).json({ message: 'Brand tidak ditemukan', success: false });
    }
    if (!categoryDoc) {
      return res.status(400).json({ message: 'Kategori tidak ditemukan', success: false });
    }

    const uploadFiles = req.files;

    if (!uploadFiles || !uploadFiles.coverImage || uploadFiles.coverImage.length === 0) {
      return res.status(400).json({ message: 'Cover Image wajib diunggah.', success: false });
    }

    const coverImage = uploadFiles.coverImage[0].path;
    const images = uploadFiles.images ? uploadFiles.images.map((file) => file.path) : [];

    let specsArray = [];
    if (specification) {
      try {
        specsArray = JSON.parse(specification);
      } catch (e) {
        specsArray = specification;
      }
    }

    const product = new Product({
      name,
      description,
      stock,
      price,
      category: categoryDoc._id,
      brand: brandDoc._id,
      seri,
      condition,
      coverImage,
      images,
      specification: specsArray,
    });

    const newProduct = await product.save();
    res.status(201).json({
      message: 'Produk berhasil ditambahkan',
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal menambahkan produk',
      success: false,
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const categoryName = name.toLowerCase();
    const category = await Category.findByIdAndUpdate(id, { name: categoryName }, { new: true });
    res.status(201).json({
      message: 'Kategori berhasil diupdate',
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal mengupdate kategori',
      success: false,
      error: error.message,
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const brandName = name.toLowerCase();
    const brand = await Brands.findByIdAndUpdate(id, { name: brandName }, { new: true });
    res.status(201).json({
      message: 'Brand berhasil diupdate',
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal mengupdate brand',
      success: false,
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, specification, description, stock, price, categoryId, brandId, seri } = req.body;

    let parsedSpecification = specification;
    if (typeof specification === 'string') {
      try {
        parsedSpecification = JSON.parse(specification);
      } catch (e) {
        console.warn('Specification tidak valid, menggunakan nilai sebelumnya');
      }
    }

    const product = {
      name,
      description,
      stock,
      price,
      category: categoryId,
      brand: brandId,
      seri,
      specification: parsedSpecification,
    };

    const uploadFiles = req.files;
    if (req.files.coverImage && req.files.coverImage.length > 0) {
      const coverImage = uploadFiles.coverImage[0].path;
      product.coverImage = coverImage;
    }

    if (req.files.images && req.files.images.length > 0) {
      const images = uploadFiles.images.map((file) => file.path);
      product.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true, runValidators: true });
    res.status(201).json({
      message: 'Produk berhasil diupdate',
      succes: true,
      data: updatedProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Gagal mengupdate produk',
      succes: false,
      error: err.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    const product = products.map((product) => product._id);
    await Product.deleteMany({ _id: { $in: product } });
    await Category.findByIdAndDelete(category);

    res.status(200).json({
      message: 'Kategori berhasil dihapus',
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal menghapus kategori',
      success: false,
      error: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = req.params.brand;

    const getBrand = await Brands.findOne({ _id: brand });
    const products = await Product.find({ brand });
    const product = products.map((product) => product._id);
    await Product.deleteMany({ _id: { $in: product } });
    await Brands.findByIdAndDelete(brand);

    res.status(200).json({
      message: 'Brand berhasil dihapus',
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal menghapus brand',
      success: false,
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Produk berhasil dihapus',
      succes: true,
    });
  } catch (err) {
    res.status(500).status(500).json({
      message: 'Gagal menghapus produk',
      succes: false,
    });
  }
};

module.exports = {
  getAllProducts,
  getAllCategory,
  getAllBrand,
  getProductByCategory,
  getProductByBrand,
  getProductById,
  addCategory,
  addBrand,
  addNewProduct,
  updateCategory,
  updateBrand,
  updateProduct,
  deleteCategory,
  deleteBrand,
  deleteProduct,
};
