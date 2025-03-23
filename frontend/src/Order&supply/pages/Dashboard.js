// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Typography, Container, Grid, Paper, Box, Button, 
  CircularProgress, Card, CardContent, Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LoopIcon from '@mui/icons-material/Loop';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    ordersCount: 0,
    suppliersCount: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await axios.get('http://localhost:5001/api/orders');
        const orders = ordersResponse.data;
        
        // Fetch suppliers
        const suppliersResponse = await axios.get('http://localhost:5001/api/suppliers');
        const suppliers = suppliersResponse.data;
        
        // Calculate total revenue from all orders
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        setStats({
          ordersCount: orders.length,
          suppliersCount: suppliers.length,
          totalRevenue: totalRevenue
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Sample data for recent activity
  const recentActivity = [
    { id: 1, type: 'order', action: 'New order received', customer: 'John Smith', date: '2 hours ago' },
    { id: 2, type: 'supplier', action: 'New supplier added', name: 'Green Coconut Co.', date: '1 day ago' },
    { id: 3, type: 'order', action: 'Order delivered', customer: 'Alice Johnson', date: '2 days ago' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header Section */}
      <Box className="page-header" sx={{ 
        background: 'linear-gradient(135deg, #00796b 0%, #004c40 100%)',
        p: 3,
        borderRadius: 2,
        mb: 4,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 600,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 60,
            height: 4,
            backgroundColor: '#ffa000',
            borderRadius: 2
          }
        }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/orders"
            startIcon={<ShoppingCartIcon />}
            sx={{ 
              backgroundColor: '#ffa000',
              '&:hover': {
                backgroundColor: '#ff8f00'
              }
            }}
          >
            New Order
          </Button>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/suppliers"
            startIcon={<InventoryIcon />}
            sx={{ 
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: '#ffa000',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            New Supplier
          </Button>
        </Box>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
          <CircularProgress sx={{ color: '#00796b' }} />
        </Box>
      ) : (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { 
                icon: <ShoppingCartIcon sx={{ color: '#00796b' }} />, 
                title: 'Total Orders', 
                value: stats.ordersCount, 
                color: '#00796b' 
              },
              { 
                icon: <InventoryIcon sx={{ color: '#ffa000' }} />, 
                title: 'Total Suppliers', 
                value: stats.suppliersCount, 
                color: '#ffa000' 
              },
              { 
                icon: <TrendingUpIcon sx={{ color: '#4caf50' }} />, 
                title: 'Total Revenue', 
                value: `$${stats.totalRevenue.toFixed(2)}`, 
                color: '#4caf50' 
              }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ 
                  p: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: 140,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      backgroundColor: `rgba(${stat.color}, 0.1)`, 
                      borderRadius: '50%',
                      p: 1,
                      mr: 2
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 600, color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity and Info Card */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  bgcolor: '#00796b', 
                  py: 2, 
                  px: 3,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <LoopIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Recent Activity
                  </Typography>
                </Box>
                <CardContent>
                  {recentActivity.length > 0 ? (
                    recentActivity.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <Box sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                              {item.action}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.date}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {item.type === 'order' ? `Customer: ${item.customer}` : `Supplier: ${item.name}`}
                          </Typography>
                        </Box>
                        {index < recentActivity.length - 1 && (
                          <Divider />
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ py: 4, textAlign: 'center' }}>
                      No recent activity
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Card sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #004c40 0%, #00796b 100%)',
                p: 4
              }}>
                <RecyclingIcon sx={{ fontSize: 60, color: 'white', opacity: 0.9, mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
                  Coconut Waste Management System
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', opacity: 0.9, textAlign: 'center', mb: 3 }}>
                  Efficiently manage orders and suppliers for sustainable coconut waste processing
                </Typography>
                <Button 
                  variant="contained" 
                  component={Link}
                  to="/view"
                  sx={{ 
                    backgroundColor: 'white',
                    color: '#00796b',
                    '&:hover': {
                      backgroundColor: '#e0f2f1'
                    }
                  }}
                >
                  View Details
                </Button>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;