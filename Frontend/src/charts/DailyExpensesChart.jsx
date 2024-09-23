import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { format } from 'date-fns';
import styled, { useTheme } from 'styled-components'; 

const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const getAllDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(format(new Date(date), 'yyyy-MM-dd'));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const groupExpensesByDayAndCategory = (expenses) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const allDays = getAllDaysInMonth(currentMonth, currentYear);
  const groupedData = allDays.map(day => {
    const categories = {};
    expenses.forEach((expense) => {
      const expenseDate = format(new Date(expense.Date), 'yyyy-MM-dd');
      if (expenseDate === day) {
        const category = expense.Category || 'Unknown';
        if (!categories[category]) {
          categories[category] = 0;
        }
        categories[category] += parseFloat(expense.Amount);
      }
    });
    const formattedDay = format(new Date(day), 'dd/MM');
    return {
      day: formattedDay,
      ...categories,
    };
  });
  return groupedData;
};

const DailyExpensesChart = ({ expenses }) => {
  const theme = useTheme();  
  const dailyData = groupExpensesByDayAndCategory(expenses);
  const categories = Array.from(new Set(expenses.map(exp => exp.Category || 'Unknown')));

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
      <h3 style={{ color: theme.headerTextColor, textAlign: 'center', borderBottom: `2px solid ${theme.border}`, paddingBottom: '10px' }}>
        {currentMonthName}'s Expenses:
      </h3>
      <ResponsiveBar
        data={dailyData}
        keys={categories}
        indexBy="day"
        margin={{ top: 30, bottom: 100, left: 60, right: 15 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={theme.chartColors || { scheme: 'greens' }} 
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: 'Date',
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
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={theme.buttonTextColor}
        enableLabel={false}
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={nivoTheme}
      />
    </ChartContainer>
  );
};

export default DailyExpensesChart;
