import React from 'react';
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useSelector } from 'react-redux';

const IncomeExpense = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              bgcolor: 'success.main',
              color: 'white'
            }}>
              <TrendingUpIcon sx={{ fontSize: { xs: 30, sm: 40 }, mb: 1 }} />
              <Typography variant="h6">Revenus</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                +{income}€
              </Typography>
              <Button variant="contained" sx={{ mt: 2, bgcolor: 'white', color: 'success.main' }}>
                Ajouter un revenu
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              bgcolor: 'error.main',
              color: 'white'
            }}>
              <TrendingDownIcon sx={{ fontSize: { xs: 30, sm: 40 }, mb: 1 }} />
              <Typography variant="h6">Dépenses</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                -{expense}€
              </Typography>
              <Button variant="contained" sx={{ mt: 2, bgcolor: 'white', color: 'error.main' }}>
                Ajouter une dépense
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Répartition par catégorie
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default IncomeExpense;