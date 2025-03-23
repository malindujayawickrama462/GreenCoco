import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TextField, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Container, Box, CircularProgress, Snackbar, Alert 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    supplierName: '',
    companyName: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    setLoading(true);
    axios.get('http://localhost:5001/api/suppliers')
      .then(response => {
        setSuppliers(response.data);
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
    axios.post('http://localhost:5001/api/suppliers', formData)
      .then(response => {
        setSuppliers([...suppliers, response.data]);
        setFormData({ supplierName: '', companyName: '', contactNumber: '' });
        setSnackbar({ open: true, message: 'Supplier added successfully!', severity: 'success' });
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setSnackbar({ open: true, message: 'Failed to add supplier.', severity: 'error' });
        setLoading(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#004c40', mb: 4 }}>
        Supplier Management
      </Typography>

      {/* Create New Supplier Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#00796b' }}>
          Add New Supplier
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Supplier Name"
                value={formData.supplierName}
                onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
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
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Add Supplier'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Supplier List */}
      <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#00796b' }}>
        Supplier List
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#00796b' }}>
              <TableCell sx={{ color: 'white' }}>Supplier Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Company Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map(supplier => (
              <TableRow key={supplier._id} hover>
                <TableCell>{supplier.supplierName}</TableCell>
                <TableCell>{supplier.companyName}</TableCell>
                <TableCell>{supplier.contactNumber}</TableCell>
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

export default SupplierManagement;