import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  recurringTransactions: [],
};

const recurringTransactionsSlice = createSlice({
  name: 'recurringTransactions',
  initialState,
  reducers: {
    addRecurringTransaction: (state, action) => {
      state.recurringTransactions.push({
        id: nanoid(),
        ...action.payload,
      });
    },
    updateRecurringTransaction: (state, action) => {
      const { id, ...updatedTransaction } = action.payload;
      const index = state.recurringTransactions.findIndex(t => t.id === id);
      if (index !== -1) {
        state.recurringTransactions[index] = { ...state.recurringTransactions[index], ...updatedTransaction };
      }
    },
    deleteRecurringTransaction: (state, action) => {
      state.recurringTransactions = state.recurringTransactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const { addRecurringTransaction, updateRecurringTransaction, deleteRecurringTransaction } = recurringTransactionsSlice.actions;
export default recurringTransactionsSlice.reducer;