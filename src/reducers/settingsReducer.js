import { TOGGLE_DARK_MODE, SET_LANGUAGE } from '../actions/types';

const initialState = {
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
  language: localStorage.getItem('language') || 'fr'
};

// Fonction nommée pour l'export par défaut
function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
}

export default settingsReducer;