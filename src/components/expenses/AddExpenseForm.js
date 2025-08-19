import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, addRecurringExpense } from '../../actions/expensesActions';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import './AddExpenseForm.css';

const AddExpenseForm = ({ onClose, prefillDate }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // Form state
  const [formData, setFormData] = useState({
    id: uuidv4(),
    amount: '',
    description: '',
    date: prefillDate || moment().format('YYYY-MM-DD'),
    category: 'food',
    paymentMethod: 'creditCard',
    recurring: false,
    frequency: 'monthly',
    startDate: prefillDate || moment().format('YYYY-MM-DD'),
    endDate: ''
  });
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.amount || !formData.description) {
      alert(t('messages.requiredField'));
      return;
    }
    
    // Add expense
    if (formData.recurring) {
      dispatch(addRecurringExpense(formData));
    } else {
      dispatch(addExpense(formData));
    }
    
    // Close form
    onClose();
  };
  
  return (
    <div className="add-expense-form">
      <div className="modal-header">
        <h2>{t('expenses.addExpense')}</h2>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">{t('expenses.amount')}</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">{t('expenses.description')}</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">{t('expenses.date')}</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">{t('expenses.category')}</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="food">{t('categories.food')}</option>
            <option value="transport">{t('categories.transport')}</option>
            <option value="housing">{t('categories.housing')}</option>
            <option value="utilities">{t('categories.utilities')}</option>
            <option value="entertainment">{t('categories.entertainment')}</option>
            <option value="health">{t('categories.health')}</option>
            <option value="education">{t('categories.education')}</option>
            <option value="shopping">{t('categories.shopping')}</option>
            <option value="subscriptions">{t('categories.subscriptions')}</option>
            <option value="travel">{t('categories.travel')}</option>
            <option value="insurance">{t('categories.insurance')}</option>
            <option value="taxes">{t('categories.taxes')}</option>
            <option value="other">{t('categories.other')}</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="paymentMethod">{t('expenses.paymentMethod')}</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="form-control"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="cash">{t('paymentMethods.cash')}</option>
            <option value="creditCard">{t('paymentMethods.creditCard')}</option>
            <option value="debitCard">{t('paymentMethods.debitCard')}</option>
            <option value="bankTransfer">{t('paymentMethods.bankTransfer')}</option>
            <option value="check">{t('paymentMethods.check')}</option>
            <option value="other">{t('paymentMethods.other')}</option>
          </select>
        </div>
        
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="recurring"
            name="recurring"
            checked={formData.recurring}
            onChange={handleChange}
          />
          <label htmlFor="recurring">{t('expenses.recurring')}</label>
        </div>
        
        {formData.recurring && (
          <>
            <div className="form-group">
              <label htmlFor="frequency">{t('expenses.frequency')}</label>
              <select
                id="frequency"
                name="frequency"
                className="form-control"
                value={formData.frequency}
                onChange={handleChange}
              >
                <option value="weekly">{t('expenses.weekly')}</option>
                <option value="monthly">{t('expenses.monthly')}</option>
                <option value="yearly">{t('expenses.yearly')}</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="startDate">{t('expenses.startDate')}</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="form-control"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">{t('expenses.endDate')}</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="form-control"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        
        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button type="submit" className="btn btn-danger">
            {t('common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;