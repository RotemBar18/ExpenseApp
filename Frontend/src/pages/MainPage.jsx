import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MainBoard from '../components/mainBoards/MainBoard';
import useBoards from '../hooks/useBoards';
import useAuth from '../hooks/useAuth';
import BoardSelection from '../components/mainBoards/BoardSelection';
import useAutoLogout from '../hooks/useAutoLogout';
import InactivityModal from '../components/InactivityModal';


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
  const { showModal, handleCloseModal } = useAutoLogout();

  useEffect(() => {
    reloadBoards();
  }, [selectedBoard, showModal]);
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
      {showModal && <InactivityModal onClose={handleCloseModal} />}

    </PageContainer>
  );
};

export default MainPage;
