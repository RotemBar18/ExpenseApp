import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { format } from 'date-fns';
import styled from 'styled-components';

const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

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


const getAllDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(format(new Date(date), 'yyyy-MM-dd'));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Helper function to group expenses by day and category for the current month
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
      day: formattedDay,  // Use the new format here
      ...categories,
    };
  });
  return groupedData;
};

const DailyExpensesChart = ({ expenses }) => {
  const dailyData = groupExpensesByDayAndCategory(expenses);
  const categories = Array.from(new Set(expenses.map(exp => exp.Category || 'Unknown')));
  const theme = {
    axis: {
      ticks: {
        text: {
          fill: '#bbbbbb', // Change axis label color to white
        },
      },
      legend: {
        text: {
          fill: '#bbbbbb', // Change axis legend color to white
        },
      },
    },
    grid: {
      line: {
        stroke: '#ffffff', // Change grid line color to white
        strokeWidth: 2,
      },
    },
  };

  return (
    <ChartContainer>
      <h3 style={{ color: '#bbbbbb', textAlign: 'center', borderBottom: '2px solid #bbbbbb', paddingBottom: '10px' }}>{currentMonthName}'s Expenses:</h3>
      <ResponsiveBar
        data={dailyData}
        keys={categories}  // The category names
        indexBy="day"  // The days of the month
        margin={{ top: 30, bottom: 100, left: 60, right: 15 }}  // Adjust margins for a better layout
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'yellow_green' }}  // Customize the color scheme
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
        label={(d) => `$${d.value.toFixed(2)}`}
        enableLabel={false}
        legends={[]}  // Remove legends
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={theme}
      />
    </ChartContainer>
  );
};

export default DailyExpensesChart;
