const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  name: String,
  address: String,
  date: { type: Date, default: Date.now },
  placedAt: { type: Date, default: Date.now },
  items: Array,  // Optional: Store items ordered
});

module.exports = mongoose.model('Order', orderSchema);
