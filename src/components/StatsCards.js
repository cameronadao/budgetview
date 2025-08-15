import React from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import { useSelector } from 'react-redux';

const StatsCards = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  
  // Calculate stats
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);
    
  const total = (income - expense).toFixed(2);
  
  // Calculate savings rate
  const savingsRate = income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0;
  
  // Calculate average transaction
  const avgTransaction = transactions.length > 0 
    ? (amounts.reduce((acc, item) => (acc += Math.abs(item)), 0) / transactions.length).toFixed(2)
    : 0;

  const stats = [
    {
      title: 'Solde Total',
      value: `${total}€`,
      icon: <AccountBalanceIcon fontSize="large" />,
      color: total >= 0 ? 'success.main' : 'error.main',
      progress: 100,
    },
    {
      title: 'Taux d\'Épargne',
      value: `${savingsRate}%`,
      icon: <SavingsIcon fontSize="large" />,
      color: savingsRate > 20 ? 'success.main' : savingsRate > 10 ? 'warning.main' : 'error.main',
      progress: Math.min(100, Math.max(0, savingsRate)),
    },
    {
      title: 'Revenus',
      value: `${income}€`,
      icon: <TrendingUpIcon fontSize="large" />,
      color: 'success.main',
      progress: 100,
    },
    {
      title: 'Dépenses',
      value: `${expense}€`,
      icon: <TrendingDownIcon fontSize="large" />,
      color: 'error.main',
      progress: 100,
    },
    {
      title: 'Transaction Moyenne',
      value: `${avgTransaction}€`,
      icon: <AccountBalanceIcon fontSize="large" />,
      color: 'primary.main',
      progress: 100,
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: stat.color, mr: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ color: stat.color, mb: 1 }}>
                  {stat.value}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={stat.progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stat.color,
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;