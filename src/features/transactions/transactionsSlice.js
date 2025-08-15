import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  };
  
  const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('transactions');
      if (serializedState === null) return [];
      return JSON.parse(serializedState);
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
      return [];
    }
  };
  
  const initialState = {
    transactions: loadFromLocalStorage(),
  };
  
  const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
      addTransaction: (state, action) => {
        state.transactions.push(action.payload);
        saveToLocalStorage(state);
      },
      deleteTransaction: (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );
        saveToLocalStorage(state);
      },
    },
  });

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;