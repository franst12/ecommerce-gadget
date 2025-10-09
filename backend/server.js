const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const db = require('./utils/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: process.env.SERVER_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.then(() => {
  console.log('Databse terhubung');
}).catch((err) => {
  console.log('Gagal terhubung ke database', err);
});

// Rute API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(500).json({
    message: 'Halaman tidak ditemukan',
    success: false,
  });
});

module.exports = app;
