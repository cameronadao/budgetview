import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Chart from '../common/Chart';

const FinancialSummary = () => {
  const { t } = useTranslation();
  const { expenses, recurringExpenses } = useSelector(state => state.expenses);
  const { income, recurringIncome } = useSelector(state => state.income);
  
  // Get current month and year
  const now = moment();
  const currentMonth = now.month();
  const currentYear = now.year();
  
  // Calculate monthly income (one-time + recurring)
  const monthlyIncome = income
    .filter(inc => {
      const incDate = moment(inc.date);
      return incDate.month() === currentMonth && incDate.year() === currentYear;
    })
    .reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
    
  // Calculate recurring income for current month
  const monthlyRecurringIncome = recurringIncome
    .filter(inc => {
      const startDate = moment(inc.startDate);
      const endDate = inc.endDate ? moment(inc.endDate) : moment().add(10, 'years');
      
      if (startDate.isAfter(now) || endDate.isBefore(now)) {
        return false;
      }
      
      // Check if income should occur this month based on frequency
      if (inc.frequency === 'monthly') {
        return true;
      } else if (inc.frequency === 'weekly') {
        // For weekly, check if there's at least one occurrence this month
        const weeksInMonth = now.daysInMonth() / 7;
        return weeksInMonth >= 1;
      } else if (inc.frequency === 'yearly') {
        return startDate.month() === currentMonth;
      }
      
      return false;
    })
    .reduce((sum, inc) => {
      let multiplier = 1;
      if (inc.frequency === 'weekly') {
        multiplier = 4; // Approximate weeks in a month
      }
      return sum + parseFloat(inc.amount) * multiplier;
    }, 0);
    
  // Calculate monthly expenses (one-time + recurring)
  const monthlyExpenses = expenses
    .filter(exp => {
      const expDate = moment(exp.date);
      return expDate.month() === currentMonth && expDate.year() === currentYear;
    })
    .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
  // Calculate recurring expenses for current month
  const monthlyRecurringExpenses = recurringExpenses
    .filter(exp => {
      const startDate = moment(exp.startDate);
      const endDate = exp.endDate ? moment(exp.endDate) : moment().add(10, 'years');
      
      if (startDate.isAfter(now) || endDate.isBefore(now)) {
        return false;
      }
      
      // Check if expense should occur this month based on frequency
      if (exp.frequency === 'monthly') {
        return true;
      } else if (exp.frequency === 'weekly') {
        // For weekly, check if there's at least one occurrence this month
        const weeksInMonth = now.daysInMonth() / 7;
        return weeksInMonth >= 1;
      } else if (exp.frequency === 'yearly') {
        return startDate.month() === currentMonth;
      }
      
      return false;
    })
    .reduce((sum, exp) => {
      let multiplier = 1;
      if (exp.frequency === 'weekly') {
        multiplier = 4; // Approximate weeks in a month
      }
      return sum + parseFloat(exp.amount) * multiplier;
    }, 0);
    
  // Calculate total income and expenses
  const totalIncome = monthlyIncome + monthlyRecurringIncome;
  const totalExpenses = monthlyExpenses + monthlyRecurringExpenses;
  
  // Calculate net cash flow
  const netCashFlow = totalIncome - totalExpenses;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Prepare data for income vs expenses chart
  const chartData = [
    { name: t('dashboard.income'), value: totalIncome },
    { name: t('dashboard.expenses'), value: totalExpenses }
  ];
  
  return (
    <div className="financial-summary">
      <div className="summary-card">
        <h3>{t('dashboard.netCashFlow')}</h3>
        <div className={`amount ${netCashFlow >= 0 ? 'income' : 'expenses'}`}>
          {formatCurrency(netCashFlow)}
        </div>
      </div>
      
      <div className="chart-container">
        <Chart 
          type="bar" 
          data={chartData} 
          title={t('charts.incomeVsExpenses')} 
        />
      </div>
    </div>
  );
};

export default FinancialSummary;