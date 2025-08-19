import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const FinancialSummary = () => {
  const { t } = useTranslation();
  const { expenses, recurringExpenses } = useSelector(state => state.expenses);
  const { income, recurringIncome } = useSelector(state => state.income);
  
  // Get current month and year
  const now = moment();
  const currentMonth = now.month();
  const currentYear = now.year();
  
  // Calculate monthly income
  const monthlyIncome = income
    .filter(inc => {
      const incDate = moment(inc.date);
      return incDate.month() === currentMonth && incDate.year() === currentYear;
    })
    .reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
    
  // Calculate monthly expenses
  const monthlyExpenses = expenses
    .filter(exp => {
      const expDate = moment(exp.date);
      return expDate.month() === currentMonth && expDate.year() === currentYear;
    })
    .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
  // Calculate net cash flow
  const netCashFlow = monthlyIncome - monthlyExpenses;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <div className="financial-summary">
      <div className="summary-card">
        <h3>{t('dashboard.netCashFlow')}</h3>
        <div className={`amount ${netCashFlow >= 0 ? 'income' : 'expenses'}`}>
          {formatCurrency(netCashFlow)}
        </div>
      </div>
      
      <div className="chart-container">
        <h3>{t('charts.incomeVsExpenses')}</h3>
        <div className="chart-placeholder">
          <p>{t('charts.chartPlaceholder')}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;