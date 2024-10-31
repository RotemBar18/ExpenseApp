import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addBoardCollaborator, removeBoardCollaborator } from '../../utils/boardMembersService';
import { deleteBoard } from '../../utils/boardService';
import { clearPreferences } from '../../redux/actions/preferenceAction';
import { clearBoard } from '../../redux/actions/boardActions';
import useAuth from '../../hooks/useAuth';
import AddCollaborator from './AddCollaborator';
import CollaboratorCard from './CollaboratorCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendRemoveCollaboratorMessage, sendAddCollaboratorMessage } from '../../utils/websocketClient';
import useCollaborators from '../../hooks/useCollaborators';

const CollaboratorsContainer = styled.div`
  display: flex;
  flex-grow: 0;
  overflow: hidden;
  padding: 10px 0;
  align-items: center;
  padding-left:10px;
  justify-content: center;
`;

const CollaboratorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transform: ${({ index }) => `translateX(${index * -50}%)`};
`;

const CollaboratorImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${(props) => (props.selectedBoard ? props.theme.border : '#00A86B')};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;

const AddCollaboratorButton = styled.button`
  background: #333333;
  color: #666666;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.5;
  transform: ${({ collaboratorsLength }) => `translateX(${collaboratorsLength * -50}%)`};
  transition: all 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    background: #ffffff;
    border: 1px solid #aaaaaa;
    transform: ${({ collaboratorsLength }) => `translateX(${collaboratorsLength * -50}%)` } scale(1.2);
  }
`;

export default function BoardCollaborators({ board, reloadBoards }) {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { collaborators, reloadCollaborators, loading } = useCollaborators({ board });
  const [showAddCollaborator, setShowAddCollaborator] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);

  useEffect(() => {
    reloadCollaborators(board.ExpenseBoardId);
  }, [board.ExpenseBoardId]);

  const handleAddCollaborator = async (user,selectedUser,board) => {
    try {
      await addBoardCollaborator(token, selectedUser.Id, board.ExpenseBoardId);
      sendAddCollaboratorMessage(user, selectedUser, board);
      reloadCollaborators(board.ExpenseBoardId);
    } catch (error) {
      console.error('Error adding collaborator:', error);
    }
  };

  const handleRemoveCollaborator = async (collaborator) => {
    try {
      await removeBoardCollaborator(token, collaborator.UserId, board.ExpenseBoardId);
      if (collaborators.length - 1 === 0) {
        await deleteBoard(board.ExpenseBoardId, token);
        if (reloadBoards) reloadBoards();
      }
      if (collaborator.UserId === user.Id) handleBackClick();
      sendRemoveCollaboratorMessage(user, collaborator, board);
      reloadCollaborators(board.ExpenseBoardId);
    } catch (error) {
      console.error('Error removing collaborator:', error);
    }
  };

  const handleBackClick = () => {
    dispatch(clearPreferences());
    dispatch(clearBoard());
    navigate('/main');
  };

  const handleCollaboratorClick = (collaborator) => {
    setSelectedCollaborator(collaborator);
  };

  const closeCollaboratorModal = () => {
    setSelectedCollaborator(null);
  };


  return (
    <>
      <CollaboratorsContainer onClick={(e) => e.stopPropagation()}>
        {collaborators.map((collaborator, index) => (
          <CollaboratorItem
            key={collaborator.UserId}
            index={index}
            onClick={() => handleCollaboratorClick(collaborator)}
          >
            <CollaboratorImage
              selectedBoard={board}
              src={collaborator.ProfilePic || '/default_profile.png'}
              alt={collaborator.Name}
            />
          </CollaboratorItem>
        ))}

        <CollaboratorItem>
          <AddCollaboratorButton
            onClick={() => setShowAddCollaborator(true)}
            collaboratorsLength={collaborators.length}
          >
            +
          </AddCollaboratorButton>
        </CollaboratorItem>
      </CollaboratorsContainer>

      {showAddCollaborator && (
        <AddCollaborator
          board={board}
          user={user}
          closeModal={() => setShowAddCollaborator(false)}
          onCollaboratorAdded={handleAddCollaborator}
        />
      )}

      {selectedCollaborator && (
        <CollaboratorCard
          board={board}
          collaborator={selectedCollaborator}
          onRemove={handleRemoveCollaborator}
          onClose={closeCollaboratorModal}
        />
      )}
    </>
  );
}
