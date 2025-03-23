import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const OrderForm = ({ order }) => {
  const [formData, setFormData] = useState({
    customerName: order ? order.customerName : '',
    contactNumber: order ? order.contactNumber : '',
    deliveryMethod: order ? order.deliveryMethod : '',
    products: order ? order.products : [],
    totalAmount: order ? order.totalAmount : 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (order) {
        // Update existing order
        await axios.put(`http://localhost:5001/api/orders/${order._id}`, formData);
        alert('Order updated successfully');
      } else {
        // Create new order
        await axios.post('http://localhost:5001/api/orders', formData);
        alert('Order created successfully');
      }
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        {order ? 'Edit Order' : 'Create New Order'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Customer Name"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contact Number"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Delivery Method"
          value={formData.deliveryMethod}
          onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          {order ? 'Update Order' : 'Create Order'}
        </Button>
      </form>
    </Container>
  );
};

export default OrderForm;