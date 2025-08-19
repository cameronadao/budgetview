import { ADD_EXPENSE, DELETE_EXPENSE, GET_EXPENSES, ADD_RECURRING_EXPENSE, GET_RECURRING_EXPENSES } from './types';

// Get expenses from localStorage
export const getExpenses = () => {
  return (dispatch) => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    dispatch({
      type: GET_EXPENSES,
      payload: expenses
    });
  };
};

// Add new expense
export const addExpense = (expense) => {
  return (dispatch) => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    dispatch({
      type: ADD_EXPENSE,
      payload: expense
    });
  };
};

// Delete expense
export const deleteExpense = (id) => {
  return (dispatch) => {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    dispatch({
      type: DELETE_EXPENSE,
      payload: id
    });
  };
};

// Get recurring expenses
export const getRecurringExpenses = () => {
  return (dispatch) => {
    const recurringExpenses = JSON.parse(localStorage.getItem('recurringExpenses')) || [];
    dispatch({
      type: GET_RECURRING_EXPENSES,
      payload: recurringExpenses
    });
  };
};

// Add recurring expense
export const addRecurringExpense = (expense) => {
  return (dispatch) => {
    const recurringExpenses = JSON.parse(localStorage.getItem('recurringExpenses')) || [];
    recurringExpenses.push(expense);
    localStorage.setItem('recurringExpenses', JSON.stringify(recurringExpenses));
    
    dispatch({
      type: ADD_RECURRING_EXPENSE,
      payload: expense
    });
  };
};

export const DELETE_RECURRING_EXPENSE = 'DELETE_RECURRING_EXPENSE';

// Add this function to delete recurring expense
export const deleteRecurringExpense = (id) => {
  return (dispatch) => {
    let recurringExpenses = JSON.parse(localStorage.getItem('recurringExpenses')) || [];
    recurringExpenses = recurringExpenses.filter(expense => expense.id !== id);
    localStorage.setItem('recurringExpenses', JSON.stringify(recurringExpenses));
    
    dispatch({
      type: DELETE_RECURRING_EXPENSE,
      payload: id
    });
  };
};