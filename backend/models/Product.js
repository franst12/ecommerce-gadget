const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
