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
import useExpenses from '../../hooks/useExpenses';
import BudgetModal from '../board/BudgetModal';

const BoardContainer = styled.div`
  background: #f9f9f9;
  color: #333;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
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

const BudgetSection = styled.div`
 display:flex;
 height:50px;
 flex-direction:column;
 justify-content:space-around;
 align-items: center;
`;

const BoardListContainer = styled.div`
 display:flex;
 justify-content:space-around;
 width:100%;
 align-items: center;
`;

const BoardItem = styled.div`
  display: flex;
  padding:10px;
  flex-direction: column;
  background: #fff;
  transition: transform 0.3s ease;
  cursor:pointer;
  width: 400px;
  border-radius: 20px;
  justify-content: space-between;
      &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground || '#fff'};
  }
  align-items: center;

`;
const DataSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction:column;

`;

const BoardHeader = styled.div`
display:flex;
gap:10px;
align-items: center;

`;
const BoardImage = styled.img`
width: 100px;
padding:10px;
height: 100px;
border-radius: 50%;
margin-bottom: 1rem;
object-fit: cover;
`;

const BoardTextInfo = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.textColor || '#333'};
  margin-bottom: 0.5rem;
  display:flex;
  flex-direction:column;
`;
const BoardName = styled.span`
`;
const BoardBudget = styled.span`
`;

const Text = styled.span`
padding-left:10px;

`;
const ArrowButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.primary || '#4A90E2'};
  cursor: pointer;
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

const NoBoardsMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${(props) => props.theme.textColor || '#333'};
  margin-top: 20px;
`;
export default function BoardSelection({ boards, reloadBoards, userId }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { expenses } = useExpenses({ board: boards[currentIndex] || {} });
  useEffect(() => {
    const savedIndex = localStorage.getItem('currentIndex');
    if (savedIndex !== null) {
      setCurrentIndex(Number(savedIndex));
    }
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex);
  }, [currentIndex]);

  const handleCreateBoard = async () => {
    if (!boardName) return;
    setIsSubmitting(true);
    try {
      await createBoard(token, boardName, userId);
      setBoardName('');
      setCurrentIndex(boards.length)
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
      {boards.length === 0 ? (
        <NoBoardsMessage>
          No boards available. Click below to add a new board.
        </NoBoardsMessage>) : (
        <>
          <Title>Select a Board</Title>

          <BoardListContainer>

            <ArrowButton direction="left" onClick={goToPrevious} disabled={currentIndex === 0}>
              <ChevronLeft />
            </ArrowButton>




            <BoardItem key={boards[currentIndex]?.ExpenseBoardId} onClick={() => handleBoardChoice(boards[currentIndex])}>
              <DataSection>
                  <BoardHeader>
                    <BoardImage src={boards[currentIndex]?.ProfilePic || '/placeholder.svg?height=40&width=40'} alt="Board Profile" />
                    <BoardTextInfo>
                      <BoardName>{boards[currentIndex]?.Name}</BoardName>
                      <BoardBudget>Budget: ${boards[currentIndex]?.Budget}</BoardBudget>
                      <BudgetSection>
                        <BudgetModal type={'boardSelection'} board={boards[currentIndex]} expenses={expenses} />
                      </BudgetSection>
                    </BoardTextInfo>

                  </BoardHeader>
                  <Text>Collaborators:</Text>
                  {boards[currentIndex] &&  (<BoardCollaborators reloadBoards={reloadBoards} currentIndex={currentIndex} board={boards[currentIndex]} />)}
              </DataSection>
              <DataSection>

                <ChevronDown size={20} style={{ alignSelf: 'center' }} />
              </DataSection>
            </BoardItem>

            <ArrowButton direction="right" onClick={goToNext} disabled={currentIndex === boards.length - 1}>
              <ChevronRight />
            </ArrowButton>

          </BoardListContainer>
        </>

      )
      }
      {
        !showCreateForm && (
          <FloatingButton onClick={() => setShowCreateForm(true)}>
            <Plus size={18} />
          </FloatingButton>
        )
      }

      {
        showCreateForm && (
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
        )
      }

    </BoardContainer >
  );
}
