// src/components/ManageTheme.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateUserPreferences } from '../redux/actions/preferenceAction'; // Adjust import path as needed
import { themes } from '../styles/themes'; // Import predefined themes
import useAuth from '../hooks/useAuth'; // Import your custom hook for user and preferences

const ManageThemeContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.inputTextColor};
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonBackground};
  }
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.headerTextColor};
`;

const ManageTheme = () => {
  const { user, token, preferences } = useAuth(); // Get user and token from your auth hook
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState(preferences.ExpensesThemeColor || 'Light');

  useEffect(() => {
    setSelectedTheme(preferences.ExpensesThemeColor);
  }, [preferences]);

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    updatePreferences({ ExpensesThemeColor: newTheme });
  };

  const updatePreferences = (newPreferences) => {
    const mergedPreferences = {
      ...preferences,
      ExpensesThemeColor: newPreferences.ExpensesThemeColor || preferences.ExpensesThemeColor,
    };

    dispatch(updateUserPreferences(user.Id, token, mergedPreferences));
  };

  return (
    <ManageThemeContainer>
      <Label htmlFor="themeSelect">Choose Your Theme:</Label>
      <Select id="themeSelect" value={selectedTheme} onChange={handleThemeChange}>
        {Object.keys(themes).map((themeKey) => (
          <option key={themeKey} value={themeKey}>
            {themes[themeKey].name}
          </option>
        ))}
      </Select>
    </ManageThemeContainer>
  );
};

export default ManageTheme;
