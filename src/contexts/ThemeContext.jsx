import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  mode: 'light',
  primaryColor: '#3B82F6',
  sidebarCollapsed: false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
    case 'SET_THEME':
      return { ...state, mode: action.payload };
    case 'SET_PRIMARY_COLOR':
      return { ...state, primaryColor: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    default:
      return state;
  }
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preferences');
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme);
      if (parsed.mode !== state.mode) {
        dispatch({ type: 'SET_THEME', payload: parsed.mode });
      }
      if (parsed.primaryColor && parsed.primaryColor !== state.primaryColor) {
        dispatch({ type: 'SET_PRIMARY_COLOR', payload: parsed.primaryColor });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-preferences', JSON.stringify({
      mode: state.mode,
      primaryColor: state.primaryColor,
    }));
    
    document.documentElement.classList.toggle('dark', state.mode === 'dark');
  }, [state.mode, state.primaryColor]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};