import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/orders/${id}`)
      .then(() => {
        setOrders(orders.filter(order => order._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Delivery Method</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.contactNumber}</TableCell>
              <TableCell>{order.deliveryMethod}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>
                <Button component={Link} to={`/orders/${order._id}`}>View</Button>
                <Button onClick={() => handleDelete(order._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;