import React, { useEffect } from "react";
import styled from "styled-components";

const InsightsContainer = styled.div`
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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
  gap:1%;
  border-bottom: 1px solid ${(props) => props.theme.border};
  font-size: 0.8rem;
  width: 100%;
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.div`
  display: flex;
  flex-grow: 3;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => props.theme.headerTextColor};
`;

const OwnerPic = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.navBarTextColor};
`;

const CategoryBox = styled.div`
  display:flex;
  flex-grow: 1;
  justify-content: center;
  text-align:center;
`;
const ExpenseCategory = styled.div`
  display:flex;
  text-align:center;
  font-size: 0.4rem;
  color: ${(props) => props.theme.tagColor};
  background-color: ${(props) => props.theme.tagBackground};
  padding: 1px 5px;
  border-radius: 25px;  
`;

const ItemAmount = styled.div`
  text-align:end;
  color: ${(props) => props.theme.headerTextColor};
`;

const NoExpensesMessage = styled.div`
  text-align: center;
  color: ${(props) => props.theme.border};
  font-size: 0.8rem;
`;

const TotalAmount = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: right;
  width: 100%;
  color: ${(props) => props.theme.headerTextColor};
`;

const DailyInsights = ({ users, expenses }) => {
  const today = new Date();
  useEffect(() => {
  }, [expenses]);
  const currentDateString = today.toLocaleDateString("en-CA");

  const getOwnerPic = (userId) => {
    const owner = users.find((u) => u.Id === userId);
    return owner?.ProfilePic || "/default_profile.png"; // Use default profile pic if not found
  };

  const todaysExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.Date).toLocaleDateString("en-CA");
    return expenseDate === currentDateString;
  });

  const totalAmount = todaysExpenses.reduce(
    (total, expense) => total + parseFloat(expense.Amount),
    0
  );

  return (
    <InsightsContainer>
      <ExpenseList>
        {todaysExpenses.length > 0 ? (
          todaysExpenses.map((expense, index) => (
            <ExpenseItem key={index}>
              <ItemName>{expense.Name}</ItemName>
              <OwnerPic src={getOwnerPic(expense.UserId)} alt="Owner" />
              <CategoryBox>
                <ExpenseCategory>{expense.Category}</ExpenseCategory>
              </CategoryBox>
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
