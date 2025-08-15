import React from 'react';
import { 
  Drawer, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Toolbar, 
  Typography,
  Chip,
  Avatar,
  Collapse
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Ajout de cette ligne
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import { useState } from 'react';

const drawerWidth = 240;

const Sidebar = () => {
  const [reportsOpen, setReportsOpen] = useState(false);
  
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'Solde', icon: <AccountBalanceIcon />, path: '/balance' },
    { text: 'Revenus', icon: <TrendingUpIcon />, path: '/income' },
    { text: 'Dépenses', icon: <TrendingDownIcon />, path: '/expense' },
  ];

  const reportsItems = [
    { text: 'Statistiques', icon: <PieChartIcon />, path: '/stats' },
    { text: 'Calendrier', icon: <CalendarTodayIcon />, path: '/calendar' },
  ];

  const otherItems = [
    { text: 'Ajouter Transaction', icon: <AddCircleIcon />, path: '/add-transaction' },
    { text: 'Paramètres', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(226, 232, 240, 0.8)',
        },
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <AccountBalanceWalletIcon /> {/* Maintenant cette icône est définie */}
          </Avatar>
          <Box>
            <Typography variant="h6" color="text.secondary">
              BudgetView
            </Typography>
            <Typography variant="caption" color="text.secondary">
              v2.0
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Box sx={{ overflow: 'auto', px: 1 }}>
        <List>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ListItem 
                button 
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.active': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </motion.div>
          ))}
          
          <ListItem button onClick={() => setReportsOpen(!reportsOpen)}>
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary="Rapports" />
            {reportsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          
          <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {reportsItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ListItem 
                    button 
                    component={NavLink}
                    to={item.path}
                    sx={{
                      pl: 4,
                      borderRadius: 2,
                      mb: 0.5,
                      '&.active': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Collapse>
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <List>
          {otherItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ListItem 
                button 
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.active': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </motion.div>
          ))}
        </List>
        
        <Box sx={{ p: 2, mt: 2, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            BudgetView Pro
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
            Gérez vos finances comme un pro
          </Typography>
          <Chip 
            label="Mise à jour: v2.0" 
            size="small" 
            sx={{ mt: 1, bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;