import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import BalanceOverview from './BalanceOverview';
import FinancialSummary from './FinancialSummary';
import Chart from '../common/Chart';

const Dashboard = () => {
  const { t } = useTranslation();
  const { expenses, recurringExpenses } = useSelector(state => state.expenses);
  const { income, recurringIncome } = useSelector(state => state.income);
  
  const [currentBalance, setCurrentBalance] = useState(0);
  const [projectedBalance, setProjectedBalance] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Calculate current balance and projected balance
  useEffect(() => {
    // Get current month and year
    const now = moment();
    const currentMonth = now.month();
    const currentYear = now.year();
    
    // Calculate total income for current month
    const totalIncome = income
      .filter(inc => {
        const incDate = moment(inc.date);
        return incDate.month() === currentMonth && incDate.year() === currentYear;
      })
      .reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
    
    // Calculate total expenses for current month
    const totalExpenses = expenses
      .filter(exp => {
        const expDate = moment(exp.date);
        return expDate.month() === currentMonth && expDate.year() === currentYear;
      })
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
    // Calculate recurring income for current month
    const totalRecurringIncome = recurringIncome
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
    
    // Calculate recurring expenses for current month
    const totalRecurringExpenses = recurringExpenses
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
    
    // Calculate totals
    const totalMonthlyIncome = totalIncome + totalRecurringIncome;
    const totalMonthlyExpenses = totalExpenses + totalRecurringExpenses;
    
    // Set states
    setMonthlyIncome(totalMonthlyIncome);
    setMonthlyExpenses(totalMonthlyExpenses);
    setCurrentBalance(totalMonthlyIncome - totalMonthlyExpenses);
    
    // Calculate projected balance for end of month
    const daysLeftInMonth = now.endOf('month').diff(now, 'days');
    const dailyAverageExpense = totalMonthlyExpenses / now.date();
    const projectedAdditionalExpenses = dailyAverageExpense * daysLeftInMonth;
    
    setProjectedBalance(totalMonthlyIncome - (totalMonthlyExpenses + projectedAdditionalExpenses));
    
    // Prepare chart data
    const categories = [...new Set([
      ...expenses.map(exp => exp.category),
      ...recurringExpenses.map(exp => exp.category)
    ])];
    
    const expenseData = categories.map(category => {
      const categoryExpenses = expenses
        .filter(exp => exp.category === category)
        .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      
      const categoryRecurringExpenses = recurringExpenses
        .filter(exp => exp.category === category)
        .reduce((sum, exp) => {
          let multiplier = 1;
          if (exp.frequency === 'weekly') {
            multiplier = 4;
          }
          return sum + parseFloat(exp.amount) * multiplier;
        }, 0);
      
      return {
        name: t(`categories.${category}`),
        value: categoryExpenses + categoryRecurringExpenses
      };
    });
    
    setChartData(expenseData);
  }, [expenses, recurringExpenses, income, recurringIncome, t]);

  return (
    <div className="dashboard">
      <h1 className="page-title">{t('dashboard.title')}</h1>
      
      <BalanceOverview 
        currentBalance={currentBalance}
        projectedBalance={projectedBalance}
        monthlyIncome={monthlyIncome}
        monthlyExpenses={monthlyExpenses}
      />
      
      <div className="dashboard-charts">
        <div className="row">
          <div className="col-md-6">
            <Chart 
              type="pie" 
              data={chartData} 
              title={t('charts.expensesByCategory')} 
            />
          </div>
          <div className="col-md-6">
            <FinancialSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;