const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  products: [{
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);