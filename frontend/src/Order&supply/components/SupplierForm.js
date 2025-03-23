// src/components/SupplierForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, Button, Container, Typography, Box, 
  Paper, Grid, Snackbar, Alert, CircularProgress 
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const SupplierForm = ({ supplier, onCancel }) => {
  const [formData, setFormData] = useState({
    supplierName: supplier ? supplier.supplierName : '',
    contactNumber: supplier ? supplier.contactNumber : '',
    companyName: supplier ? supplier.companyName : '',
    address: supplier ? supplier.address : '',
    supplierId: supplier ? supplier.supplierId : '',
    products: supplier ? supplier.products : []
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (supplier) {
        // Update existing supplier
        await axios.put(`http://localhost:5001/api/suppliers/${supplier._id}`, formData);
        setSnackbar({
          open: true,
          message: 'Supplier updated successfully!',
          severity: 'success'
        });
      } else {
        // Create new supplier
        await axios.post('http://localhost:5001/api/suppliers', formData);
        setSnackbar({
          open: true,
          message: 'Supplier created successfully!',
          severity: 'success'
        });
        
        // Reset form if creating a new supplier
        if (!supplier) {
          setFormData({
            supplierName: '',
            contactNumber: '',
            companyName: '',
            address: '',
            supplierId: '',
            products: []
          });
        }
      }
      
      // Delay reload to show the success message
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error saving supplier:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save supplier. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden',
        mb: 4,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box 
        sx={{ 
          bgcolor: '#00796b', 
          py: 2, 
          px: 3,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <BusinessIcon sx={{ color: 'white', mr: 1.5 }} />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
          {supplier ? 'Edit Supplier' : 'Add New Supplier'}
        </Typography>
      </Box>
      
      <Container sx={{ py: 4 }}>
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
                InputProps={{
                  sx: { borderRadius: 1.5 }
                }}
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
                InputProps={{
                  sx: { borderRadius: 1.5 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 1.5 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 1.5 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Supplier ID"
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 1.5 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={onCancel}
                  sx={{ 
                    borderColor: '#00796b',
                    color: '#00796b',
                    '&:hover': {
                      borderColor: '#004c40',
                      backgroundColor: 'rgba(0, 121, 107, 0.05)'
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={loading}
                  sx={{ 
                    backgroundColor: '#00796b',
                    '&:hover': {
                      backgroundColor: '#004c40'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>

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
    </Paper>
  );
};

export default SupplierForm;