import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getExpenses, getRecurringExpenses } from './actions/expensesActions';
import { getIncome, getRecurringIncome } from './actions/incomeActions';
import './i18n';
import './App.css';

// Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';
import Dashboard from './components/dashboard/Dashboard';
import IncomeList from './components/income/IncomeList';
import ExpenseList from './components/expenses/ExpenseList';
import Calendar from './components/common/Calendar';
import Settings from './components/settings/Settings';

function App() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(state => state.settings);

  // Load data from localStorage on app start
  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getRecurringExpenses());
    dispatch(getIncome());
    dispatch(getRecurringIncome());
    
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [dispatch, darkMode]);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Header />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/income" element={<IncomeList />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;