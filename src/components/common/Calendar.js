import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import ExpenseItem from '../expenses/ExpenseItem';
import IncomeItem from '../income/IncomeItem';
import Modal from './Modal';
import AddExpenseForm from '../expenses/AddExpenseForm';
import AddIncomeForm from '../income/AddIncomeForm';
import { deleteExpense, deleteRecurringExpense } from '../../actions/expensesActions';
import { deleteIncome, deleteRecurringIncome } from '../../actions/incomeActions';
import PageSpacer from './PageSpacer'; // Importer le PageSpacer


const FinancialCalendar = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { expenses, recurringExpenses } = useSelector(state => state.expenses);
  const { income, recurringIncome } = useSelector(state => state.income);
  
  const [date, setDate] = useState(new Date());
  const [selectedDateTransactions, setSelectedDateTransactions] = useState([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);

  // Get transactions for selected date
  useEffect(() => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    
    // Get one-time transactions for selected date
    const dayExpenses = expenses.filter(exp => exp.date === formattedDate);
    const dayIncome = income.filter(inc => inc.date === formattedDate);
    
    // Get recurring transactions that occur on selected date
    const dayRecurringExpenses = recurringExpenses.filter(exp => {
      const startDate = moment(exp.startDate);
      const endDate = exp.endDate ? moment(exp.endDate) : moment().add(10, 'years');
      
      if (startDate.isAfter(date) || endDate.isBefore(date)) {
        return false;
      }
      
      // Check if expense occurs on this date based on frequency
      if (exp.frequency === 'weekly') {
        return startDate.day() === moment(date).day();
      } else if (exp.frequency === 'monthly') {
        return startDate.date() === moment(date).date();
      } else if (exp.frequency === 'yearly') {
        return startDate.date() === moment(date).date() && startDate.month() === moment(date).month();
      }
      
      return false;
    });
    
    const dayRecurringIncome = recurringIncome.filter(inc => {
      const startDate = moment(inc.startDate);
      const endDate = inc.endDate ? moment(inc.endDate) : moment().add(10, 'years');
      
      if (startDate.isAfter(date) || endDate.isBefore(date)) {
        return false;
      }
      
      // Check if income occurs on this date based on frequency
      if (inc.frequency === 'weekly') {
        return startDate.day() === moment(date).day();
      } else if (inc.frequency === 'monthly') {
        return startDate.date() === moment(date).date();
      } else if (inc.frequency === 'yearly') {
        return startDate.date() === moment(date).date() && startDate.month() === moment(date).month();
      }
      
      return false;
    });
    
    // Combine all transactions
    const allTransactions = [
      ...dayIncome.map(inc => ({ ...inc, type: 'income' })),
      ...dayExpenses.map(exp => ({ ...exp, type: 'expense' })),
      ...dayRecurringIncome.map(inc => ({ ...inc, type: 'income', recurring: true })),
      ...dayRecurringExpenses.map(exp => ({ ...exp, type: 'expense', recurring: true }))
    ];
    
    setSelectedDateTransactions(allTransactions);
  }, [date, expenses, income, recurringExpenses, recurringIncome]);

  // Function to check if a date has transactions
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      
      // Check if there are any transactions on this date
      const dayExpenses = expenses.filter(exp => exp.date === formattedDate);
      const dayIncome = income.filter(inc => inc.date === formattedDate);
      
      if (dayExpenses.length > 0 || dayIncome.length > 0) {
        return <div className="dot-indicator"></div>;
      }
    }
    return null;
  };

  // Handle date click
  const handleDateClick = (value) => {
    setDate(value);
    setShowTransactionsModal(true);
  };

  // Handle add transaction
  const handleAddTransaction = (type) => {
    setTransactionType(type);
    setShowAddTransaction(true);
  };

  // Handle delete expense
  const handleDeleteExpense = (id, isRecurring) => {
    if (isRecurring) {
      dispatch(deleteRecurringExpense(id));
    } else {
      dispatch(deleteExpense(id));
    }
  };

  // Handle delete income
  const handleDeleteIncome = (id, isRecurring) => {
    if (isRecurring) {
      dispatch(deleteRecurringIncome(id));
    } else {
      dispatch(deleteIncome(id));
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

  // Format date based on current language
  const formatDate = (date) => {
    const locale = i18n.language === 'fr' ? 'fr' : 'en';
    return moment(date).locale(locale).format('dddd, D MMMM YYYY');
  };

  // Calculate daily balance
  const dailyBalance = selectedDateTransactions.reduce((sum, transaction) => {
    return transaction.type === 'income' 
      ? sum + parseFloat(transaction.amount) 
      : sum - parseFloat(transaction.amount);
  }, 0);

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1 className="page-title">{t('calendar.title')}</h1>
        <div className="calendar-actions">
          <button 
            className="btn btn-success" 
            onClick={() => handleAddTransaction('income')}
          >
            {t('income.addIncome')}
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => handleAddTransaction('expense')}
          >
            {t('expenses.addExpense')}
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={handleDateClick}
          tileContent={tileContent}
          locale={t('common.locale')}
        />
      </div>

      <div className="daily-summary">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {formatDate(date)}
            </h2>
            <span className={`amount ${dailyBalance >= 0 ? 'income' : 'expenses'}`}>
              {formatCurrency(dailyBalance)}
            </span>
          </div>
          <div className="card-body">
            {selectedDateTransactions.length > 0 ? (
              <ul className="transaction-list">
                {selectedDateTransactions.map(transaction => (
                  transaction.type === 'income' ? (
                    <IncomeItem 
                      key={`${transaction.id}-${transaction.recurring ? 'recurring' : 'onetime'}`} 
                      income={transaction} 
                      onDelete={() => handleDeleteIncome(transaction.id, transaction.recurring)} 
                    />
                  ) : (
                    <ExpenseItem 
                      key={`${transaction.id}-${transaction.recurring ? 'recurring' : 'onetime'}`} 
                      expense={transaction} 
                      onDelete={() => handleDeleteExpense(transaction.id, transaction.recurring)} 
                    />
                  )
                ))}
              </ul>
            ) : (
              <p className="text-center">{t('common.noTransactions')}</p>
            )}
          </div>
        </div>
      </div>

      {showTransactionsModal && (
        <Modal onClose={() => setShowTransactionsModal(false)}>
          <div className="date-transactions">
            <div className="modal-header">
              <h2>{formatDate(date)}</h2>
              <div className="modal-actions">
                <button 
                  className="btn btn-success btn-sm" 
                  onClick={() => handleAddTransaction('income')}
                >
                  {t('income.addIncome')}
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => handleAddTransaction('expense')}
                >
                  {t('expenses.addExpense')}
                </button>
              </div>
            </div>
            
            <div className="modal-body">
              {selectedDateTransactions.length > 0 ? (
                <ul className="transaction-list">
                  {selectedDateTransactions.map(transaction => (
                    transaction.type === 'income' ? (
                      <IncomeItem 
                        key={`${transaction.id}-${transaction.recurring ? 'recurring' : 'onetime'}`} 
                        income={transaction} 
                        onDelete={() => handleDeleteIncome(transaction.id, transaction.recurring)} 
                      />
                    ) : (
                      <ExpenseItem 
                        key={`${transaction.id}-${transaction.recurring ? 'recurring' : 'onetime'}`} 
                        expense={transaction} 
                        onDelete={() => handleDeleteExpense(transaction.id, transaction.recurring)} 
                      />
                    )
                  ))}
                </ul>
              ) : (
                <p className="text-center">{t('common.noTransactions')}</p>
              )}
            </div>
            
            <div className="modal-footer">
              <div className="daily-total">
                <span>{t('common.total')}:</span>
                <span className={`amount ${dailyBalance >= 0 ? 'income' : 'expenses'}`}>
                  {formatCurrency(dailyBalance)}
                </span>
              </div>
              <button 
                className="btn btn-outline" 
                onClick={() => setShowTransactionsModal(false)}
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showAddTransaction && transactionType === 'expense' && (
        <Modal onClose={() => setShowAddTransaction(false)}>
          <AddExpenseForm 
            onClose={() => setShowAddTransaction(false)} 
            prefillDate={moment(date).format('YYYY-MM-DD')}
          />
        </Modal>
      )}

      {showAddTransaction && transactionType === 'income' && (
        <Modal onClose={() => setShowAddTransaction(false)}>
          <AddIncomeForm 
            onClose={() => setShowAddTransaction(false)} 
            prefillDate={moment(date).format('YYYY-MM-DD')}
          />
        </Modal>
      )}
      <PageSpacer /> {/* Ajouter le PageSpacer à la fin */}
      </div>
  );
};

export default FinancialCalendar;