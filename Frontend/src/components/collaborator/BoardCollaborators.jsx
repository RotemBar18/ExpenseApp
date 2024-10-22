import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchCollaborators, removeBoardCollaborator } from '../../utils/boardMembersService'; 
import { deleteBoard } from '../../utils/boardService'; 
import useAuth from '../../hooks/useAuth';
import AddCollaborator from './AddCollaborator';
import CollaboratorCard from './CollaboratorCard';
import { useSelector } from 'react-redux';

const CollaboratorsContainer = styled.div`
  display: flex;
  flex-grow: 0;  /* Prevent growing to the full container width */
  overflow: hidden; /* Prevent content spilling outside */
  padding: 10px 0;
  align-items: center;
  width: 20%;
  padding-left:10px;

`;

const CollaboratorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transform: ${({ index }) => `translateX(${index * -50}%)`}; /* Dynamic translateX based on index */
`;

const CollaboratorImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${(props) => (props.selectedBoard ? props.theme.border : '#00A86B')};
  transition: transform 0.3s ease; /* Smooth transition */
  
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
  transition: all 0.3s ease, transform 0.3s ease; /* Smooth transition for size and opacity */

  &:hover {
    opacity: 1;
    background: #dddddd;
    border: 1px solid #bbbbbb;
    transform: ${({ collaboratorsLength }) => `translateX(${collaboratorsLength * -50}%)`} scale(1.3); /* Scale the button by 1.3 on hover */
  }
`;

export default function BoardCollaborators({ board, reloadBoards }) {
  const { token, user } = useAuth();
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const [collaborators, setCollaborators] = useState([]);
  const [showAddCollaborator, setShowAddCollaborator] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null); 

  useEffect(() => {
    const loadCollaborators = async () => {
      try {
        const boardCollaborators = await fetchCollaborators(token, board.ExpenseBoardId);
        setCollaborators(boardCollaborators);
      } catch (error) {
        console.error('Error fetching collaborators:', error);
      }
    };

    loadCollaborators();
  }, [board.ExpenseBoardId, token]);

  const refreshCollaborators = async () => {
    try {
      const boardCollaborators = await fetchCollaborators(token, board.ExpenseBoardId);
      setCollaborators(boardCollaborators);
    } catch (error) {
      console.error('Error refreshing collaborators:', error);
    }
    if (reloadBoards) {
      reloadBoards();
    }
  };

  const handleRemoveCollaborator = async (collaborator) => {
    try {
      await removeBoardCollaborator(token, collaborator.UserId, board.ExpenseBoardId);
      setCollaborators((prevCollaborators) =>
        prevCollaborators.filter((col) => col.UserId !== collaborator.UserId)
      );

      if (collaborators.length - 1 === 0) {
        await deleteBoard(board.ExpenseBoardId, token);
      }
      if (reloadBoards) {
        reloadBoards();
      }
    } catch (error) {
      console.error('Error removing collaborator or deleting board:', error);
    }
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
              selectedBoard={selectedBoard}
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
          onCollaboratorAdded={refreshCollaborators}
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
