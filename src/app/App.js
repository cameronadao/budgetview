import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, useTheme } from '../hooks/useTheme'; // Correction ici
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import Layout from '../components/Layout';
import DashboardView from '../views/DashboardView'; // Correction du chemin
import BalanceView from '../views/BalanceView'; // Correction du chemin
import IncomeView from '../views/IncomeView'; // Correction du chemin
import ExpenseView from '../views/ExpenseView'; // Correction du chemin
import StatsView from '../views/StatsView'; // Correction du chemin
import SettingsView from '../views/SettingsView'; // Correction du chemin
import AddTransactionView from '../views/AddTransactionView'; // Correction du chemin

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