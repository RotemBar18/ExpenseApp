import React from 'react';
import styled from 'styled-components';
import MainBoard from '../components/MainBoard';
import useExpenses from '../hooks/useExpenses';
import useAuth from '../hooks/useAuth';

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
&::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: ${(props) => props.theme.scrollBarTrack};
  border-radius: 10px;
  
  
}

&::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollBarThumb};
  border-radius: 10px;
  
}

&::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.scrollBarThumbHover || props.theme.scrollBarThumb};
  cursor: pointer;
}s
`;

const MainPage = () => {
  const { preferences, userId } = useAuth();
  const { expenses, loading: expensesLoading, error, reloadExpenses, deleteExpense, updateExpense } = useExpenses(userId);

  return (
    <PageContainer>
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
