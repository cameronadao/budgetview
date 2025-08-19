import { 
    ADD_INCOME, 
    DELETE_INCOME, 
    GET_INCOME,
    ADD_RECURRING_INCOME,
    GET_RECURRING_INCOME,
    DELETE_RECURRING_INCOME
  } from '../actions/types';
  
  const initialState = {
    income: [],
    recurringIncome: []
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_INCOME:
        return {
          ...state,
          income: action.payload
        };
      case ADD_INCOME:
        return {
          ...state,
          income: [...state.income, action.payload]
        };
      case DELETE_INCOME:
        return {
          ...state,
          income: state.income.filter(inc => inc.id !== action.payload)
        };
      case GET_RECURRING_INCOME:
        return {
          ...state,
          recurringIncome: action.payload
        };
      case ADD_RECURRING_INCOME:
        return {
          ...state,
          recurringIncome: [...state.recurringIncome, action.payload]
        };
      case DELETE_RECURRING_INCOME:
        return {
          ...state,
          recurringIncome: state.recurringIncome.filter(income => income.id !== action.payload)
        };
      default:
        return state;
    }
  }