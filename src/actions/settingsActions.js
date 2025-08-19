import { TOGGLE_DARK_MODE, SET_LANGUAGE } from './types';

// Toggle dark mode
export const toggleDarkMode = () => {
  return (dispatch) => {
    const darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    const newDarkMode = !darkMode;
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    
    dispatch({
      type: TOGGLE_DARK_MODE,
      payload: newDarkMode
    });
  };
};

// Set language
export const setLanguage = (language) => {
  return (dispatch) => {
    localStorage.setItem('language', language);
    
    dispatch({
      type: SET_LANGUAGE,
      payload: language
    });
  };
};