const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Endpoint untuk registrasi admin (hanya sekali)
router.post('/register', register);

// Endpoint untuk login admin
router.post('/login', login);
router.post('/logout', verifyToken, logout);

module.exports = router;
