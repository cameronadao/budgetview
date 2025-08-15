import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addRecurringTransaction, updateRecurringTransaction, deleteRecurringTransaction } from '../features/recurringTransactions/recurringTransactionsSlice';
import { v4 as uuidv4 } from 'uuid';

const frequencies = [
  { value: 'daily', label: 'Quotidien' },
  { value: 'weekly', label: 'Hebdomadaire' },
  { value: 'monthly', label: 'Mensuel' },
  { value: 'yearly', label: 'Annuel' },
];

const categories = [
  'Alimentation',
  'Logement',
  'Transport',
  'Loisirs',
  'Santé',
  'Shopping',
  'Voyages',
  'Éducation',
  'Abonnements',
  'Autre'
];

const RecurringTransactionsManager = () => {
  const [open, setOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    amount: '',
    category: 'Autre',
    frequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });
  
  const dispatch = useDispatch();
  const recurringTransactions = useSelector((state) => state.recurringTransactions.recurringTransactions);

  const handleOpenDialog = (transaction = null) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        text: transaction.text,
        amount: Math.abs(transaction.amount),
        category: transaction.category,
        frequency: transaction.frequency,
        startDate: transaction.startDate,
        endDate: transaction.endDate || '',
      });
    } else {
      setEditingTransaction(null);
      setFormData({
        text: '',
        amount: '',
        category: 'Autre',
        frequency: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (editingTransaction) {
      dispatch(updateRecurringTransaction({ id: editingTransaction.id, ...transactionData }));
    } else {
      dispatch(addRecurringTransaction(transactionData));
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette dépense récurrente ?')) {
      dispatch(deleteRecurringTransaction(id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Dépenses Récurrentes</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Ajouter
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell>Fréquence</TableCell>
                  <TableCell>Date de début</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recurringTransactions.length > 0 ? (
                  recurringTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.text}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <Typography 
                          color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                        >
                          {transaction.amount < 0 ? '-' : '+'}
                          {Math.abs(transaction.amount).toFixed(2)}€
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {frequencies.find(f => f.value === transaction.frequency)?.label}
                      </TableCell>
                      <TableCell>{transaction.startDate}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleOpenDialog(transaction)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body2" color="text.secondary">
                        Aucune dépense récurrente enregistrée
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTransaction ? 'Modifier la dépense récurrente' : 'Ajouter une dépense récurrente'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Ex: Netflix, Salaire, Abonnement téléphonique..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Montant"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Entrez un montant..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Catégorie"
                  onChange={handleInputChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Fréquence</InputLabel>
                <Select
                  name="frequency"
                  value={formData.frequency}
                  label="Fréquence"
                  onChange={handleInputChange}
                >
                  {frequencies.map((freq) => (
                    <MenuItem key={freq.value} value={freq.value}>{freq.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date de début"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date de fin (optionnelle)"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTransaction ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecurringTransactionsManager;