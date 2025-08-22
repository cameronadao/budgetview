import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Modal from '../common/Modal';
import AddIncomeForm from './AddIncomeForm';
import IncomeItem from './IncomeItem';
import PageSpacer from '../common/PageSpacer'; // Importer le PageSpacer

const IncomeList = () => {
  const { t } = useTranslation();
  const [showAddIncome, setShowAddIncome] = useState(false);
  const { income, recurringIncome } = useSelector(state => state.income);
  
  // Get current month and year
  const now = moment();
  const currentMonth = now.month();
  const currentYear = now.year();
  
  // Filter income for current month
  const currentMonthIncome = income.filter(inc => {
    const incDate = moment(inc.date);
    return incDate.month() === currentMonth && incDate.year() === currentYear;
  });
  
  // Filter recurring income for current month
  const currentMonthRecurringIncome = recurringIncome.filter(inc => {
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
  });

  return (
    <div className="income-list">
      <div className="page-header">
        <h1 className="page-title">{t('income.title')}</h1>
        <button className="btn btn-success" onClick={() => setShowAddIncome(true)}>
          {t('income.addIncome')}
        </button>
      </div>
      
      <div className="income-summary">
        <div className="summary-card">
          <h3>{t('income.oneTimeIncome')}</h3>
          <div className="amount income">
            {currentMonthIncome.reduce((sum, inc) => sum + parseFloat(inc.amount), 0).toFixed(2)} €
          </div>
        </div>
        
        <div className="summary-card">
          <h3>{t('income.recurringIncome')}</h3>
          <div className="amount income">
            {currentMonthRecurringIncome.reduce((sum, inc) => {
              let multiplier = 1;
              if (inc.frequency === 'weekly') {
                multiplier = 4; // Approximate weeks in a month
              }
              return sum + parseFloat(inc.amount) * multiplier;
            }, 0).toFixed(2)} €
          </div>
        </div>
      </div>
      
      <div className="income-sections">
        <div className="income-section">
          <h2>{t('income.oneTimeIncome')}</h2>
          {currentMonthIncome.length > 0 ? (
            <ul className="transaction-list">
              {currentMonthIncome.map(inc => (
                <IncomeItem key={inc.id} income={inc} />
              ))}
            </ul>
          ) : (
            <p className="text-center">{t('common.noData')}</p>
          )}
        </div>
        
        <div className="income-section">
          <h2>{t('income.recurringIncome')}</h2>
          {currentMonthRecurringIncome.length > 0 ? (
            <ul className="transaction-list">
              {currentMonthRecurringIncome.map(inc => (
                <IncomeItem key={inc.id} income={inc} />
              ))}
            </ul>
          ) : (
            <p className="text-center">{t('common.noData')}</p>
          )}
        </div>
      </div>

      {showAddIncome && (
        <Modal onClose={() => setShowAddIncome(false)}>
          <AddIncomeForm onClose={() => setShowAddIncome(false)} />
        </Modal>
      )}
      <PageSpacer /> {/* Ajouter le PageSpacer à la fin */}

    </div>
  );
};

export default IncomeList;