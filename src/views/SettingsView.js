import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Box, Switch, FormControlLabel, Divider, Button, TextField, Grid } from '@mui/material';
import { useTheme } from '../hooks/useTheme';

const SettingsView = () => {
  const { theme, toggleTheme } = useTheme();
  const [budgetLimits, setBudgetLimits] = useState({
    'Alimentation': 400,
    'Logement': 800,
    'Transport': 200,
    'Loisirs': 150,
    'Santé': 100,
    'Autre': 200,
  });

  const handleBudgetChange = (category, value) => {
    setBudgetLimits({
      ...budgetLimits,
      [category]: parseFloat(value) || 0
    });
  };

  const handleSaveBudgets = () => {
    // Logique pour sauvegarder les budgets
    console.log('Budgets sauvegardés:', budgetLimits);
    alert('Budgets sauvegardés avec succès!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Paramètres</Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Apparence</Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                color="primary"
              />
            }
            label="Mode sombre"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Budgets mensuels</Typography>
          
          <Grid container spacing={2}>
            {Object.entries(budgetLimits).map(([category, limit]) => (
              <Grid item xs={12} sm={6} key={category}>
                <TextField
                  fullWidth
                  label={category}
                  type="number"
                  value={limit}
                  onChange={(e) => handleBudgetChange(category, e.target.value)}
                  InputProps={{
                    endAdornment: <span>€</span>
                  }}
                />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleSaveBudgets}>
              Sauvegarder
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SettingsView;