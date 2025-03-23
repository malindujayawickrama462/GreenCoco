import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/suppliers/${id}`)
      .then(() => {
        setSuppliers(suppliers.filter(supplier => supplier._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Supplier Name</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map(supplier => (
            <TableRow key={supplier._id}>
              <TableCell>{supplier.supplierName}</TableCell>
              <TableCell>{supplier.companyName}</TableCell>
              <TableCell>{supplier.contactNumber}</TableCell>
              <TableCell>
                <Button component={Link} to={`/suppliers/${supplier._id}`}>View</Button>
                <Button onClick={() => handleDelete(supplier._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SupplierList;