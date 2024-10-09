import React, { useState } from 'react';
import AddExpense from './AddExpense';
import RecentExpenses from './RecentExpenses';
import styled from 'styled-components';
import GeneralDataBoard from './GeneralDataBoard'
const MainBoardContainer = styled.div`
  display: flex;
  flex-direction:column;
  gap: 40px;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  background-color: ${(props) => props.theme.background}; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const QuickAccessBoard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:10px 0px;
  border-radius: 8px;
  width:90%;
`;

const QuickAccessBtn = styled.div`
  cursor: pointer;
  padding: 10px 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);

  font-size: 14px;
  color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.buttonBackground}; 
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground}; 
    color: ${(props) => props.theme.buttonHoverTextColor};
  }
`;

const MainBoard = ({ categories, userId, expenses, reloadExpenses }) => {
  const [quickAccessKind, setQuickAccessKind] = useState('');

  const handleAddExpense = async () => {
    try {
      closeModal()
      reloadExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const closeModal = () => {
    setQuickAccessKind(null);
  };

  return (
    <MainBoardContainer>
      {quickAccessKind === 'addExpense' && (
        <AddExpense
          categories={categories}
          userId={userId}
          onAdd={handleAddExpense}
          onClose={closeModal}
        />
      )}
      <QuickAccessBoard>
        <QuickAccessBtn onClick={() => setQuickAccessKind('addExpense')}>
          + Add Expense +
        </QuickAccessBtn>
      </QuickAccessBoard>

      <GeneralDataBoard expenses={expenses}/>

      <RecentExpenses categories={categories} expenses={expenses} />
    </MainBoardContainer>
  );
};

export default MainBoard;
