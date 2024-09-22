// src/components/ThemeProviderWrapper.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { getTheme } from '../styles/themes'; // Import your themes file
import useAuth from '../hooks/useAuth'; // Hook to fetch user preferences

// Create a Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProviderWrapper = ({ children }) => {
  const { preferences } = useAuth();
  const [theme, setTheme] = useState(getTheme('Default'));

  useEffect(() => {
    if (preferences.ExpensesThemeColor) {
      setTheme(getTheme(preferences.ExpensesThemeColor));
    }
  }, [preferences]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
