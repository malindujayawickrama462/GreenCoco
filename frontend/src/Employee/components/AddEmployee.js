import './AddEmployee.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    EmployeeName: '',
    DepartmentName: '',
    EmployeeId: '',
    PhoneNumber: '',
    Email: '',
    JobRole: '',
    BasicSalary: '',
    Bonus: '',
    OverTimeHours: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    // Clear the error for the field when the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate Employee Name
    if (!employee.EmployeeName.trim()) {
      newErrors.EmployeeName = 'Employee Name is required';
    }

    // Validate Department Name
    if (!employee.DepartmentName.trim()) {
      newErrors.DepartmentName = 'Department Name is required';
    }

    // Validate Employee ID
    if (!employee.EmployeeId.trim()) {
      newErrors.EmployeeId = 'Employee ID is required';
    }

    // Validate Phone Number
    if (!employee.PhoneNumber.trim()) {
      newErrors.PhoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(employee.PhoneNumber)) {
      newErrors.PhoneNumber = 'Phone Number must be exactly 10 digits';
    }

    // Validate Email
    if (!employee.Email.trim()) {
      newErrors.Email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.Email)) {
      newErrors.Email = 'Invalid email format';
    }

    // Validate Job Role
    if (!employee.JobRole.trim()) {
      newErrors.JobRole = 'Job Role is required';
    }

    // Validate Basic Salary
    if (!employee.BasicSalary || employee.BasicSalary <= 0) {
      newErrors.BasicSalary = 'Basic Salary must be greater than 0';
    }

    // Validate Bonus (optional, but must be non-negative if provided)
    if (employee.Bonus && employee.Bonus < 0) {
      newErrors.Bonus = 'Bonus cannot be negative';
    }

    // Validate OverTimeHours (optional, but must be non-negative if provided)
    if (employee.OverTimeHours && employee.OverTimeHours < 0) {
      newErrors.OverTimeHours = 'Overtime Hours cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/employees/', employee, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Employee added successfully!');
      navigate('/');
    } catch (error) {
      alert('Error adding employee: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="employee-form">
      <h2>Add Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-group">
            <label>Employee Name</label>
            <input type="text" name="EmployeeName" value={employee.EmployeeName} onChange={handleChange} required />
            {errors.EmployeeName && <span className="error-text">{errors.EmployeeName}</span>}
          </div>
          <div className="form-group">
            <label>Department Name</label>
            <input type="text" name="DepartmentName" value={employee.DepartmentName} onChange={handleChange} required />
            {errors.DepartmentName && <span className="error-text">{errors.DepartmentName}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Details</legend>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="PhoneNumber" value={employee.PhoneNumber} onChange={handleChange} required />
            {errors.PhoneNumber && <span className="error-text">{errors.PhoneNumber}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="Email" value={employee.Email} onChange={handleChange} required />
            {errors.Email && <span className="error-text">{errors.Email}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Job Information</legend>
          <div className="form-group">
            <label>Employee ID</label>
            <input type="text" name="EmployeeId" value={employee.EmployeeId} onChange={handleChange} required />
            {errors.EmployeeId && <span className="error-text">{errors.EmployeeId}</span>}
          </div>
          <div className="form-group">
            <label>Job Role</label>
            <input type="text" name="JobRole" value={employee.JobRole} onChange={handleChange} required />
            {errors.JobRole && <span className="error-text">{errors.JobRole}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Salary & Benefits</legend>
          <div className="form-group">
            <label>Basic Salary</label>
            <input type="number" name="BasicSalary" value={employee.BasicSalary} onChange={handleChange} required />
            {errors.BasicSalary && <span className="error-text">{errors.BasicSalary}</span>}
          </div>
          <div className="form-group">
            <label>Bonus</label>
            <input type="number" name="Bonus" value={employee.Bonus} onChange={handleChange} />
            {errors.Bonus && <span className="error-text">{errors.Bonus}</span>}
          </div>
          <div className="form-group">
            <label>Overtime Hours</label>
            <input type="number" name="OverTimeHours" value={employee.OverTimeHours} onChange={handleChange} />
            {errors.OverTimeHours && <span className="error-text">{errors.OverTimeHours}</span>}
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Employee</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;