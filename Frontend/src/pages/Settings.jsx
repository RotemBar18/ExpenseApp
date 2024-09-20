import Navbar from "../components/Navbar";
import styled from "styled-components";
import { updatePreferences } from '../utils/preferenceService';
import { processString } from "../utils/utilService";
import SettingsBoard from "../components/SettingsBoard";
import useExpenses from '../hooks/useExpenses'
import useAuth from "../hooks/useAuth";

const PageContainer = styled.div`
    background-color:#0a0a0a;
    position:fixed;
    width:100vw;
    top:0;
    left:0;
    height:60vw;
    color:#dddddd;
`;


const Settings = () => {
    const { user, preferences, userId } = useAuth(); // Use the custom hook to get user and preferences
    const { expenses} = useExpenses(userId);
  
   
    const handleAddCategory = (newCategory) => {
        onSetPreferences(newCategory)
    };



    const onSetPreferences = async (preference) => {
        let newPreferences = {};
        if (processString(preference) === 'object') {
            newPreferences = preference
        }
        // Determine if the input is a color or category
        else if (processString(preference) === 'color') {
            newPreferences = {
                ExpensesThemeColor: preference,
                DefaultCategories: preferences.DefaultCategories, // Keep current categories
            };
        } else {
            newPreferences = {
                ExpensesThemeColor: preferences.ExpensesThemeColor, // Keep current color
                DefaultCategories: [...preferences.DefaultCategories, preference], // Append new category
            };
        }

        try {
            await updatePreferences(token, user.Id, {
                ...newPreferences,
                DefaultCategories: JSON.stringify(newPreferences.DefaultCategories), // Ensure categories are stringified
            });
            setPreferences(newPreferences)
            console.log('Preferences updated successfully');
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    const onDeleteCategory = (categoryName) => {
        // Filter out the category with the matching id

        console.log(preferences.DefaultCategories)
        const updatedCategories = preferences.DefaultCategories.filter(cat => cat !== categoryName);
        console.log(updatedCategories)
        onSetPreferences(
            {
                ExpensesThemeColor: preferences.ExpensesThemeColor,
                DefaultCategories: updatedCategories
            }
        )
        // Update the state with the new categories array
    };

    return (
        <PageContainer>
            <Navbar expenses={expenses} preferences={preferences} user={user}  />
            <SettingsBoard onAddCategory={handleAddCategory} onDeleteCategory={onDeleteCategory} user={user} expenses={expenses} preferences={preferences} categories={preferences.DefaultCategories} />
        </PageContainer>
    )
};

export default Settings;