import React, { useState } from 'react';

const ChartHeader = ({ currentMonth, onSelectMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray' }}>
      <h3>Expenses</h3>
      <select 
        value={currentMonth} 
        onChange={(e) => onSelectMonth(e.target.value)}
        style={{ padding: '5px', border: '1px solid gray', borderRadius: '4px' }}
      >
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChartHeader;
