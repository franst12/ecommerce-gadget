const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const db = require('./utils/db');

dotenv.config();

const app = express();

// Middleware
// const allowedOrigins = {
//   origin: process.env.SERVER_ORIGIN ? process.env.SERVER_ORIGIN.split(',') : [],
// };

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin) {
//       return callback(null, true);
//     }

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error(`Origin ${origin} tidak diizinkan oleh CORS`));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// };

app.use(cors());
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
