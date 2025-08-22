import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../actions/settingsActions';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  
  // Change language
  const handleLanguageChange = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
  };
  
  return (
    <header className="header">
      <div className="logo">
        <button className="mobile-menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <i className="fas fa-wallet"></i>
        <h1>{t('app.title')}</h1>
      </div>
      
      <div className="header-actions">
        <div className="language-selector">
          <select 
            className="form-control" 
            value={i18n.language} 
            onChange={handleLanguageChange}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;