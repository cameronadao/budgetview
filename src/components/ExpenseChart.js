import React from 'react';
import { Card, CardContent, Typography, Box, Tabs, Tab } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ExpenseChart = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const [chartType, setChartType] = useState('pie');
  
  // Calculer les totaux par catégorie
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.amount < 0) {
      const category = transaction.category || 'Autre';
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  // Transformer en données pour le graphique
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  const handleChartTypeChange = (event, newValue) => {
    setChartType(newValue);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="div">
            Analyse des Dépenses
          </Typography>
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
  );
};

export default ExpenseChart;