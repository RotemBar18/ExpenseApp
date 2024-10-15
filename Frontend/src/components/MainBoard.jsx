import React, { useState } from 'react';
import styled from 'styled-components';
import AddExpense from './AddExpense';
import GeneralDataBoard from './GeneralDataBoard';
import RecentExpenses from './RecentExpenses';
import BreakdownChart from '../charts/BreakdownChart'; // Assuming this is the component for the chart

const MainBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap:10px;
  align-items: stretch;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const MainData = styled.div`
  display: flex;
  width:100%;
  height:45%;
  gap:10px;
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonTextColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: ${(props) => (props.hide ? 'none' : 'block')}; // Conditionally hide the button

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }
`;

export default function MainBoard({ categories, expensesThemeColor, userId, expenses, loading, error, reloadExpenses, updateExpense, deleteExpense }) {
  const [showAddExpense, setShowAddExpense] = useState(false); // Toggle AddExpense modal visibility
  const [filteredExpenses, setFilteredExpenses] = useState([]); // State for filtered expenses
  const [selectedRange, setSelectedRange] = useState("This Week"); // State for selected range (weekly/monthly)

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
            onClose={() => setShowAddExpense(false)} // Close the modal
            onExpenseAdded={reloadExpenses}
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
