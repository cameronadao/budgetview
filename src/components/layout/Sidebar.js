import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>{t('app.slogan')}</h2>
      </div>
      
      <ul className="nav-menu">
        <li>
          <NavLink exact to="/" activeClassName="active">
            <i className="fas fa-tachometer-alt"></i>
            <span>{t('dashboard.title')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/income" activeClassName="active">
            <i className="fas fa-money-bill-wave"></i>
            <span>{t('income.title')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses" activeClassName="active">
            <i className="fas fa-receipt"></i>
            <span>{t('expenses.title')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" activeClassName="active">
            <i className="fas fa-calendar-alt"></i>
            <span>{t('calendar.title')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">
            <i className="fas fa-cog"></i>
            <span>{t('settings.title')}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;