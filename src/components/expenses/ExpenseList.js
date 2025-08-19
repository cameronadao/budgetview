import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Modal from '../common/Modal';
import AddExpenseForm from './AddExpenseForm';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
  const { t } = useTranslation();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const { expenses, recurringExpenses } = useSelector(state => state.expenses);
  
  // Get current month and year
  const now = moment();
  const currentMonth = now.month();
  const currentYear = now.year();
  
  // Filter expenses for current month
  const currentMonthExpenses = expenses.filter(exp => {
    const expDate = moment(exp.date);
    return expDate.month() === currentMonth && expDate.year() === currentYear;
  });
  
  // Filter recurring expenses for current month
  const currentMonthRecurringExpenses = recurringExpenses.filter(exp => {
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
  });

  return (
    <div className="expense-list">
      <div className="page-header">
        <h1 className="page-title">{t('expenses.title')}</h1>
        <button className="btn btn-danger" onClick={() => setShowAddExpense(true)}>
          {t('expenses.addExpense')}
        </button>
      </div>
      
      <div className="expense-summary">
        <div className="summary-card">
          <h3>{t('expenses.oneTimeExpenses')}</h3>
          <div className="amount expenses">
            {currentMonthExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2)} €
          </div>
        </div>
        
        <div className="summary-card">
          <h3>{t('expenses.recurringExpenses')}</h3>
          <div className="amount expenses">
            {currentMonthRecurringExpenses.reduce((sum, exp) => {
              let multiplier = 1;
              if (exp.frequency === 'weekly') {
                multiplier = 4; // Approximate weeks in a month
              }
              return sum + parseFloat(exp.amount) * multiplier;
            }, 0).toFixed(2)} €
          </div>
        </div>
      </div>
      
      <div className="expense-sections">
        <div className="expense-section">
          <h2>{t('expenses.oneTimeExpenses')}</h2>
          {currentMonthExpenses.length > 0 ? (
            <ul className="transaction-list">
              {currentMonthExpenses.map(expense => (
                <ExpenseItem key={expense.id} expense={expense} />
              ))}
            </ul>
          ) : (
            <p className="text-center">{t('common.noData')}</p>
          )}
        </div>
        
        <div className="expense-section">
          <h2>{t('expenses.recurringExpenses')}</h2>
          {currentMonthRecurringExpenses.length > 0 ? (
            <ul className="transaction-list">
              {currentMonthRecurringExpenses.map(expense => (
                <ExpenseItem key={expense.id} expense={expense} />
              ))}
            </ul>
          ) : (
            <p className="text-center">{t('common.noData')}</p>
          )}
        </div>
      </div>

      {showAddExpense && (
        <Modal onClose={() => setShowAddExpense(false)}>
          <AddExpenseForm onClose={() => setShowAddExpense(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ExpenseList;