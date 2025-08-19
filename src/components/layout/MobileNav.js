import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MobileNav.css';

const MobileNav = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="mobile-nav">
      <NavLink exact to="/" className="mobile-nav-item" activeClassName="active">
        <i className="fas fa-home"></i>
        <span>{t('dashboard.title')}</span>
      </NavLink>
      <NavLink to="/income" className="mobile-nav-item" activeClassName="active">
        <i className="fas fa-money-bill-wave"></i>
        <span>{t('income.title')}</span>
      </NavLink>
      <NavLink to="/expenses" className="mobile-nav-item" activeClassName="active">
        <i className="fas fa-receipt"></i>
        <span>{t('expenses.title')}</span>
      </NavLink>
      <NavLink to="/calendar" className="mobile-nav-item" activeClassName="active">
        <i className="fas fa-calendar-alt"></i>
        <span>{t('calendar.title')}</span>
      </NavLink>
      <NavLink to="/settings" className="mobile-nav-item" activeClassName="active">
        <i className="fas fa-cog"></i>
        <span>{t('settings.title')}</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;