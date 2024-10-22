import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { selectBoard } from '../../redux/actions/boardActions';
import { fetchBoardPreferences } from '../../redux/actions/preferenceAction';
import { createBoard } from '../../utils/boardService';
import { Plus, X, ChevronRight } from 'lucide-react';
import BoardCollaborators from '../collaborator/BoardCollaborators';

const BoardContainer = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 100%; /* Ensures no content leaking */
  height: 100vh; /* Restricting container height */
  display: flex;
  flex-direction: column;
  margin: auto;

`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 2px solid #00A86B;
  padding-bottom: 0.5rem;
  text-align: center;
`;

const BoardListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #2a2a2a;
  border-radius: 5px;
  &::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: ${(props) => props.theme.scrollBarTrack};
  border-radius: 10px;
  
  
}

&::-webkit-scrollbar-thumb {
  background:#00A86B;
  border-radius: 10px;
  
}

&::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.scrollBarThumbHover || props.theme.scrollBarThumb};
  cursor: pointer;
}
`;

const BoardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-right: 10px;

`;

const BoardItem = styled.li`
  display: flex;
  align-items: center;
  background: #2a2a2a;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background: #00A86B;
    color: #fff;
    
  }

`;

const BoardImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
`;

const BoardName = styled.span`
width :70%;
  font-size: 1.1rem;
  font-weight: 500;
`;

const CreateBoardButton = styled.button`
  background: #00A86B;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  width: 100%;

  &:hover {
    background: #008080;
  }

  &:disabled {
    background: #4a4a4a;
    cursor: not-allowed;
  }
`;

const FormContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding:10px
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: #2a2a2a;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #00A86B;
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
`;

export default function BoardSelection({ boards, reloadBoards, userId }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleBoardChoice = (board) => {
    dispatch(fetchBoardPreferences(board.ExpenseBoardId, token));
    dispatch(selectBoard(board));
  };

  return (
    <BoardContainer>
      <Title>Select a Board</Title>

      <BoardListContainer>
        <BoardList>
          {boards.map((board) => (
            <BoardItem key={board.ExpenseBoardId} onClick={() => handleBoardChoice(board)}>
              <BoardImage src={board.ProfilePic || '/placeholder.svg?height=40&width=40'} alt="Board Profile" />
              <BoardName>{board.Name}</BoardName>
              <BoardCollaborators reloadBoards={reloadBoards} board={board }/>
              <ChevronRight size={20} />
            </BoardItem>
          ))}
        </BoardList>
      </BoardListContainer>

      {!showCreateForm && (
        <CreateBoardButton onClick={() => setShowCreateForm(true)}>
          <IconWrapper><Plus size={18} /></IconWrapper>
          Create New Board
        </CreateBoardButton>
      )}

      {showCreateForm && (
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
          <CreateBoardButton onClick={() => setShowCreateForm(false)}>
            <X size={18} />
          </CreateBoardButton>
        </FormContainer>
      )}
    </BoardContainer>
  );
}
