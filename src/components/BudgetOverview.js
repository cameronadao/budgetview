import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

const BudgetOverview = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  
  // Get current month transactions
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  
  const currentMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return isWithinInterval(transactionDate, { start: monthStart, end: monthEnd });
  });
  
  // Calculate expenses by category
  const categoryExpenses = currentMonthTransactions
    .filter(t => t.amount < 0)
    .reduce((acc, transaction) => {
      const category = transaction.category || 'Autre';
      const amount = Math.abs(transaction.amount);
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});
  
  // Budget limits
  const budgetLimits = {
    'Alimentation': 400,
    'Logement': 800,
    'Transport': 200,
    'Loisirs': 150,
    'Santé': 100,
    'Autre': 200,
  };
  
  // Calculate budget usage
  const budgetData = Object.entries(categoryExpenses).map(([category, spent]) => {
    const limit = budgetLimits[category] || 200;
    const percentage = Math.min(100, (spent / limit) * 100);
    return {
      category,
      spent,
      limit,
      percentage,
    };
  });
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 3 }}>
          Budget Mensuel
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          {format(now, 'MMMM yyyy', { locale: fr })}
        </Typography>
        
        {budgetData.length > 0 ? (
          <Box>
            {budgetData.map((item, index) => (
              <Box key={item.category} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{item.category}</Typography>
                  <Typography variant="body2">
                    {item.spent.toFixed(2)}€ / {item.limit}€
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={item.percentage} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.percentage > 90 ? 'error.main' : 
                                        item.percentage > 75 ? 'warning.main' : 
                                        'success.main',
                    }
                  }} 
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Aucune dépense ce mois-ci
          </Typography>
        )}
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" size="small">
            Modifier le budget
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;