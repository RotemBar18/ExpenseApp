import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard } from '../redux/actions/boardActions'; 
import { fetchBoardPreferences } from '../redux/actions/preferenceAction'; 
import MainBoard from '../components/MainBoard';
import useBoards from '../hooks/useBoards'; 
import useAuth from '../hooks/useAuth';
import { createBoard } from '../utils/boardService'; 

const PageContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.background};
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  width: 100%;
  height: 100%;
`;

const BoardItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const BoardImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CreateBoardButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const FormContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 5px;
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const { userId } = useAuth();
  const { boards, reloadBoards } = useBoards(userId);
  const token = localStorage.getItem('token');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [boardName, setBoardName] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    reloadBoards();
  }, [selectedBoard]);

  const handleCreateBoard = async () => {
    if (!boardName) return;
    setIsSubmitting(true);
    try {
      const board = await createBoard(token, boardName, userId);
      setBoardName(''); 
      setShowCreateForm(false);
      reloadBoards(); 
    } catch (error) {
      console.error('Error creating board:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBoardChoice = (board) => {
    const token = localStorage.getItem('token');
    
    dispatch(fetchBoardPreferences(board.ExpenseBoardId, token)); 
    dispatch(selectBoard(board)); 
  };

  const selectedPreferences = useSelector((state) => state.preferences);
  
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
        <BoardList>
          <h3>Select a Board:</h3>
          {boards.map((board) => (
            <BoardItem key={board.ExpenseBoardId} onClick={() => handleBoardChoice(board)}>
              <BoardImage src={board.ProfilePic || 'default_profile_pic_url'} alt="Board Profile" />
              {board.Name}
            </BoardItem>
          ))}

          <CreateBoardButton onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? 'Cancel' : 'Create New Board'}
          </CreateBoardButton>

          {showCreateForm && (
            <FormContainer>
              <Input
                type="text"
                placeholder="Enter Board Name"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
              <CreateBoardButton disabled={isSubmitting} onClick={handleCreateBoard}>
                {isSubmitting ? 'Creating...' : 'Create Board'}
              </CreateBoardButton>
            </FormContainer>
          )}
        </BoardList>
      )}
    </PageContainer>
  );
};

export default MainPage;
