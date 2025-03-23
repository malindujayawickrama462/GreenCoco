import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <Link to="/add" className="add-button">Add Employee</Link>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Employee ID</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Job Role</th>
            <th>Basic Salary (Rs)</th>
            <th>Bonus (Rs)</th>
            <th>Overtime Payment (Rs)</th>
            <th>Net Salary (Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) && employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.EmployeeName}</td>
              <td>{employee.DepartmentName}</td>
              <td>{employee.EmployeeId}</td>
              <td>{employee.PhoneNumber}</td>
              <td>{employee.Email}</td>
              <td>{employee.JobRole}</td>
              <td>{employee.BasicSalary}</td>
              <td>{employee.Bonus}</td>
              <td>{employee.OverTimePayment}</td>
              <td>{employee.NetSalary}</td>
              <td>
                <button className="update-btn" onClick={() => navigate(`/edit/${employee._id}`)}>Update</button>
                <button className="delete-btn" onClick={() => deleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;