const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const connectToDatabase = require('./utils/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

// Rute API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Selamat datang di server e-commerce',
  });
});

app.use((req, res) => {
  return res.status(500).json({
    message: 'Halaman tidak ditemukan',
    success: false,
  });
});

module.exports = app;
