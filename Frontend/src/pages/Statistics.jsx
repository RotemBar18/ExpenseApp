import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import StatsBoard from '../components/StatsBoard';
import { useLocation } from 'react-router-dom';

const PageContainer = styled.div`
    width:100%;
    background-color:#0a0a0a;
    position:fixed;
    top:0;
    left:0;
    height:100%;
    color:#bbbbbb;
`;


const Statistics = () => {
    const location = useLocation();
    const expenses = location.state?.expenses || [];
    const preferences = location.state?.preferences || {};
    const user = location.state?.user || {};
    console.log(expenses)
    console.log(preferences)
    console.log(user)

    return (
        <PageContainer>
            <Navbar user={user}  expenses={expenses} preferences={preferences} />
            <StatsBoard expenses={expenses} />
        </PageContainer>
    );
};
export default Statistics;