import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import styled, { useTheme } from 'styled-components';

const ChartContainer = styled.div`
  color: ${(props) => props.theme.headerTextColor};
  background-color: ${(props) => props.theme.modalBackground}; 
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  align-items: center;
  padding: 15px;
  width: 50%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  gap: 10px;
`;

const BreakdownChart = ({ filteredExpenses, selectedRange }) => {
  const theme = useTheme(); // Access the current theme
  
  console.log('Filtered Expenses:', filteredExpenses);

  const expenseArray = Array.isArray(filteredExpenses) ? filteredExpenses : [];

  const chartData = expenseArray.map((expense, index) => ({
    id: expense.Category || `category-${index}`,  // Unique id for each expense
    label: expense.Category || `category-${index}`, // Fallback if no Category
    value: parseFloat(expense.Amount),   // Parsing the amount as a number
  }));

  console.log('Chart Data:', chartData);  // Log chartData to ensure it's correct

  if (chartData.length === 0) {
    return <div>No expenses available for {selectedRange}</div>;
  }
  
  return (
    <ChartContainer>
      <Title>{selectedRange}</Title>
      <ResponsivePie
        data={chartData}
        margin={{ top: 10, right: 100, bottom: 20, left: -10 }} // Adjust margin for the legend
        innerRadius={0.4}
        padAngle={1.5}
        cornerRadius={2}
        colors={theme.chartColors}  // Apply the theme's chart colors
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        enableArcLinkLabels={false}
        arcLabelsSkipAngle={15}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '2'
                ]
            ]
        }}
        legends={[
          {
            anchor: 'right',  // Place the legend on the right side
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: theme.headerTextColor, // Use the theme's text color
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
          },
        ]}
        tooltip={({ datum }) => {
          console.log('Tooltip data:', datum);  // Logging the correct data
          return (
            <div style={{ padding: '5px', background: 'white', border: '1px solid #ccc' }}>
              <strong>{datum.label}:</strong> ${datum.value ? datum.value.toFixed(2) : '0.00'}
            </div>
          );
        }}
      />
    </ChartContainer>
  );
};

export default BreakdownChart;
