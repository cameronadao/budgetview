import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionsSlice';
import recurringTransactionsReducer from '../features/recurringTransactions/recurringTransactionsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    recurringTransactions: recurringTransactionsReducer,
  },
});