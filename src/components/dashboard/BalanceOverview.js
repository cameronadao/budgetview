import React from 'react';
import { useTranslation } from 'react-i18next';

const BalanceOverview = ({ currentBalance, projectedBalance, monthlyIncome, monthlyExpenses }) => {
  const { t } = useTranslation();
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <div className="balance-overview">
      <div className="balance-card income">
        <h3>{t('dashboard.currentBalance')}</h3>
        <div className="amount income">{formatCurrency(currentBalance)}</div>
      </div>
      
      <div className="balance-card projected">
        <h3>{t('dashboard.projectedBalance')}</h3>
        <div className="amount projected">{formatCurrency(projectedBalance)}</div>
      </div>
      
      <div className="balance-card income">
        <h3>{t('dashboard.income')}</h3>
        <div className="amount income">{formatCurrency(monthlyIncome)}</div>
      </div>
      
      <div className="balance-card expenses">
        <h3>{t('dashboard.expenses')}</h3>
        <div className="amount expenses">{formatCurrency(monthlyExpenses)}</div>
      </div>
    </div>
  );
};

export default BalanceOverview;