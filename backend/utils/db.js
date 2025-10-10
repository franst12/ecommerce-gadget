const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

module.exports = db;
