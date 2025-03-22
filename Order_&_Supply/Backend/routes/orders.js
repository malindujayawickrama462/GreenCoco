const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order (POST)
router.post('/', async (req, res) => {
  const { customerName, contactNumber, deliveryMethod, products, totalAmount } = req.body;

  try {
    const order = new Order({ customerName, contactNumber, deliveryMethod, products, totalAmount });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all orders (GET)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific order by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an order by ID (PUT)
router.put('/:id', async (req, res) => {
  const { customerName, contactNumber, deliveryMethod, products, totalAmount } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { customerName, contactNumber, deliveryMethod, products, totalAmount },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an order by ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;