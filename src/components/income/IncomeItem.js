import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteIncome, deleteRecurringIncome } from '../../actions/incomeActions';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './IncomeItem.css';

const IncomeItem = ({ income, onDelete }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm(t('messages.deleteConfirm'))) {
      if (income.recurring) {
        dispatch(deleteRecurringIncome(income.id));
      } else {
        dispatch(deleteIncome(income.id));
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
    <div className="transaction-item income">
      <div className="transaction-info">
        <h4>{income.description}</h4>
        <p>{moment(income.date).format('DD/MM/YYYY')} • {t(`categories.${income.category}`)}</p>
        {income.recurring && <span className="recurring-badge">{t('common.recurring')}</span>}
      </div>
      <div className="transaction-amount income">
        {formatCurrency(income.amount)}
      </div>
      <div className="transaction-actions">
        <button onClick={handleDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default IncomeItem;