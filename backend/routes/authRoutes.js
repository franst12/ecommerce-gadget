const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Endpoint untuk registrasi admin (hanya sekali)
router.post('/register', register);

// Endpoint untuk login admin
router.post('/login', login);

module.exports = router;
