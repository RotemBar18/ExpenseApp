
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styled from "styled-components";
import { useTheme } from 'styled-components';


const ChartContainer = styled.div`
padding-top:5px;
`;

const MonthlyInsightsChart = ({ categorySpending }) => {
    const theme = useTheme();
    
    const COLORS = theme.chartColors

    const pieData = Object.entries(categorySpending).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));


  return (
    <ChartContainer>
      <PieChart width={80} height={80}>
        <Pie
          data={pieData}
          labelLine={false}
          legendType="none"
          outerRadius={40}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive ={false}
          
        >
          {pieData.map((entry, index) => (
            <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
};

export default MonthlyInsightsChart;
