import React, { useState } from 'react';
import { 
  DateCalendar, 
  PickersDay, 
  DayCalendarSkeleton,
  LocalizationProvider 
} from '@mui/x-date-pickers'; // Suppression de l'import Calendar
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { Badge, Box, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { format, isSameDay, isSameMonth, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';

const ServerDay = (props) => {
  const { day, selectedDay, outsideCurrentMonth, transactions, ...other } = props;
  
  const dayTransactions = transactions.filter(transaction => 
    isSameDay(new Date(transaction.date), day)
  );
  
  const totalAmount = dayTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  
  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={dayTransactions.length > 0 ? dayTransactions.length : undefined}
      color={totalAmount > 500 ? 'error' : totalAmount > 200 ? 'warning' : 'success'}
    >
      <PickersDay 
        {...other} 
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        selected={isSameDay(day, selectedDay)}
      />
    </Badge>
  );
};

const BudgetCalendar = () => { // Renommé de Calendar à BudgetCalendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const transactions = useSelector((state) => state.transactions.transactions);
  const recurringTransactions = useSelector((state) => state.recurringTransactions.recurringTransactions);
  
  // Générer les transactions récurrentes pour le mois en cours
  const generateRecurringTransactions = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const generatedTransactions = [];
    
    recurringTransactions.forEach(recurring => {
      let date = new Date(recurring.startDate);
      
      while (date <= monthEnd) {
        if (date >= monthStart) {
          generatedTransactions.push({
            id: `${recurring.id}-${format(date, 'yyyy-MM-dd')}`,
            text: recurring.text,
            amount: recurring.amount,
            category: recurring.category,
            date: date.toISOString(),
            isRecurring: true,
          });
        }
        
        // Avancer la date selon la périodicité
        switch (recurring.frequency) {
          case 'daily':
            date.setDate(date.getDate() + 1);
            break;
          case 'weekly':
            date.setDate(date.getDate() + 7);
            break;
          case 'monthly':
            date.setMonth(date.getMonth() + 1);
            break;
          case 'yearly':
            date.setFullYear(date.getFullYear() + 1);
            break;
          default:
            break;
        }
      }
    });
    
    return generatedTransactions;
  };
  
  const allTransactions = [
    ...transactions,
    ...generateRecurringTransactions()
  ];
  
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };
  
  const selectedDayTransactions = allTransactions.filter(transaction => 
    isSameDay(new Date(transaction.date), selectedDate)
  );
  
  return (
    <Box sx={{ width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {format(currentMonth, 'MMMM yyyy', { locale: fr })}
            </Typography>
            <Box>
              <button onClick={() => handleMonthChange(subMonths(currentMonth, 1))}>
                Précédent
              </button>
              <button onClick={() => handleMonthChange(addMonths(currentMonth, 1))}>
                Suivant
              </button>
            </Box>
          </Box>
          
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            onMonthChange={handleMonthChange}
            slots={{
              day: (dayProps) => (
                <ServerDay 
                  {...dayProps} 
                  transactions={allTransactions}
                  selectedDay={selectedDate}
                />
              )
            }}
            sx={{ maxWidth: '100%' }}
          />
          
          {selectedDayTransactions.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Transactions du {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
              </Typography>
              {selectedDayTransactions.map((transaction) => (
                <Box 
                  key={transaction.id} 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    p: 1, 
                    borderBottom: '1px solid #eee' 
                  }}
                >
                  <Box>
                    <Typography variant="body1">{transaction.text}</Typography>
                    {transaction.isRecurring && (
                      <Typography variant="caption" color="text.secondary">
                        (Récurrente)
                      </Typography>
                    )}
                  </Box>
                  <Typography 
                    variant="body1" 
                    color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                  >
                    {transaction.amount < 0 ? '-' : '+'}
                    {Math.abs(transaction.amount).toFixed(2)}€
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </LocalizationProvider>
    </Box>
  );
};

export default BudgetCalendar; // Exporter avec le nouveau nom