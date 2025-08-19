import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleDarkMode, setLanguage } from '../../actions/settingsActions';

const Settings = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { darkMode, language } = useSelector(state => state.settings);
  
  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };
  
  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    dispatch(setLanguage(newLanguage));
  };
  
  return (
    <div className="settings">
      <h1 className="page-title">{t('settings.title')}</h1>
      
      <div className="settings-container">
        <div className="settings-section">
          <h3>{t('settings.general')}</h3>
          
          <div className="settings-item">
            <label htmlFor="language">{t('settings.language')}</label>
            <select
              id="language"
              className="form-control"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <div className="settings-item">
            <label htmlFor="darkMode">{t('settings.darkMode')}</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="darkMode"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;