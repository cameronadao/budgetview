import { 
    ADD_EXPENSE, 
    DELETE_EXPENSE, 
    GET_EXPENSES,
    ADD_RECURRING_EXPENSE,
    GET_RECURRING_EXPENSES,
    DELETE_RECURRING_EXPENSE
  } from '../actions/types';
  
  const initialState = {
    expenses: [],
    recurringExpenses: []
  };
  
  // Named function for the reducer
  function expensesReducer(state = initialState, action) {
    switch (action.type) {
      case GET_EXPENSES:
        return {
          ...state,
          expenses: action.payload
        };
      case ADD_EXPENSE:
        return {
          ...state,
          expenses: [...state.expenses, action.payload]
        };
      case DELETE_EXPENSE:
        return {
          ...state,
          expenses: state.expenses.filter(expense => expense.id !== action.payload)
        };
      case GET_RECURRING_EXPENSES:
        return {
          ...state,
          recurringExpenses: action.payload
        };
      case ADD_RECURRING_EXPENSE:
        return {
          ...state,
          recurringExpenses: [...state.recurringExpenses, action.payload]
        };
      case DELETE_RECURRING_EXPENSE:
        return {
          ...state,
          recurringExpenses: state.recurringExpenses.filter(expense => expense.id !== action.payload)
        };
      default:
        return state;
    }
  }
  
  export default expensesReducer;