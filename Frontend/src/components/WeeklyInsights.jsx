import React from "react";
import styled from "styled-components";

const InsightsContainer = styled.div`
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExpenseList = styled.div`
  width: 100%;
  padding: 0 5px ;
  overflow-y: auto;
  height: 80px;
  
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

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid ${(props) => props.theme.border};
  font-size: 0.8rem;
  width: 100%;

  &:last-child {
    border-bottom: none;
  }

`;

const ItemName = styled.div`
  display: flex;
  flex-grow: 2;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => props.theme.headerTextColor};
`;

const ExpenseCategory = styled.div`
  font-size: 0.4rem;
  color: ${(props) => props.theme.navBarTextColor};
  background-color: ${(props) => props.theme.buttonBackground};
  padding: 1px 5px;
  border-radius: 25px;
  margin-right: 2px;
`;

const ItemAmount = styled.div`
  color: ${(props) => props.theme.headerTextColor};
  text-align: right;
`;

const NoExpensesMessage = styled.div`
  text-align: center;
  color: ${(props) => props.theme.border};
  font-size: 0.8rem;
`;

const TotalAmount = styled.div`
  margin-top: 10px;
  font-size:0.8rem;
  padding-top: 5px;
  font-weight: bold;
  text-align: right;
  width: 100%;
  color: ${(props) => props.theme.headerTextColor};
`;

const WeeklyInsights = ({ expenses }) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const last7DaysExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.Date);
    return expenseDate >= lastWeek && expenseDate <= today;
  });

  const totalAmount = last7DaysExpenses.reduce((total, expense) => total + parseFloat(expense.Amount), 0);

  return (
    <InsightsContainer>
      <ExpenseList>
        {last7DaysExpenses.length > 0 ? (
          last7DaysExpenses.map((expense, index) => (
            <ExpenseItem key={index}>
              <ItemName>{expense.Name}</ItemName>
              <ExpenseCategory>{expense.Category}</ExpenseCategory>
              <ItemAmount>${parseFloat(expense.Amount).toFixed(2)}</ItemAmount>
            </ExpenseItem>
          ))
        ) : (
          <NoExpensesMessage>No expenses in the last 7 days.</NoExpensesMessage>
        )}
      </ExpenseList>
      {last7DaysExpenses.length > 0 && (
        <TotalAmount>Total: ${totalAmount.toFixed(2)}</TotalAmount>
      )}
    </InsightsContainer>
  );
};

export default WeeklyInsights;
