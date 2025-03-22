// models/supplier.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
});

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  products: [productSchema],
  supplierId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;