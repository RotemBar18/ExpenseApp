import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Scatter,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';
import styled from 'styled-components';

// Styled component for the chart container
const ChartContainer = styled.div`
  height: 625px;  
  display:flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b1b1b;
  border-radius: 10px;
  padding: 20px;
  padding-bottom:33px;
`;

// Function to generate data with all days and months included, even if no expenses
const getAllDaysAndMonths = () => {
  const currentYear = new Date().getFullYear();
  const daysInMonth = [];
  for (let month = 1; month <= 12; month++) {
    const date = new Date(currentYear, month - 1, 1);
    while (date.getMonth() === month - 1) {
      daysInMonth.push({
        month,
        day: date.getDate(),
        amount: 0, // Default to 0 when there is no expense
      });
      date.setDate(date.getDate() + 1);
    }
  }
  return daysInMonth;
};

// Helper function to group expenses by day and category for the current month
const prepareData = (expenses) => {
  const allDaysAndMonths = getAllDaysAndMonths();

  expenses.forEach((expense) => {
    const date = new Date(expense.Date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const amount = parseFloat(expense.Amount);

    const existingDay = allDaysAndMonths.find(
      (d) => d.month === month && d.day === day
    );
    if (existingDay) {
      existingDay.amount += amount; // Sum expenses for the same day
    }
  });

  return allDaysAndMonths;
};

const VerticalBubbleChart = ({ expenses }) => {
  const data = prepareData(expenses);
  const currentYear = new Date().getFullYear();

  return (
    <ChartContainer>
      <h3 style={{ color: '#bbbbbb', borderBottom: '1px solid' }}>{currentYear}</h3>
      <ResponsiveContainer>
        <ScatterChart 
        margin={{ top: 10, right: 10, left: -20, bottom: 30 }}
          layout="vertical">
          <CartesianGrid />

          {/* Y-axis: Days of the month */}
          <YAxis
            type="number"
            dataKey="day"
            name="Day"
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]} // Days 1 to 31
            domain={[1, 31]}
            tickFormatter={(tick) => `Day ${tick}`}
            tick={{ fill: '#bbbbbb', fontSize: 8 }}  // Smaller tick labels
          />

          {/* X-axis: First letter of the month */}
          <XAxis
            type="number"
            dataKey="month"
            name="Month"
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            tickFormatter={(tick) => format(new Date(2023, tick - 1), 'MMM')[0]} // Show only first letter
            domain={[1, 12]}
            tick={{ fill: '#bbbbbb', fontSize: 10 }}  // Smaller tick labels
          />

          {/* Z-axis: Amount, used to size the bubbles */}
          <ZAxis
            type="number"
            dataKey="amount"
            range={[10, 250]}  // Adjust the range for bubble sizes
            name="Amount"
            unit="$"
          />

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />

          {/* Scatter plot for the bubbles */}
          <Scatter name="Expenses" data={data} fill="#82ca9d" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default VerticalBubbleChart;
