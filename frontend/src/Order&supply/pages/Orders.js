import React from 'react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

const Orders = () => {
  return (
    <div>
      <h1>Order Management</h1>
      <OrderForm /> {/* Render the Order Form */}
      <OrderList /> {/* Render the Order List */}
    </div>
  );
};

export default Orders;