import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BalanceView = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
  // Calculer les transactions par mois
  const monthlyTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = format(date, 'MMMM yyyy', { locale: fr });
    
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expense: 0 };
    }
    
    if (transaction.amount > 0) {
      acc[monthYear].income += transaction.amount;
    } else {
      acc[monthYear].expense += Math.abs(transaction.amount);
    }
    
    return acc;
  }, {});

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Détail du Solde</Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main', fontSize: 40 }} />
            <Typography variant="h5" component="div">
              Solde Actuel
            </Typography>
          </Box>
          <Typography 
            variant="h2" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: total >= 0 ? 'success.main' : 'error.main'
            }}
          >
            {total}€
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Mis à jour aujourd'hui
          </Typography>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Historique mensuel</Typography>
          {Object.entries(monthlyTransactions).map(([monthYear, data]) => (
            <Box key={monthYear} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="subtitle1" fontWeight="bold">{monthYear}</Typography>
              <Typography variant="body2" color="success.main">
                Revenus: {data.income.toFixed(2)}€
              </Typography>
              <Typography variant="body2" color="error.main">
                Dépenses: {data.expense.toFixed(2)}€
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                Solde: {(data.income - data.expense).toFixed(2)}€
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default BalanceView;