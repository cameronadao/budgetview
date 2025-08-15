import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, TextField, Button, Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionsSlice';
import { Add } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// Suppression de l'importation 'format'

const IncomeView = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim() || !amount) return;
    
    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
      type: 'income',
      category: 'Revenu',
      date: date.toISOString(),
    };
    
    dispatch(addTransaction(newTransaction));
    setText('');
    setAmount('');
    setDate(new Date());
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Ajouter un Revenu</Typography>
      
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
                  placeholder="Ex: Salaire, Cadeau, etc."
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
                  Ajouter un revenu
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default IncomeView;