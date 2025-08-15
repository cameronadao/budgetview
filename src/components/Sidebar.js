import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'Solde', icon: <AccountBalanceIcon />, path: '/balance' },
    { text: 'Revenus', icon: <TrendingUpIcon />, path: '/income' },
    { text: 'Dépenses', icon: <TrendingDownIcon />, path: '/expense' },
    { text: 'Statistiques', icon: <PieChartIcon />, path: '/stats' },
    { text: 'Calendrier', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Ajouter Transaction', icon: <AddCircleIcon />, path: '/add-transaction' },
    { text: 'Paramètres', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;