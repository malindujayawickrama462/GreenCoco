import React from 'react';
import SupplierList from '../components/SupplierList';
import SupplierForm from '../components/SupplierForm';

const Suppliers = () => {
  return (
    <div>
      <h1>Supplier Management</h1>
      <SupplierForm /> {/* Render the Supplier Form */}
      <SupplierList /> {/* Render the Supplier List */}
    </div>
  );
};

export default Suppliers;