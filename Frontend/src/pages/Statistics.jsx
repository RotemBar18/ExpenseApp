import React from 'react';
import styled from 'styled-components';
import StatsBoard from '../components/StatsBoard';
import useAuth from '../hooks/useAuth';
import useExpenses from '../hooks/useExpenses';

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

`;



const Statistics = () => {
    const { user, preferences, userId } = useAuth();
    const { expenses} = useExpenses(userId);
  
   

    return (
        <PageContainer>
            <StatsBoard expenses={expenses} />
        </PageContainer>
    );
};
export default Statistics;