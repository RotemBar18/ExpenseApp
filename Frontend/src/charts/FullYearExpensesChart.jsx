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
import styled, { useTheme } from 'styled-components';

const ChartContainer = styled.div`
  height: 700px;  
  width:80%;
  background-color: ${(props) => props.theme.background};
`;
const Header = styled.h3`
  margin:0;
`;
const getAllDaysAndMonths = () => {
  const currentYear = new Date().getFullYear();
  const daysInMonth = [];
  for (let month = 1; month <= 12; month++) {
    const date = new Date(currentYear, month - 1, 1);
    while (date.getMonth() === month - 1) {
      daysInMonth.push({
        month,
        day: date.getDate(),
        amount: 0,
      });
      date.setDate(date.getDate() + 1);
    }
  }
  return daysInMonth;
};

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
      existingDay.amount += amount;
    }
  });

  return allDaysAndMonths;
};

const VerticalBubbleChart = ({ expenses }) => {
  const data = prepareData(expenses);
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  return (
    <ChartContainer>
      <Header style={{ color: theme.headerTextColor, borderBottom: `1px solid ${theme.border}` }}>
        {currentYear}
      </Header>
      <ResponsiveContainer>
        <ScatterChart
          margin={{ top: 10, right: 10, left: -20, bottom: 30 }}
          layout="vertical"
        >
          <CartesianGrid stroke={theme.border} /> {/* Use theme border color */}
          <YAxis
            type="number"
            dataKey="day"
            name="Day"
            ticks={[...Array(31).keys()].map(i => i + 1)}
            domain={[1, 31]}
            tickFormatter={(tick) => `Day ${tick}`}
            tick={{ fill: theme.headerTextColor, fontSize: 9 }}
          />
          <XAxis
            type="number"
            dataKey="month"
            name="Month"
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            tickFormatter={(tick) => format(new Date(2023, tick - 1), 'MMM')}
            domain={[1, 12]}
            tick={{ fill: theme.headerTextColor, fontSize: 10 }}
          />
          <ZAxis
            type="number"
            dataKey="amount"
            range={[10, 250]}
            name="Amount"
            unit="$"
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Expenses" data={data} fill={theme.chartColors[0]} /> {/* Use the first chart color */}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default VerticalBubbleChart;
