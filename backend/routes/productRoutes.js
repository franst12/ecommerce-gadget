const express = require('express');
const verifyToken = require('../middleware/auth');
const { getAllProducts, addNewProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');

const router = express.Router();

// Mendapatkan semua produk
router.get('/', getAllProducts);

// Menambahkan produk baru (hanya admin)
router.post('/', verifyToken, addNewProduct);

// Mengupdate produk (hanya admin)
router.put('/:id', verifyToken, updateProduct);

// Menghapus produk (hanya admin)
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
