import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionsSlice';
import { Add } from '@mui/icons-material';

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

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Autre');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim() || !amount) return;
    
    // Déterminer la catégorie finale
    const finalCategory = category === 'Autre' && customCategory.trim() 
      ? customCategory.trim() 
      : category;
    
    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount * (type === 'expense' ? -1 : 1),
      type,
      category: type === 'expense' ? finalCategory : 'Revenu',
      date: new Date(date).toISOString(),
    };
    
    dispatch(addTransaction(newTransaction));
    setText('');
    setAmount('');
    setType('expense');
    setCategory('Autre');
    setCustomCategory('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 3 }}>
          Ajouter une Transaction
        </Typography>
        
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Libellé"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Entrez un libellé..."
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
              <FormControl component="fieldset">
                <Typography variant="body1" sx={{ mb: 1 }}>Type</Typography>
                <RadioGroup
                  row
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel value="income" control={<Radio />} label="Revenu" />
                  <FormControlLabel value="expense" control={<Radio />} label="Dépense" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            {type === 'expense' && (
              <>
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
                
                {category === 'Autre' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nom de la catégorie"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Entrez un nom de catégorie personnalisé"
                    />
                  </Grid>
                )}
              </>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<Add />}
                sx={{ mt: 2 }}
              >
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddTransaction;