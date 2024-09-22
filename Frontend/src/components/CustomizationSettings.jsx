// src/components/CustomizationSettings.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ManageCategories from './ManageCategories';
import useAuth from '../hooks/useAuth'; // Import your hook for user and preferences
import { useDispatch } from 'react-redux';
import { updateUserPreferences } from '../redux/actions/preferenceAction'; // Import your action for updating preferences

const CustomizationContainer = styled.div`
   padding-left: 10px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.modalTextColor}; // Use theme-based colors

`;

const CustomizationSettings = ({ preferences }) => {
  const { user, token } = useAuth(); // Use your auth hook to get user and preferences
  const dispatch = useDispatch();
  const [updatedPreferences, setUpdatedPreferences] = useState(preferences);
  useEffect(() => {
    // Sync the local state with global preferences on component mount/update
    setUpdatedPreferences(preferences);
  }, [preferences]);

  const handleUpdatePreferences = (newPreferences) => {
    // Directly update with the new preferences passed to this function
    const mergedPreferences = {
      ExpensesThemeColor: newPreferences.ExpensesThemeColor || updatedPreferences.ExpensesThemeColor,
      DefaultCategories: newPreferences.DefaultCategories, // Use the exact updated array of categories
    };

    console.log('Merged Preferences:', mergedPreferences); // Check the merged output

    setUpdatedPreferences(mergedPreferences); // Set the updated preferences state
    dispatch(updateUserPreferences(user.Id, token, mergedPreferences)); // Dispatch the action to update preferences
  };

  return (
    <CustomizationContainer>
      <ManageCategories preferences={preferences} onUpdatePreferences={handleUpdatePreferences} />
    </CustomizationContainer>
  );
};

export default CustomizationSettings;
