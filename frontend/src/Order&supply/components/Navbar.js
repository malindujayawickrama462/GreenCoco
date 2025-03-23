import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, 
         ListItemText, useMediaQuery, useTheme, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import RecyclingIcon from '@mui/icons-material/Recycling';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Order Management', icon: <ShoppingCartIcon />, path: '/orders' },
    { text: 'Supplier Management', icon: <BusinessIcon />, path: '/suppliers' },
    { text: 'View Details', icon: <VisibilityIcon />, path: '/view' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky" sx={{ 
      backgroundColor: '#00796b',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <RecyclingIcon sx={{ mr: 1.5, fontSize: 28 }} />
          <Typography variant="h5" sx={{ 
            fontWeight: 600,
            backgroundImage: 'linear-gradient(45deg, #ffffff, #e0f2f1)',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            Coconut Waste Management
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
            >
              <Box sx={{ width: 280, pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#00796b', fontWeight: 500 }}>
                    Menu
                  </Typography>
                  <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider />
                <List>
                  {navItems.map((item) => (
                    <ListItem 
                      button 
                      component={Link} 
                      to={item.path} 
                      key={item.text}
                      onClick={toggleDrawer}
                      sx={{
                        backgroundColor: isActive(item.path) ? 'rgba(0, 121, 107, 0.1)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 121, 107, 0.05)'
                        },
                        borderRadius: 1,
                        mx: 1,
                        my: 0.5
                      }}
                    >
                      <Box sx={{ mr: 2, color: '#00796b' }}>{item.icon}</Box>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  mx: 0.5,
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;