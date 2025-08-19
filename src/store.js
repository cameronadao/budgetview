import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from './reducers/expensesReducer';
import incomeReducer from './reducers/incomeReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
  expenses: expensesReducer,
  income: incomeReducer,
  settings: settingsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;