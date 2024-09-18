import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';

// Get the total expenses for each month and category of the current year
const groupExpensesByMonthAndCategory = (expenses) => {
  const currentYear = new Date().getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const categories = Array.from(new Set(expenses.map(exp => exp.Category || 'Unknown'))); // Get unique categories

  // Group expenses by month and category
  const groupedData = months.map((month, index) => {
    const dataForMonth = { month };

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.Date);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth();
      const category = expense.Category || 'Unknown';

      if (expenseYear === currentYear && expenseMonth === index) {
        if (!dataForMonth[category]) {
          dataForMonth[category] = 0;
        }
        dataForMonth[category] += parseFloat(expense.Amount);
      }
    });

    // Ensure that all categories have a value, even if it's 0
    categories.forEach(category => {
      if (!dataForMonth[category]) {
        dataForMonth[category] = 0;
      }
    });

    return dataForMonth;
  });

  return { groupedData, categories };
};

const ChartContainer = styled.div`
  height: 30vh;
  width: 85%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b1b1b;
  padding: 5px 20px 40px 20px;
  border-radius: 10px;
`;

const MonthlyExpensesChart = ({ expenses }) => {
  const { groupedData, categories } = groupExpensesByMonthAndCategory(expenses);
  const currentYear = new Date().getFullYear();
  
  const theme = {
    axis: {
      ticks: {
        text: {
          fill: '#bbbbbb',
        },
      },
      legend: {
        text: {
          fill: '#bbbbbb',
        },
      },
    },
    grid: {
      line: {
        stroke: '#ffffff',
        strokeWidth: 2,
      },
    },
  };

  return (
    <ChartContainer>
      <h3 style={{ color: '#bbbbbb', textAlign: 'center', borderBottom: '2px solid #bbbbbb', paddingBottom: '10px' }}>
      {`${currentYear} Expenses:`}      </h3>
      <ResponsiveBar
        data={groupedData}
        keys={categories} // Categories as keys
        indexBy="month" // Group by month name
        margin={{ top: 30, bottom: 100, left: 60, right: 15 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'yellow_green_blue' }} // Customize the color scheme
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Amount Spent ($)',
          legendPosition: 'middle',
          legendOffset: -55,
          format: value => `$${value.toFixed(1)}`,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 20,
            itemTextColor: '#bbbbbb',
          },
        ]}
        label={({ id }) => `${id}`}
        animate={true}
        labelSkipWidth={70}
        labelSkipHeight={15}
        motionStiffness={90}
        motionDamping={15}
        theme={theme}
      />
    </ChartContainer>
  );
};

export default MonthlyExpensesChart;
