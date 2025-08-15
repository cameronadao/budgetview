import React from 'react';
import { Container, Grid } from '@mui/material';
import Balance from '../components/Balance';
import IncomeExpense from '../components/IncomeExpense';
import AddTransaction from '../components/AddTransaction';
import ExpenseChart from '../components/ExpenseChart';
import StatsCards from '../components/StatsCards';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import Layout from '../components/Layout';
import { useTheme } from '../hooks/useTheme';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';

function AppContent() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Layout>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid item xs={12}>
              <StatsCards />
            </Grid>
            
            {/* Balance and Income/Expense */}
            <Grid item xs={12} md={4}>
              <Balance />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <IncomeExpense />
            </Grid>
            
            {/* Charts */}
            <Grid item xs={12} md={8}>
              <ExpenseChart />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <BudgetOverview />
            </Grid>
            
            {/* Recent Transactions */}
            <Grid item xs={12} md={8}>
              <RecentTransactions />
            </Grid>
            
            {/* Add Transaction Form */}
            <Grid item xs={12} md={4}>
              <AddTransaction />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </StyledThemeProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;