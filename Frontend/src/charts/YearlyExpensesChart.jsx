import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

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
   height: 50%;
  width: 80%;
  margin: 20px ;
background-color: ${(props) => props.theme.background};

`;

const MonthlyExpensesChart = ({ expenses }) => {
  const { groupedData, categories } = groupExpensesByMonthAndCategory(expenses);
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

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
        stroke: theme.headerTextColor, 
        strokeWidth: 2,
      },
    },
    tooltip: {
      container: {
        background: theme.modalBackground,  
        color: theme.modalTextColor, 
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  };

  return (
    <ChartContainer>
      <h3 style={{ color: theme.headerTextColor, borderBottom: `1px solid ${theme.border}` }}>
        {currentYear} Expenses:
      </h3>
      <ResponsiveBar
        data={groupedData}
        keys={categories}
        indexBy="month"
        margin={{ top: 30, bottom: 100, left: 60, right: 15 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={theme.chartColors}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 45,
        }}
        axisLeft={{
          tickSize: 1,
          tickPadding: 0,
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
