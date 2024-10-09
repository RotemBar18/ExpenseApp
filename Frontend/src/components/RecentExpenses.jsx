import styled from 'styled-components';
import React, { useState } from "react";

const ExpenseListContainer = styled.div`
  color: ${(props) => props.theme.headerTextColor};
  background-color: ${(props) => props.theme.modalBackground}; 
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  max-height: 200px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
  align-items: center;
  width:90%;
  justify-content: center;
`;

const ExpensesTable = styled.div`
  list-style: none;
  margin: 0;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width:90%;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const ExpenceHeader = styled.div`
  display: flex;
justify-content: flex-start;
  width:100%;
`;


const HeaderText = styled.div`
width:25%;
  font-weight: 800;
  color: ${(props) => props.theme.modalTextColor};
`;

const HeaderPrice = styled.div`
  font-weight: 800;
  color: ${(props) => props.theme.modalTextColor};
`;
const Expenses = styled.div`
display:flex;
flex-direction:column;
overflow-y:auto;
width:100%;

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
justify-content: flex-start;
color: ${(props) => props.theme.modalTextColor};
`;

const ExpenseAmount = styled.div`
  text-overflow: ellipsis
  width:25%;
  color: ${(props) => props.theme.modalTextColor};
`;

const ExpenseText = styled.div`
  display: inline-block;
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  width:25%;

  color: ${(props) => props.theme.modalTextColor};
`;
const RecentExpenses = ({ expenses }) => {
  const [hoveredExpense, setHoveredExpense] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const expensesForDisplay = [...expenses]
    .sort((a, b) => new Date(b.Date) - new Date(a.Date))
    .slice(0, 5);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handleMouseEnter = (expense) => {
    setHoveredExpense(expense);
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <>
      <ExpenseListContainer>

        <ExpensesTable>
          <Header>Recent Expenses</Header>
          <ExpenceHeader>
            <HeaderText >
              Name
            </HeaderText>
            <HeaderText >
              Category
            </HeaderText>
            <HeaderText >
              Date
            </HeaderText>
            <HeaderPrice >
              Price
            </HeaderPrice>
          </ExpenceHeader>
          <Expenses>

            {expensesForDisplay.map((expense, index) => (
              <Expense
                key={expense.ExpenseId}>
                <ExpenseText >
                  {expense.Name}
                </ExpenseText>
                <ExpenseText>
                  {expense.Category}
                </ExpenseText>
                <ExpenseText >
                  {formatDate(expense.Date)}
                </ExpenseText>
                <ExpenseAmount >
                  ${expense.Amount}
                </ExpenseAmount>
              </Expense>
            ))}
          </Expenses>

        </ExpensesTable>

      </ExpenseListContainer>
    </>
  );
};

export default RecentExpenses;
