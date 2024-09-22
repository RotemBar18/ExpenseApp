import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import StatsBoard from '../components/StatsBoard';
import useAuth from '../hooks/useAuth';
import useExpenses from '../hooks/useExpenses';

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

`;



const Statistics = () => {
    const { user, preferences, userId } = useAuth(); // Use the custom hook to get user and preferences
    const { expenses} = useExpenses(userId);
  
   

    return (
        <PageContainer>
            <Navbar user={user} expenses={expenses} preferences={preferences} />
            <StatsBoard expenses={expenses} />
        </PageContainer>
    );
};
export default Statistics;