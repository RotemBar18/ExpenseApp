import React from 'react';
import styled from 'styled-components';
import ExpenseBarChart from '../charts/ExpenseBarChart'


const StatsBoardContainer = styled.div`
display:flex;
flex-wrap: wrap;
gap:40px;
align-items: center;
  width: 100%;
justify-content: space-around;
background-color: ${(props) => props.theme.background};

`;
const StatsBoard = ({ expenses }) => {

    return (
        <StatsBoardContainer>
            <ExpenseBarChart expenses={expenses} />
        </StatsBoardContainer>
    );
};

export default StatsBoard;
