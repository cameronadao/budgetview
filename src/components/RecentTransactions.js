import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, InputAdornment, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../features/transactions/transactionsSlice';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const RecentTransactions = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Typography variant="h5" component="div">
            Transactions Récentes
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              variant="outlined"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: '100%', sm: 200 } }}
            />
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Box>
        </Box>
        
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Date</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell align="right">Montant</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.slice(0, 10).map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {transaction.text}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'block', sm: 'none' } }}>
                        {format(new Date(transaction.date), 'dd MMM yyyy', { locale: fr })}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {format(new Date(transaction.date), 'dd MMM yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell>
                      {transaction.category && (
                        <Chip 
                          label={transaction.category} 
                          size="small" 
                          variant="outlined"
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: transaction.amount < 0 ? 'error.main' : 'success.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {transaction.amount < 0 ? '-' : '+'}
                        {Math.abs(transaction.amount).toFixed(2)}€
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        color="error"
                        onClick={() => dispatch(deleteTransaction(transaction.id))}
                      >
                        ×
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary">
                      {searchTerm ? 'Aucune transaction trouvée' : 'Aucune transaction enregistrée'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;