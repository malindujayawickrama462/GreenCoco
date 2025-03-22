// routes/suppliers.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');

// Get all suppliers with optional filtering
router.get('/', async (req, res) => {
  try {
    const { companyName, productName, sortBy } = req.query;
    let query = {};

    // Filter by company name if provided
    if (companyName) {
      query.companyName = { $regex: companyName, $options: 'i' };
    }

    // Filter by product name if provided
    if (productName) {
      query['products.productName'] = { $regex: productName, $options: 'i' };
    }

    // Build sort options
    let sortOptions = {};
    if (sortBy) {
      const sortField = sortBy.startsWith('-') ? sortBy.substring(1) : sortBy;
      const sortOrder = sortBy.startsWith('-') ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    } else {
      sortOptions.supplierName = 1;
    }

    const suppliers = await Supplier.find(query).sort(sortOptions);
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific supplier by ID
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific supplier by supplierId
router.get('/by-supplier-id/:supplierId', async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ supplierId: req.params.supplierId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new supplier
router.post('/', async (req, res) => {
  try {
    // Check if supplierId already exists
    const existingSupplier = await Supplier.findOne({ supplierId: req.body.supplierId });
    if (existingSupplier) {
      return res.status(400).json({ message: 'Supplier ID already exists' });
    }

    const supplier = new Supplier({
      supplierName: req.body.supplierName,
      contactNumber: req.body.contactNumber,
      companyName: req.body.companyName,
      address: req.body.address,
      products: req.body.products || [],
      supplierId: req.body.supplierId
    });

    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a supplier (using PUT for full updates)
router.put('/:id', async (req, res) => {
  try {
    // Check if we're updating supplierId and if it already exists
    if (req.body.supplierId) {
      const existingSupplier = await Supplier.findOne({
        supplierId: req.body.supplierId,
        _id: { $ne: req.params.id } // Exclude current supplier
      });

      if (existingSupplier) {
        return res.status(400).json({ message: 'Supplier ID already exists' });
      }
    }

    // Find the supplier first
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Update fields if they're provided
    if (req.body.supplierName !== undefined) supplier.supplierName = req.body.supplierName;
    if (req.body.contactNumber !== undefined) supplier.contactNumber = req.body.contactNumber;
    if (req.body.companyName !== undefined) supplier.companyName = req.body.companyName;
    if (req.body.address !== undefined) supplier.address = req.body.address;
    if (req.body.supplierId !== undefined) supplier.supplierId = req.body.supplierId;
    if (req.body.products !== undefined) supplier.products = req.body.products;

    // Save the updated supplier
    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a product to a supplier
router.post('/:id/products', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const { productName, quantity } = req.body;

    // Check if product already exists
    const existingProductIndex = supplier.products.findIndex(p =>
      p.productName.toLowerCase() === productName.toLowerCase()
    );

    if (existingProductIndex >= 0) {
      // Update existing product quantity
      supplier.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product
      supplier.products.push({ productName, quantity });
    }

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a specific product for a supplier
router.patch('/:id/products/:productId', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const productIndex = supplier.products.findIndex(
      product => product._id.toString() === req.params.productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.productName !== undefined) {
      supplier.products[productIndex].productName = req.body.productName;
    }

    if (req.body.quantity !== undefined) {
      supplier.products[productIndex].quantity = req.body.quantity;
    }

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a product from a supplier
router.delete('/:id/products/:productId', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    supplier.products = supplier.products.filter(
      product => product._id.toString() !== req.params.productId
    );

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting supplier with ID:', req.params.id); // Debugging log
    const result = await Supplier.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error); // Debugging log
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;