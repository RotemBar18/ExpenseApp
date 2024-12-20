import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateBoardPreferences } from '../../redux/actions/preferenceAction';
import { themes } from '../../styles/themes';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
const ManageThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding:10px;
  border-radius: 10px;
  margin-bottom:10px;
  border :1px solid  ${(props) => props.theme.modalTextColor};

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
  padding: 0px 5px 5px  0px;
  font-weight:600;
  margin-bottom:10px;
  border-bottom: 1px solid ${(props) => ( props.theme.border)};
  color: ${(props) => props.theme.headerTextColor};
`;

const ManageTheme = ({boardId}) => {
  const {  token } = useAuth();  
  const preferences = useSelector((state) => state.preferences);
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

    dispatch(updateBoardPreferences(boardId, token, mergedPreferences));
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
