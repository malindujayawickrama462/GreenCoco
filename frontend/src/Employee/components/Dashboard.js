import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [data, setData] = useState({
        totalUsers: 0,
        totalRole: 0,
        totalBorrowAmount: 0,
        totalPaidSalary: 0,
    });

    useEffect(() => {
        fetch('/api/dashboard')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="metrics">
                <div className="metric">
                    <h2>Total Users</h2>
                    <p>{data.totalUsers}</p>
                </div>
                <div className="metric">
                    <h2>Total Role</h2>
                    <p>{data.totalRole}</p>
                </div>
                <div className="metric">
                    <h2>Total Borrow Amount</h2>
                    <p>{data.totalBorrowAmount}</p>
                </div>
                <div className="metric">
                    <h2>Total Paid Salary</h2>
                    <p>{data.totalPaidSalary}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;