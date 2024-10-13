import React, { useState } from 'react'
import styled from 'styled-components'
import AddExpense from './AddExpense'
import GeneralDataBoard from './GeneralDataBoard'
import RecentExpenses from './RecentExpenses'

const MainBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textColor};
  
`

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
`


const AddButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonTextColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }

`

export default function MainBoard({ categories, expensesThemeColor, userId, expenses, loading, error, reloadExpenses, updateExpense, deleteExpense }) {
  const [showAddExpense, setShowAddExpense] = useState(false)

  const handleUpdateExpense = (expense) => {
    updateExpense(expense);
  };

  const handleAddExpense = async () => {
    try {
      setShowAddExpense(false)
      reloadExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <MainBoardContainer>
      <Header>
        <AddButton onClick={() => setShowAddExpense(true)}>
          Add Expense
        </AddButton>
        <GeneralDataBoard expenses={expenses} />

      </Header>

      <RecentExpenses
        categories={categories}
        expenses={expenses}
        onUpdate={handleUpdateExpense} />

      {showAddExpense && (
        <AddExpense
          onAdd={handleAddExpense}
          categories={categories}
          expensesThemeColor={expensesThemeColor}
          userId={userId}
          onClose={() => setShowAddExpense(false)}
          onExpenseAdded={reloadExpenses}
        />
      )}
    </MainBoardContainer>
  )
}
