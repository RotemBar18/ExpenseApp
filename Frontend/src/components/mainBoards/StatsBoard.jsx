import React from 'react';
import styled from 'styled-components';
import DailyExpensesChart from '../../charts/MonthlyExpensesChart';
import MonthlyExpensesChart from '../../charts/YearlyExpensesChart';
import YearlyExpensesChart from '../../charts/FullYearExpensesChart'

const StatsBoardContainer = styled.div`
display:flex;
align-items: center;
flex-direction: column;
width: 100%;
justify-content: space-around;

`;
const StatsBoard = ({ expenses }) => {

    return (
        <StatsBoardContainer>
            <DailyExpensesChart expenses={expenses} />
            <MonthlyExpensesChart expenses={expenses} />
            <YearlyExpensesChart expenses={expenses} />
            </StatsBoardContainer>
    );
};

export default StatsBoard;
