import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, InputAdornment, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="div">
            Transactions Récentes
          </Typography>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher une transaction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.slice(0, 10).map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2,
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {transaction.text}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        {format(new Date(transaction.date), 'dd MMM yyyy', { locale: fr })}
                      </Typography>
                      {transaction.category && (
                        <Chip 
                          label={transaction.category} 
                          size="small" 
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mr: 2,
                        color: transaction.amount < 0 ? 'error.main' : 'success.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {transaction.amount < 0 ? '-' : '+'}
                      {Math.abs(transaction.amount).toFixed(2)}€
                    </Typography>
                    <Box 
                      component="button" 
                      sx={{ 
                        background: 'none',
                        border: 'none',
                        color: 'error.main',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        '&:hover': {
                          color: 'error.dark',
                        }
                      }}
                      onClick={() => dispatch(deleteTransaction(transaction.id))}
                    >
                      ×
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))
          ) : (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              minHeight: 200
            }}>
              <Typography variant="body2" color="text.secondary">
                {searchTerm ? 'Aucune transaction trouvée' : 'Aucune transaction enregistrée'}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;