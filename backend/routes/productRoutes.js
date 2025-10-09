const express = require('express');
const verifyToken = require('../middleware/auth');
const {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  addCategory,
  addBrand,
  getProductByCategory,
  deleteCategory,
  deleteBrand,
  updateCategory,
  updateBrand,
  getProductByBrand,
  getAllBrand,
  getAllCategory,
} = require('../controllers/productControllers');
const upload = require('../utils/uploadFile');

const router = express.Router();

router.get('/v1/brand', getProductByBrand);
router.get('/v1/category', getProductByCategory);
router.get('/category', getAllCategory);
router.get('/brand', getAllBrand);
router.get('/v1', getAllProducts);
router.get('/v1/:id', getProductById);
router.post('/v1/category', verifyToken, addCategory);
router.post('/v1/brand', verifyToken, addBrand);
router.post(
  '/v1',
  verifyToken,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 6 },
  ]),
  addNewProduct
);

router.put('/v1/category/:id', verifyToken, updateCategory);
router.put('/v1/brand/:id', verifyToken, updateBrand);

router.put(
  '/v1/:id',
  verifyToken,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 4 },
  ]),
  updateProduct
);

router.delete('/v1/category/:category', verifyToken, deleteCategory);
router.delete('/v1/brand/:brand', verifyToken, deleteBrand);

router.delete('/v1/:id', verifyToken, deleteProduct);

module.exports = router;
