import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import MainBoard from '../components/MainBoard';
import useBoards from '../hooks/useBoards'; 
import useAuth from '../hooks/useAuth';
import BoardSelection from '../components/BoardSelection'; 

const PageContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.background};
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MainPage = () => {
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const { userId } = useAuth();
  const { boards, reloadBoards } = useBoards(userId);
  const selectedPreferences = useSelector((state) => state.preferences);

  useEffect(() => {
    reloadBoards();
  }, [selectedBoard]);

  return (
    <PageContainer>
      {selectedBoard ? (
        <MainBoard
          categories={selectedPreferences.DefaultCategories}
          expensesThemeColor={selectedPreferences.ExpensesThemeColor}
          userId={userId}
          board={selectedBoard} 
        />
      ) : (
        <BoardSelection 
          boards={boards} 
          reloadBoards={reloadBoards}
          userId={userId} 
        />
      )}
    </PageContainer>
  );
};

export default MainPage;
