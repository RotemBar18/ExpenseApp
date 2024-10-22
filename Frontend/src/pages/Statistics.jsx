import React from 'react';
import styled from 'styled-components';
import StatsBoard from '../components/mainBoards/StatsBoard';
import useAuth from '../hooks/useAuth';
import useExpenses from '../hooks/useExpenses';
import { useSelector } from 'react-redux';

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height:100%;
  overflow-y:auto;
background-color: ${(props) => props.theme.background};
&::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: ${(props) => props.theme.scrollBarTrack};
  border-radius: 10px;
  
  
}

&::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollBarThumb};
  border-radius: 10px;
  
}

&::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.scrollBarThumbHover || props.theme.scrollBarThumb};
  cursor: pointer;
}
`;



const Statistics = () => {
  const { userId } = useAuth();
  const board = useSelector((state) => state.board.selectedBoard); 
  const { expenses, updateExpense, deleteExpense, reloadExpenses } = useExpenses({
    boardId: board?.ExpenseBoardId, 
    userId
  });


  return (
    <PageContainer>
      <StatsBoard expenses={expenses} />
    </PageContainer>
  );
};
export default Statistics;