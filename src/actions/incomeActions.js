import { ADD_INCOME, DELETE_INCOME, GET_INCOME, ADD_RECURRING_INCOME, GET_RECURRING_INCOME } from './types';

// Get income from localStorage
export const getIncome = () => {
  return (dispatch) => {
    const income = JSON.parse(localStorage.getItem('income')) || [];
    dispatch({
      type: GET_INCOME,
      payload: income
    });
  };
};

// Add new income
export const addIncome = (income) => {
  return (dispatch) => {
    const incomes = JSON.parse(localStorage.getItem('income')) || [];
    incomes.push(income);
    localStorage.setItem('income', JSON.stringify(incomes));
    
    dispatch({
      type: ADD_INCOME,
      payload: income
    });
  };
};

// Delete income
export const deleteIncome = (id) => {
  return (dispatch) => {
    let incomes = JSON.parse(localStorage.getItem('income')) || [];
    incomes = incomes.filter(inc => inc.id !== id);
    localStorage.setItem('income', JSON.stringify(incomes));
    
    dispatch({
      type: DELETE_INCOME,
      payload: id
    });
  };
};

// Get recurring income
export const getRecurringIncome = () => {
  return (dispatch) => {
    const recurringIncome = JSON.parse(localStorage.getItem('recurringIncome')) || [];
    dispatch({
      type: GET_RECURRING_INCOME,
      payload: recurringIncome
    });
  };
};

// Add recurring income
export const addRecurringIncome = (income) => {
  return (dispatch) => {
    const recurringIncome = JSON.parse(localStorage.getItem('recurringIncome')) || [];
    recurringIncome.push(income);
    localStorage.setItem('recurringIncome', JSON.stringify(recurringIncome));
    
    dispatch({
      type: ADD_RECURRING_INCOME,
      payload: income
    });
  };
};

export const DELETE_RECURRING_INCOME = 'DELETE_RECURRING_INCOME';

// Add this function to delete recurring income
export const deleteRecurringIncome = (id) => {
  return (dispatch) => {
    let recurringIncome = JSON.parse(localStorage.getItem('recurringIncome')) || [];
    recurringIncome = recurringIncome.filter(income => income.id !== id);
    localStorage.setItem('recurringIncome', JSON.stringify(recurringIncome));
    
    dispatch({
      type: DELETE_RECURRING_INCOME,
      payload: id
    });
  };
};