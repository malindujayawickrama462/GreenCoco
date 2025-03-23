import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Typography, Container, Box 
} from '@mui/material';

const ViewDetails = () => {
  const [users, setUsers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:5001/api/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#004c40', mb: 4 }}>
        View Details
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#00796b' }}>
              <TableCell sx={{ color: 'white' }}>Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id} hover>
                <TableCell>User</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email} - {user.role}</TableCell>
              </TableRow>
            ))}
            {suppliers.map(supplier => (
              <TableRow key={supplier._id} hover>
                <TableCell>Supplier</TableCell>
                <TableCell>{supplier.supplierName}</TableCell>
                <TableCell>{supplier.companyName} - {supplier.contactNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewDetails;