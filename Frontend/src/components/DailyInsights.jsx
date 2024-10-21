import React from "react";
import styled from "styled-components";

const InsightsContainer = styled.div`
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:100%;
  justify-content: space-between;
`;

const ExpenseList = styled.div`
  list-style: none;
  width: 100%;
  margin: 0;
  overflow-y: auto;
  max-height: 120px;
      padding: 0px 5px;


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
  flex-grow:2;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => props.theme.headerTextColor};
`;

const ExpenseCategory = styled.div`
  font-size: 0.4rem;
  color: ${(props) => props.theme.tagColor};
  background-color: ${(props) => props.theme.tagBackground};
  padding: 1px 5px;
  border-radius: 25px;
  margin-right: 2px;
`;

const ItemAmount = styled.div`
  color: ${(props) => props.theme.headerTextColor};
`;

const NoExpensesMessage = styled.div`
  text-align: center;
  color: ${(props) => props.theme.border};
  font-size: 0.8rem;
`;

const TotalAmount = styled.div`
  font-size:0.8rem;
  font-weight: bold;
  text-align: right;
  width: 100%;
  color: ${(props) => props.theme.headerTextColor};
`;

const DailyInsights = ({ expenses }) => {
  const today = new Date();
  
  // Format the current date using local timezone
  const currentDateString = today.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD


  // Filter today's expenses
  const todaysExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.Date).toLocaleDateString('en-CA'); // Format the expense date as YYYY-MM-DD
    return expenseDate === currentDateString; // Compare date parts
  });


  const totalAmount = todaysExpenses.reduce((total, expense) => total + parseFloat(expense.Amount), 0);

  return (
    <InsightsContainer>
      <ExpenseList>
        {todaysExpenses.length > 0 ? (
          todaysExpenses.map((expense, index) => (
            <ExpenseItem key={index}>
              <ItemName>{expense.Name}</ItemName>
              <ExpenseCategory>{expense.Category}</ExpenseCategory>
              <ItemAmount>${parseFloat(expense.Amount).toFixed(2)}</ItemAmount>
            </ExpenseItem>
          ))
        ) : (
          <NoExpensesMessage>No expenses for today.</NoExpensesMessage>
        )}
      </ExpenseList>
      {todaysExpenses.length > 0 && (
        <TotalAmount>Total: ${totalAmount.toFixed(2)}</TotalAmount>
      )}
    </InsightsContainer>
  );
};




export default DailyInsights;
