import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditEmployee.css';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    EmployeeName: '',
    DepartmentName: '',
    EmployeeId: '',
    PhoneNumber: '',
    Email: '',
    JobRole: '',
    BasicSalary: 0,
    Bonus: 0,
    OverTimeHours: 0,
  });

  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!employee.EmployeeName.trim()) tempErrors.EmployeeName = 'Employee Name is required';
    if (!employee.DepartmentName.trim()) tempErrors.DepartmentName = 'Department Name is required';
    if (!employee.EmployeeId.trim()) tempErrors.EmployeeId = 'Employee ID is required';
    if (!employee.JobRole.trim()) tempErrors.JobRole = 'Job Role is required';
    if (!employee.Email.trim()) tempErrors.Email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.Email)) tempErrors.Email = 'Invalid email format';
    if (!String(employee.PhoneNumber).trim()) tempErrors.PhoneNumber = 'Phone Number is required';
    else if (!/^\d{10}$/.test(employee.PhoneNumber)) tempErrors.PhoneNumber = 'Invalid phone number (10 digits required)';
    if (employee.BasicSalary < 0) tempErrors.BasicSalary = 'Basic Salary cannot be negative';
    if (employee.Bonus < 0) tempErrors.Bonus = 'Bonus cannot be negative';
    if (employee.OverTimeHours < 0) tempErrors.OverTimeHours = 'Overtime Hours cannot be negative';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, employee);
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Error updating employee: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="employee-form">
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-group">
            <label>Employee Name</label>
            <input type="text" name="EmployeeName" value={employee.EmployeeName} onChange={handleChange} required />
            {errors.EmployeeName && <span className="error">{errors.EmployeeName}</span>}
          </div>
          <div className="form-group">
            <label>Department Name</label>
            <input type="text" name="DepartmentName" value={employee.DepartmentName} onChange={handleChange} required />
            {errors.DepartmentName && <span className="error">{errors.DepartmentName}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Details</legend>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="PhoneNumber" value={employee.PhoneNumber} onChange={handleChange} required />
            {errors.PhoneNumber && <span className="error">{errors.PhoneNumber}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="Email" value={employee.Email} onChange={handleChange} required />
            {errors.Email && <span className="error">{errors.Email}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Job Information</legend>
          <div className="form-group">
            <label>Employee ID</label>
            <input type="text" name="EmployeeId" value={employee.EmployeeId} onChange={handleChange} required />
            {errors.EmployeeId && <span className="error">{errors.EmployeeId}</span>}
          </div>
          <div className="form-group">
            <label>Job Role</label>
            <input type="text" name="JobRole" value={employee.JobRole} onChange={handleChange} required />
            {errors.JobRole && <span className="error">{errors.JobRole}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Salary & Benefits</legend>
          <div className="form-group">
            <label>Basic Salary</label>
            <input type="number" name="BasicSalary" value={employee.BasicSalary} onChange={handleChange} required />
            {errors.BasicSalary && <span className="error">{errors.BasicSalary}</span>}
          </div>
          <div className="form-group">
            <label>Bonus</label>
            <input type="number" name="Bonus" value={employee.Bonus} onChange={handleChange} />
            {errors.Bonus && <span className="error">{errors.Bonus}</span>}
          </div>
          <div className="form-group">
            <label>Overtime Hours</label>
            <input type="number" name="OverTimeHours" value={employee.OverTimeHours} onChange={handleChange} />
            {errors.OverTimeHours && <span className="error">{errors.OverTimeHours}</span>}
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Update Employee</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
