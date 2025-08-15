import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useTheme } from '../hooks/useTheme'; // Suppression de ThemeProvider
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import Layout from '../components/Layout';
import DashboardView from '../views/DashboardView';
import BalanceView from '../views/BalanceView';
import IncomeView from '../views/IncomeView';
import ExpenseView from '../views/ExpenseView';
import StatsView from '../views/StatsView';
import SettingsView from '../views/SettingsView';
import AddTransactionView from '../views/AddTransactionView';

function AppContent() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/balance" element={<BalanceView />} />
          <Route path="/income" element={<IncomeView />} />
          <Route path="/expense" element={<ExpenseView />} />
          <Route path="/stats" element={<StatsView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/add-transaction" element={<AddTransactionView />} />
        </Routes>
      </Layout>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;