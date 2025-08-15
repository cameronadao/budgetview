import React from 'react';
import { Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';
import IncomeExpense from '../components/IncomeExpense';
import TransactionList from '../components/TransactionList';
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <StatsCards />
              </motion.div>
            </Grid>
            
            {/* Balance and Income/Expense */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Balance />
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <IncomeExpense />
              </motion.div>
            </Grid>
            
            {/* Charts */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ExpenseChart />
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <BudgetOverview />
              </motion.div>
            </Grid>
            
            {/* Recent Transactions */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <RecentTransactions />
              </motion.div>
            </Grid>
            
            {/* Add Transaction Form */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <AddTransaction />
              </motion.div>
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