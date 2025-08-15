import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BudgetCalendar from '../components/Calendar'; // Importer avec le nouveau nom
import RecurringTransactionsManager from '../components/RecurringTransactionsManager';

const CalendarView = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Calendrier des Dépenses
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <BudgetCalendar /> {/* Utiliser le nouveau nom */}
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <RecurringTransactionsManager />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CalendarView;