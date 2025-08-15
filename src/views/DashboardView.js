import React from 'react';
import { Container, Grid } from '@mui/material';
import StatsCards from '../components/StatsCards';
import Balance from '../components/Balance';
import IncomeExpense from '../components/IncomeExpense';
import ExpenseChart from '../components/ExpenseChart';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import AddTransaction from '../components/AddTransaction';

const DashboardView = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={{ xs: 2, sm: 3 }}>
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
  );
};

export default DashboardView;