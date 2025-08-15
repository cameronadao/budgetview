import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Balance = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/balance');
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="div">
            Solde Actuel
          </Typography>
        </Box>
        <Typography 
          variant="h2" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: total >= 0 ? 'success.main' : 'error.main',
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          {total}€
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Mis à jour aujourd'hui
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" fullWidth onClick={handleViewDetails}>
            Voir le détail
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Balance;