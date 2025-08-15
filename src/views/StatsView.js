import React from 'react';
import { Container, Typography, Card, CardContent, Box, Grid, Tabs, Tab } from '@mui/material'; // Ajout de Box ici
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const StatsView = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const [chartType, setChartType] = useState('pie');
  const [timeRange, setTimeRange] = useState('current');
  
  // Filtrer les transactions selon la période sélectionnée
  const now = new Date();
  let filteredTransactions = transactions;
  
  if (timeRange === 'current') {
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return isWithinInterval(transactionDate, { start: monthStart, end: monthEnd });
    });
  } else if (timeRange === 'last3') {
    const threeMonthsAgo = subMonths(now, 3);
    filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= threeMonthsAgo;
    });
  } else if (timeRange === 'last6') {
    const sixMonthsAgo = subMonths(now, 6);
    filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= sixMonthsAgo;
    });
  }
  
  // Calculer les totaux par catégorie
  const categoryTotals = filteredTransactions
    .filter(t => t.amount < 0)
    .reduce((acc, transaction) => {
      const category = transaction.category || 'Autre';
      const amount = Math.abs(transaction.amount);
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

  // Transformer en données pour le graphique
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));
  
  // Calculer les données mensuelles pour le graphique linéaire
  const monthlyData = filteredTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = format(date, 'MMM yyyy', { locale: fr });
    
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
  
  const monthlyChartData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    income: parseFloat(data.income.toFixed(2)),
    expense: parseFloat(data.expense.toFixed(2)),
    balance: parseFloat((data.income - data.expense).toFixed(2))
  }));

  const handleChartTypeChange = (event, newValue) => {
    setChartType(newValue);
  };
  
  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Statistiques</Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Tabs value={timeRange} onChange={handleTimeRangeChange}>
            <Tab label="Mois en cours" value="current" />
            <Tab label="3 derniers mois" value="last3" />
            <Tab label="6 derniers mois" value="last6" />
          </Tabs>
        </CardContent>
      </Card>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Répartition des dépenses</Typography>
                <Tabs value={chartType} onChange={handleChartTypeChange}>
                  <Tab label="Camembert" value="pie" />
                  <Tab label="Barres" value="bar" />
                </Tabs>
              </Box>
              
              <Box sx={{ height: 400 }}>
                {data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'pie' ? (
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}€`, 'Montant']} />
                        <Legend />
                      </PieChart>
                    ) : (
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}€`, 'Montant']} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%' 
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      Aucune dépense à afficher
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Évolution mensuelle</Typography>
              <Box sx={{ height: 400 }}>
                {monthlyChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}€`, 'Montant']} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#00C49F" name="Revenus" />
                      <Line type="monotone" dataKey="expense" stroke="#FF8042" name="Dépenses" />
                      <Line type="monotone" dataKey="balance" stroke="#0088FE" name="Solde" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%' 
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      Aucune donnée à afficher
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatsView;