import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense, deleteRecurringExpense } from '../../actions/expensesActions';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './ExpenseItem.css';

const ExpenseItem = ({ expense, onDelete }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm(t('messages.deleteConfirm'))) {
      if (expense.recurring) {
        dispatch(deleteRecurringExpense(expense.id));
      } else {
        dispatch(deleteExpense(expense.id));
      }
      if (onDelete) onDelete();
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <div className="transaction-item expense">
      <div className="transaction-info">
        <h4>{expense.description}</h4>
        <p>{moment(expense.date).format('DD/MM/YYYY')} • {t(`categories.${expense.category}`)}</p>
        {expense.recurring && <span className="recurring-badge">{t('common.recurring')}</span>}
      </div>
      <div className="transaction-amount expenses">
        {formatCurrency(expense.amount)}
      </div>
      <div className="transaction-actions">
        <button onClick={handleDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;