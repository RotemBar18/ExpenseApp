
import React from "react";
import styled from "styled-components";

const InsightsContainer = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 10px;
  display:flex;
`;


const ExpenseList = styled.div`
  margin-top: 10px;

`;

const ExpenseItem = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  align-items: center;
  gap:10px;
  &:last-child {
    border-bottom: none; /* Remove the border from the last item */
  }
`;

const ItemData = styled.div`
  font-size:14px;
`;

const DailyInsights = ({ expenses }) => {
  const today = new Date();
  const currentDateString = today.toISOString().split("T")[0]; // Format YYYY-MM-DD

  const todaysExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.Date);
    return expenseDate.toISOString().split("T")[0] === currentDateString; // Compare dates
  });

  return (
    <InsightsContainer>
      <ExpenseList>
        {todaysExpenses.length > 0 ? (
          todaysExpenses.map((expense, index) => (
            <ExpenseItem key={index}>
              <ItemData>{expense.Name}</ItemData>
              <ItemData>{expense.Category}</ItemData>
              <ItemData>${parseFloat(expense.Amount).toFixed(2)}</ItemData>
            </ExpenseItem>
          ))
        ) : (
          <p>No expenses for today.</p>
        )}
      </ExpenseList>
    </InsightsContainer>
  );
};

export default DailyInsights;
