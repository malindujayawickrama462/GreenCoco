import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TextField, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Container, Box, CircularProgress, Snackbar, Alert, Grid 
} from '@mui/material'; // Added Grid here
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    contactNumber: '',
    deliveryMethod: '',
    totalAmount: 0
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    axios.get('http://localhost:5001/api/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:5001/api/orders', formData)
      .then(response => {
        setOrders([...orders, response.data]);
        setFormData({ customerName: '', contactNumber: '', deliveryMethod: '', totalAmount: 0 });
        setSnackbar({ open: true, message: 'Order added successfully!', severity: 'success' });
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setSnackbar({ open: true, message: 'Failed to add order.', severity: 'error' });
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/orders/${id}`)
      .then(() => {
        setOrders(orders.filter(order => order._id !== id));
        setSnackbar({ open: true, message: 'Order deleted successfully!', severity: 'success' });
      })
      .catch(error => {
        console.error(error);
        setSnackbar({ open: true, message: 'Failed to delete order.', severity: 'error' });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#004c40', mb: 4 }}>
        Order Management
      </Typography>

      {/* Create New Order Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#00796b' }}>
          Create New Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Customer Name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Delivery Method"
                value={formData.deliveryMethod}
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Amount"
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                startIcon={<AddIcon />}
                disabled={loading}
                sx={{ 
                  backgroundColor: '#00796b',
                  '&:hover': { backgroundColor: '#004c40' }
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Add Order'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Order List */}
      <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#00796b' }}>
        Order List
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#00796b' }}>
              <TableCell sx={{ color: 'white' }}>Customer Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact Number</TableCell>
              <TableCell sx={{ color: 'white' }}>Delivery Method</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Amount</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order._id} hover>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.contactNumber}</TableCell>
                <TableCell>{order.deliveryMethod}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrderManagement;