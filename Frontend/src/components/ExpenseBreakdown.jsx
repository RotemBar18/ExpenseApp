import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InsightsContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackground};
  padding: 20px;
  
`;

const SelectSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 3px;
  font-size: 0.7rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 5px;
  width: 100%;
`;

const List = styled.div`
  height: 80px;
  overflow-y: auto;
  width: 100%;
  padding-right: 5px;
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

const ItemContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ItemLabel = styled.span`
  flex: 1;
  margin-right: 10px;
  font-size: 0.7rem;
  color: ${(props) => props.theme.headerTextColor};
`;

const Amount = styled.span`
  flex: 1;
  text-align: right;
  font-size: 0.7rem;
  font-weight: bold;
  color: ${(props) => props.theme.headerTextColor};
`;

const NoExpensesMessage = styled.div`
  text-align: center;
  color: ${(props) => props.theme.border};
  font-size: 0.7rem;
`;

const TotalAmount = styled.div`
  padding-top: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: right;
  width: 100%;
  color: ${(props) => props.theme.headerTextColor};
`;

const getExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    if (!acc[expense.Category]) {
      acc[expense.Category] = 0;
    }
    acc[expense.Category] += parseFloat(expense.Amount);
    return acc;
  }, {});
};

const ExpenseBreakdown = ({ expenses, onFilterChange }) => {
  const [timeRange, setTimeRange] = useState("This Week");
  const [groupedExpenses, setGroupedExpenses] = useState({});

  useEffect(() => {
    const today = new Date();
    let filterStartDate, filterEndDate;

    if (timeRange === "This Week") {
      filterStartDate = new Date();
      filterStartDate.setDate(today.getDate() - 7); // Last 7 days
      filterEndDate = today;
    } else if (timeRange === "This Month") {
      filterStartDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
      filterEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the month
    }

    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.Date);
      return expenseDate >= filterStartDate && expenseDate <= filterEndDate;
    });

    const grouped = getExpensesByCategory(filteredExpenses);

    if (JSON.stringify(grouped) !== JSON.stringify(groupedExpenses)) {
      setGroupedExpenses(grouped);
    }

    if (onFilterChange) {
      const groupedArray = Object.keys(grouped).map((category) => ({
        Category: category,
        Amount: grouped[category],
      }));
    
      onFilterChange(groupedArray, timeRange);  // Pass grouped data as an array
    }
    

  }, [timeRange, expenses]);


  const totalSpending = Object.values(groupedExpenses).reduce((total, amount) => total + amount, 0);

  return (
    <InsightsContainer>
      <SelectSection>
        <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </Select>
        <List>
          {Object.keys(groupedExpenses).length > 0 ? (
            Object.keys(groupedExpenses).map((category) => {
              const amount = groupedExpenses[category];
              return (
                <ItemContainer key={category}>
                  <ItemLabel>{category}</ItemLabel>
                  <Amount>${amount.toFixed(2)}</Amount>
                </ItemContainer>
              );
            })
          ) : (
            <NoExpensesMessage>No expenses available for the selected range.</NoExpensesMessage>
          )}
        </List>
        {Object.keys(groupedExpenses).length > 0 && (
          <TotalAmount>Total: ${totalSpending.toFixed(2)}</TotalAmount>
        )}
      </SelectSection>
    </InsightsContainer>
  );
};

export default ExpenseBreakdown;
