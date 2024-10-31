import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { selectBoard } from '../../redux/actions/boardActions';
import { fetchBoardPreferences } from '../../redux/actions/preferenceAction';
import { createBoard } from '../../utils/boardService';
import { Plus, ChevronRight, ChevronLeft, X, ChevronDown } from 'lucide-react';
import BoardCollaborators from '../collaborator/BoardCollaborators';
import { sendJoinBoardMessage } from '../../utils/websocketClient';
import useAuth from '../../hooks/useAuth';

const BoardContainer = styled.div`
  background: #f9f9f9;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  align-items: center;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary || '#4A90E2'};
  text-align: center;
  margin: 2rem 0;
`;

const BoardListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;

`;

const BoardItem = styled.div`
  display: flex;
  height:250px;
  flex-direction: column;
  background: #fff;
  min-width: 100%;
  max-width: 100%;
  transition: transform 0.3s ease;
cursor:pointer;
`;

const BoardHeader = styled.div`
display:flex;
gap:10px;
align-items: center;

`;
const BoardImage = styled.img`
width: 100px;
height: 100px;
padding: 20px;
border-radius: 50%;
margin-bottom: 1rem;
object-fit: cover;
`;

const BoardName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor || '#333'};
  margin-bottom: 0.5rem;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.primary || '#4A90E2'};
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  z-index: 10;
  font-size: 2rem;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const FloatingButton = styled.button`
  background: ${(props) => props.theme.primary || '#4A90E2'};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    background: ${(props) => props.theme.primaryHover || '#357ABD'};
  }
`;
const FormContainer = styled.div`
  z-index: 2500; /* Ensure it's on top of ModalOptionBack */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  max-width: 350px;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f0f0f0;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary || '#4A90E2'};
    background-color: #fff;
    box-shadow: 0 0 6px rgba(0, 122, 255, 0.2);
  }
`;

const CreateBoardButton = styled.button`
  background: ${(props) => props.theme.primary || '#4A90E2'};
  color: #ffffff;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background: ${(props) => props.theme.primaryHover || '#357ABD'};
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 122, 255, 0.3);
  }

  &:disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;
const ModalOptionBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity:0;
  z-index: 2000; /* Ensure it's on top of ModalOptionBack */
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function BoardSelection({ boards, reloadBoards, userId }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    console.log('here')
    const savedIndex = localStorage.getItem('currentIndex');
    if (savedIndex !== null) {
      setCurrentIndex(Number(savedIndex));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex);
  }, [currentIndex]);

  const handleCreateBoard = async () => {
    if (!boardName) return;
    setIsSubmitting(true);
    try {
      await createBoard(token, boardName, userId);
      setBoardName('');
      setShowCreateForm(false);
      reloadBoards();
    } catch (error) {
      console.error('Error creating board:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBoardChoice = async (board) => {
    try {
      await dispatch(fetchBoardPreferences(board.ExpenseBoardId, token));
      await dispatch(selectBoard(board));
      sendJoinBoardMessage(user, board);
    } catch (error) {
      console.error('Error handling board choice:', error);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < boards.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <BoardContainer>
      <Title>Select a Board</Title>
      <BoardListContainer>
        <ArrowButton direction="left" onClick={goToPrevious} disabled={currentIndex === 0}>
          <ChevronLeft />
        </ArrowButton>
        <BoardItem key={boards[currentIndex]?.ExpenseBoardId} onClick={() => handleBoardChoice(boards[currentIndex])}>
          <BoardHeader>
            <BoardImage src={boards[currentIndex]?.ProfilePic || '/placeholder.svg?height=40&width=40'} alt="Board Profile" />
            <BoardName>{boards[currentIndex]?.Name}</BoardName>
          </BoardHeader>
          {boards[currentIndex] && (<BoardCollaborators reloadBoards={reloadBoards} board={boards[currentIndex]} />)}
          <ChevronDown size={20} style={{alignSelf: 'center'}}/>
        </BoardItem>
        <ArrowButton direction="right" onClick={goToNext} disabled={currentIndex === boards.length - 1}>
          <ChevronRight />
        </ArrowButton>
      </BoardListContainer>

      {!showCreateForm && (
        <FloatingButton onClick={() => setShowCreateForm(true)}>
          <Plus size={18} />
        </FloatingButton>
      )}

      {showCreateForm && (
        <>
          <ModalOptionBack onClick={(e) => {
            e.stopPropagation();
            setShowCreateForm(false);
          }} />
          <FormContainer>
            <Input
              type="text"
              placeholder="Enter Board Name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            <CreateBoardButton disabled={isSubmitting} onClick={handleCreateBoard}>
              {isSubmitting ? 'Creating...' : 'Create'}
            </CreateBoardButton>
          </FormContainer>
        </>
      )}

    </BoardContainer>
  );
}
