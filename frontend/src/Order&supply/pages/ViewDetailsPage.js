import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Container, Divider, Box, Tabs, Tab
} from '@mui/material';

const ViewDetailsPage = () => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Fetch orders from the backend
    axios.get('http://localhost:5001/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));

    // Fetch suppliers from the backend
    axios.get('http://localhost:5001/api/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        View Details
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="details tabs">
          <Tab label="Orders" />
          <Tab label="Suppliers" />
        </Tabs>
      </Box>

      {/* Orders Tab Panel */}
      {activeTab === 0 && (
        <div>
          <Typography variant="h5" gutterBottom>
            Order Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Delivery Method</TableCell>
                  <TableCell>Total Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <TableRow key={order._id}>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.contactNumber}</TableCell>
                      <TableCell>{order.deliveryMethod}</TableCell>
                      <TableCell>${order.totalAmount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No orders found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Suppliers Tab Panel */}
      {activeTab === 1 && (
        <div>
          <Typography variant="h5" gutterBottom>
            Supplier Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Supplier ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.length > 0 ? (
                  suppliers.map(supplier => (
                    <TableRow key={supplier._id}>
                      <TableCell>{supplier.supplierName}</TableCell>
                      <TableCell>{supplier.companyName}</TableCell>
                      <TableCell>{supplier.contactNumber}</TableCell>
                      <TableCell>{supplier.address || 'N/A'}</TableCell>
                      <TableCell>{supplier.supplierId || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No suppliers found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Summary counts */}
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1">Total Orders</Typography>
            <Typography variant="h4">{orders.length}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1">Total Suppliers</Typography>
            <Typography variant="h4">{suppliers.length}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ViewDetailsPage;