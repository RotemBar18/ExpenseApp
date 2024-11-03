import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import styled, { useTheme } from 'styled-components';

const ChartContainer = styled.div`
  color: ${(props) => props.theme.headerTextColor};
  background-color: ${(props) => props.theme.modalBackground}; 
  display: flex;
  position:relative;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  align-items: center;
  padding: 15px;
  width: 50%;
`;

const Title = styled.div`
  display: flex;
position:absolute;
left:20px;
`;

const BreakdownChart = ({ filteredExpenses, selectedRange }) => {
  const theme = useTheme(); 
  

  const expenseArray = Array.isArray(filteredExpenses) ? filteredExpenses : [];

  const chartData = expenseArray.map((expense, index) => ({
    id: expense.Category || `category-${index}`, 
    label: expense.Category || `category-${index}`,
    value: parseFloat(expense.Amount),  
  }));


  if (chartData.length === 0) {
    return <div>No expenses available for {selectedRange}</div>;
  }
  
  return (
    <ChartContainer>
      <Title>{selectedRange}</Title>
      <ResponsivePie
        data={chartData}
        margin={{ top: 10, right: -100, bottom: 10, left: 0 }}
        innerRadius={0.4}
        padAngle={1.5}
        cornerRadius={2}
        colors={theme.chartColors}  
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
            anchor: 'right',  
            direction: 'column',
            justify: false,
            translateX: -455,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: theme.headerTextColor, 
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
          },
        ]}
        tooltip={({ datum }) => {
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
