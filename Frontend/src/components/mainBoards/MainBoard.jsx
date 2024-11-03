import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddExpense from '../expense/AddExpense';
import GeneralDataBoard from '../board/GeneralDataBoard';
import RecentExpenses from '../board/RecentExpenses';
import BreakdownChart from '../../charts/BreakdownChart';
import useExpenses from '../../hooks/useExpenses';
import useAuth from '../../hooks/useAuth';
import { fetchUsers } from '../../utils/userService';
import BudgetModal from '../board/BudgetModal';

const MainBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  padding: 0 20px;
  color: ${props => props.theme.textColor};
  overflow-x:hidden;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  align-items: stretch;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

const MainData = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  gap: 1rem;
  
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonTextColor};
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover{
  background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;


export default function MainBoard({ board, categories, expensesThemeColor, userId }) {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedRange, setSelectedRange] = useState("This Week");
  const { expenses, reloadExpenses, updateExpense } = useExpenses({ board: board });
  const [users, setUsers] = useState([]);
  const { token } = useAuth()
  const budget = useState(board.Budget || 0);

  useEffect(() => {
    reloadExpenses(board.ExpenseBoardId);

    const fetchAllUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers(token);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, [board.ExpenseBoardId]);

  const handleUpdateExpense = (expense) => {
    updateExpense(expense);
  };

  const handleAddExpense = async () => {
    try {
      setShowAddExpense(false);
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
        
        <GeneralDataBoard
        board={board}
          users={users}
          expenses={expenses}
          onFilterChange={handleFilterChange}
        />
        {showAddExpense ? (
          <AddExpense
            onAdd={handleAddExpense}
            categories={categories}
            expensesThemeColor={expensesThemeColor}
            userId={userId}
            onClose={() => setShowAddExpense(false)}
            onExpenseAdded={reloadExpenses}
            board={board}
          />
        ) : (
          <AddButton onClick={() => setShowAddExpense(true)}>
            Add Expense
          </AddButton>
        )}
      </Header>

      <MainData>


        <RecentExpenses
          categories={categories}
          users={users}
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
