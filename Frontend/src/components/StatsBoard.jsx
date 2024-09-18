// src/components/MainBoard.jsx
import React from 'react';
import styled from 'styled-components';
import ExpenseBarChart from '../charts/ExpenseBarChart'


const StatsBoardContainer = styled.div`
    padding-left:250px;
    height:100%;
    padding-top: 80px;

`;
const StatsBoard = ({ expenses }) => {

    return (
        <StatsBoardContainer>
            <ExpenseBarChart  expenses={expenses} />
        </StatsBoardContainer>
    );
};

export default StatsBoard;
