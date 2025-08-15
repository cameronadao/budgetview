import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionsSlice';
import { Add } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const categories = [
  'Alimentation',
  'Logement',
  'Transport',
  'Loisirs',
  'Santé',
  'Shopping',
  'Voyages',
  'Éducation',
  'Autre'
];

const ExpenseView = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Autre');
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim() || !amount) return;
    
    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: -Math.abs(+amount),
      type: 'expense',
      category,
      date: date.toISOString(),
    };
    
    dispatch(addTransaction(newTransaction));
    setText('');
    setAmount('');
    setCategory('Autre');
    setDate(new Date());
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Ajouter une Dépense</Typography>
      
      <Card>
        <CardContent>
          <Box component="form" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Libellé"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ex: Courses, Restaurant, etc."
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Montant"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Entrez un montant..."
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={category}
                    label="Catégorie"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                  <DateTimePicker
                    label="Date et heure"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ mt: 2 }}
                >
                  Ajouter une dépense
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ExpenseView;