import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Balance from '../components/Balance';
import IncomeExpense from '../components/IncomeExpense';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';
import ExpenseChart from '../components/ExpenseChart';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import GlobalStyles from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/theme';

function AppContent() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <div className="container">
        <header>
          <h1>BudgetView</h1>
          <ThemeToggle />
        </header>
        <Balance />
        <IncomeExpense />
        <ExpenseChart />
        <TransactionList />
        <AddTransaction />
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;