import styled from 'styled-components';
import React, { useState } from "react";

const ExpenseListContainer = styled.div`
  color: ${(props) => props.theme.headerTextColor};
  background-color: ${(props) => props.theme.modalBackground}; 
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width:50%;
`;

const ExpensesTable = styled.div`
  list-style: none;
  margin: 0;
  padding: 0px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  border-bottom: 2px solid ${(props) => props.theme.border};
  text-align: center;
`;

const Expenses = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding:0 10px;
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
  }
`;

const Expense = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.border};
  transition: background-color 0.3s;

`;

const ExpenseDetails = styled.div`
  display: flex;
  flex-grow:2;
  flex-direction: column;
  justify-content: center;
  `;

const ExpenseName = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.modalTextColor};
  font-size: 0.8rem;
`;

const ExpenseDate = styled.div`
  font-weight: 400;
  font-size: 0.6rem;
  color: ${(props) => props.theme.border};
`;

const ExpenseCategory = styled.div`
  font-size: 0.5rem;
margin-right:10px;
  color: ${(props) => props.theme.tagColor};
  text-align: center;
  background-color: ${(props) => props.theme.tagBackground};
border-radius:25px;
padding:2px 10px ;
`;

const ExpenseAmount = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  color: ${(props) => props.theme.modalTextColor};
  text-align: right;
`;

const RecentExpenses = ({ expenses }) => {
  const expensesForDisplay = [...expenses]
    .sort((a, b) => new Date(b.Date) - new Date(a.Date))
    .slice(0, 5);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <ExpenseListContainer>
      <ExpensesTable>
        <Header>Recent Expenses</Header>
        <Expenses>
          {expensesForDisplay.map((expense, index) => (
            <Expense key={expense.ExpenseId}>
              <ExpenseDetails>
                <ExpenseName>{expense.Name}</ExpenseName>
                <ExpenseDate>{formatDate(expense.Date)}</ExpenseDate>
              </ExpenseDetails>
              <ExpenseCategory>{expense.Category}</ExpenseCategory>
              <ExpenseAmount>${expense.Amount}</ExpenseAmount>
            </Expense>
          ))}
        </Expenses>
      </ExpensesTable>
    </ExpenseListContainer>
  );
};

export default RecentExpenses;
