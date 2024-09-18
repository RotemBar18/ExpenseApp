import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainBoard from '../components/MainBoard';
import Navbar from '../components/Navbar';
import useExpenses from '../hooks/useExpenses';
import { getUserIdFromToken } from '../utils/jwtService';
import { fetchUser } from '../utils/authService';
import { fetchPreferences } from '../utils/preferenceService';
import { processString } from '../utils/utilService';


const PageContainer = styled.div`
  display:flex;
  width:100%;
`;

const MainPage = () => {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken(token);
    const { expenses, loading, error, reloadExpenses, deleteExpense, updateExpense } = useExpenses(userId);
    const [user, setUser] = useState({})
    // Default preferences
    const [preferences, setPreferences] = useState({
        ExpensesThemeColor: "#ffffff",
        DefaultCategories: ['Food', 'Health', 'Entertainment', 'Education', 'Miscellaneous'],
    });

    // Load preferences on mount
    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const loadedUser = await fetchUser(userId)
                setUser(loadedUser)
                const loadedPref = await fetchPreferences(token, userId);
                const categoriesArray = JSON.parse(loadedPref.DefaultCategories);

                // Check if the preferences differ before setting the state
                if (
                    JSON.stringify(preferences.DefaultCategories) !== JSON.stringify(categoriesArray) ||
                    preferences.ExpensesThemeColor !== loadedPref.ExpensesThemeColor
                ) {
                    setPreferences({
                        ExpensesThemeColor: loadedPref.ExpensesThemeColor,
                        DefaultCategories: categoriesArray,
                    });
                }
            } catch (error) {
                console.error('Error fetching preferences:', error);
            }
        };

        loadPreferences();
    }, []); // Empty array to ensure this runs only once on mount

    return (
        <PageContainer>
            <Navbar user={user} preferences={preferences} expenses={expenses} />
            <MainBoard
                categories={preferences.DefaultCategories}
                expensesThemeColor={preferences.ExpensesThemeColor}
                userId={userId}
                expenses={expenses}
                loading={loading}
                error={error}
                reloadExpenses={reloadExpenses}
                updateExpense={updateExpense}
                deleteExpense={deleteExpense}
            />
        </PageContainer>
    );
};

export default MainPage;
