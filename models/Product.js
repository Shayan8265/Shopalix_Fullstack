const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },         // store price as number
  image: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'], required: true },
  category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
