import React, { useEffect } from 'react';
import styled from 'styled-components';
import MainBoard from '../components/MainBoard';
import Navbar from '../components/Navbar';
import useExpenses from '../hooks/useExpenses';
import useAuth from '../hooks/useAuth';

const PageContainer = styled.div`
  display: flex;
  width: 100%;
`;

const MainPage = () => {
  const { user, preferences, userId } = useAuth(); // Use the custom hook to get user and preferences
  const { expenses, loading: expensesLoading, error, reloadExpenses, deleteExpense, updateExpense } = useExpenses(userId);

  console.log('Redux user:', user);  // Debug log
  console.log('Redux preferences:', preferences);  // Debug log




  return (
    <PageContainer>
      <Navbar user={user} preferences={preferences} expenses={expenses} />
      <MainBoard
        categories={preferences.DefaultCategories}
        expensesThemeColor={preferences.ExpensesThemeColor}
        userId={userId}
        expenses={expenses}
        loading={expensesLoading}
        error={error}
        reloadExpenses={reloadExpenses}
        updateExpense={updateExpense}
        deleteExpense={deleteExpense}
      />
    </PageContainer>
  );
};

export default MainPage;
