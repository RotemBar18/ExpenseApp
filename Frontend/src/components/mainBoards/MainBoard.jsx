import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddExpense from '../expense/AddExpense';
import GeneralDataBoard from '../board/GeneralDataBoard';
import RecentExpenses from '../board/RecentExpenses';
import BreakdownChart from '../../charts/BreakdownChart'; 
import useExpenses from '../../hooks/useExpenses'; 

const MainBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  padding: 0 20px;
  color: ${props => props.theme.textColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  align-items: stretch;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const MainData = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  gap: 20px;
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonTextColor};
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
`;

const BackButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonTextColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }
`;

export default function MainBoard({ board, categories, expensesThemeColor, userId }) {
  const [showAddExpense, setShowAddExpense] = useState(false); 
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedRange, setSelectedRange] = useState("This Week");
  const { expenses, reloadExpenses, updateExpense } = useExpenses({ boardId: board.ExpenseBoardId, userId }); 

  useEffect(() => {
    reloadExpenses(); 
  }, [board.ExpenseBoardId]);

  const handleUpdateExpense = (expense) => {
    updateExpense(expense);
  };

  const handleAddExpense = async () => {
    try {
      setShowAddExpense(false);
      reloadExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleFilterChange = (newFilteredExpenses, newSelectedRange) => {
    setFilteredExpenses(newFilteredExpenses);
    setSelectedRange(newSelectedRange);
  };



  return (
    <MainBoardContainer>
      <Header>
        {showAddExpense ? (
          <AddExpense
            onAdd={handleAddExpense}
            categories={categories}
            expensesThemeColor={expensesThemeColor}
            userId={userId}
            onClose={() => setShowAddExpense(false)} 
            onExpenseAdded={reloadExpenses}
            boardId={board.ExpenseBoardId}
          />
        ) : (
          <AddButton onClick={() => setShowAddExpense(true)}>
            Add Expense
          </AddButton>
        )}

        <GeneralDataBoard
          expenses={expenses}
          onFilterChange={handleFilterChange}
        />
      </Header>

      <MainData>
        <RecentExpenses
          categories={categories}
          expenses={expenses}
          onUpdate={handleUpdateExpense}
        />

        <BreakdownChart
          filteredExpenses={filteredExpenses}
          selectedRange={selectedRange}
        />
      </MainData>
    </MainBoardContainer>
  );
}
