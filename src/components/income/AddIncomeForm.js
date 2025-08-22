import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIncome, addRecurringIncome } from '../../actions/incomeActions';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import './AddIncomeForm.css';
import ModalFooter from '../common/ModalFooter';

const AddIncomeForm = ({ onClose, prefillDate }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // Form state
  const [formData, setFormData] = useState({
    id: uuidv4(),
    amount: '',
    description: '',
    date: prefillDate || moment().format('YYYY-MM-DD'),
    category: 'salary',
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
    
    // Add income
    if (formData.recurring) {
      dispatch(addRecurringIncome(formData));
    } else {
      dispatch(addIncome(formData));
    }
    
    // Close form
    onClose();
  };
  
  return (
    <div className="add-income-form">
      <div className="modal-header">
        <h2>{t('income.addIncome')}</h2>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="amount">{t('income.amount')}</label>
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
            <label htmlFor="description">{t('income.description')}</label>
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
            <label htmlFor="date">{t('income.date')}</label>
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
            <label htmlFor="category">{t('income.category')}</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="salary">{t('categories.salary')}</option>
              <option value="freelance">{t('categories.freelance')}</option>
              <option value="investment">{t('categories.investment')}</option>
              <option value="gift">{t('categories.gift')}</option>
              <option value="other">{t('categories.other')}</option>
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
            <label htmlFor="recurring">{t('income.recurring')}</label>
          </div>
          
          {formData.recurring && (
            <>
              <div className="form-group">
                <label htmlFor="frequency">{t('income.frequency')}</label>
                <select
                  id="frequency"
                  name="frequency"
                  className="form-control"
                  value={formData.frequency}
                  onChange={handleChange}
                >
                  <option value="weekly">{t('income.weekly')}</option>
                  <option value="monthly">{t('income.monthly')}</option>
                  <option value="yearly">{t('income.yearly')}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="startDate">{t('income.startDate')}</label>
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
                <label htmlFor="endDate">{t('income.endDate')}</label>
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
        </div>
        
        <ModalFooter>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button type="submit" className="btn btn-success">
            {t('common.save')}
          </button>
        </ModalFooter>
      </form>
    </div>
  );
};

export default AddIncomeForm;