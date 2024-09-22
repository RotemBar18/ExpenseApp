import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import { useTheme } from 'styled-components'; // Import the useTheme hook

// Function to group expenses by month and category
const groupExpensesByMonthAndCategory = (expenses) => {
  const currentYear = new Date().getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const categories = Array.from(new Set(expenses.map(exp => exp.Category || 'Unknown')));

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
background-color: ${(props) => props.theme.modalBackground};
  padding: 5px 20px 40px 20px;
  border-radius: 10px;
`;

const MonthlyExpensesChart = ({ expenses }) => {
  const { groupedData, categories } = groupExpensesByMonthAndCategory(expenses);
  const currentYear = new Date().getFullYear();
  const theme = useTheme(); // Access the current theme

  const nivoTheme = {
    axis: {
      ticks: {
        text: { fill: theme.headerTextColor || '#bbbbbb' },
      },
      legend: {
        text: { fill: theme.headerTextColor || '#bbbbbb' },
      },
    },
    grid: {
      line: {
        stroke: theme.headerTextColor, // You can adjust this if needed
        strokeWidth: 2,
      },
    },
    tooltip: {
      container: {
        background: theme.modalBackground, // Light background for tooltips
        color: theme.modalTextColor, // Dark text for readability
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  };

  return (
    <ChartContainer>
      <h3 style={{ color: theme.headerTextColor,textAlign: 'center', borderBottom: '2px solid #bbbbbb', paddingBottom: '10px' }}>
        {`${currentYear} Expenses:`}
      </h3>
      <ResponsiveBar
        data={groupedData}
        keys={categories}
        indexBy="month"
        margin={{ top: 30, bottom: 100, left: 60, right: 15 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={theme.chartColors} // Use colors from the theme
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
        theme={nivoTheme}
      />
    </ChartContainer>
  );
};

export default MonthlyExpensesChart;
