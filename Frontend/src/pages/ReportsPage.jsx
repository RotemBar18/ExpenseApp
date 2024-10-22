import React from 'react';
import styled from 'styled-components';
import ReportsBoard from '../components/mainBoards/ReportsBoard'
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background}; 
`;


const ReportsPage = () => {

  return (
    <PageContainer>
      <ReportsBoard />
    </PageContainer>
  );
};

export default ReportsPage;
