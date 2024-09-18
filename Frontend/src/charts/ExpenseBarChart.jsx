import React from 'react';
import DailyExpensesChart from './DailyExpensesChart';
import MonthlyExpensesChart from './MonthlyExpensesChart';
import YearlyExpensesChart from './YearlyExpensesChart'
import styled from 'styled-components';

const ExpenseChartsContainer = styled.div`
width:94%;
display:grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(2, 1fr);
`;
const ChartTop = styled.div`
  grid-column: 1 / span 2;  /* Spans across the first 3 columns */
  grid-row: 1;
`;
const ChartBottom = styled.div`
  grid-column: 1 / span 2;  /* Spans across the first 3 columns */
  grid-row: 2;
`;

const ChartRight = styled.div`
  grid-column: 3/span 2;  /* Spans across the first 3 columns */
  grid-row: 1  / span 2;
width:80%;
height:100%;
`;




const ExpenseDashboard = ({ expenses }) => {
  return (
    <ExpenseChartsContainer >
      {/* Daily Expenses Chart */}
      <ChartTop style={{ marginTop: '15px', }}> 
        <DailyExpensesChart expenses={expenses} />
      </ChartTop>

      {/* Monthly Expenses Chart */}
      <ChartBottom >  {/* Adjust the top and bottom padding */}
        <MonthlyExpensesChart expenses={expenses} />
      </ChartBottom>
      <ChartRight style={{ marginTop: '35px', }}>
        <YearlyExpensesChart  expenses={expenses}/>
      </ChartRight >
    </ExpenseChartsContainer>
  );
};

export default ExpenseDashboard;
