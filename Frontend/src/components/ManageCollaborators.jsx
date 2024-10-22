import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchCollaborators, removeBoardCollaborator } from '../utils/boardMembersService';
import AddCollaborator from './AddCollaborator'; 
import useAuth from '../hooks/useAuth';

const CollaboratorsContainer = styled.div`
  margin-top: 20px;
`;

const CollaboratorsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CollaboratorItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 30;
  padding: 5px 0;
`;

const CollaboratorInfo = styled.li`
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: darkred;
  }
`;

const ProfilePic = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ManageCollaborators = ({ board }) => {
  const { token, user } = useAuth();
  const [collaborators, setCollaborators] = useState([]);

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
  };

  const handleRemoveCollaborator = async (collaborator) => {
    try {
      await removeBoardCollaborator(token, collaborator.UserId, board.ExpenseBoardId);
      refreshCollaborators(); 
    } catch (error) {
      console.error('Error removing collaborator:', error);
    }
  };

  return (
    <CollaboratorsContainer>
      <AddCollaborator board={board} onCollaboratorAdded={refreshCollaborators} />

      <CollaboratorsList>
        {collaborators.map((collaborator) => (
          <CollaboratorItem key={collaborator.UserId}>
            <CollaboratorInfo>
              <ProfilePic src={collaborator.ProfilePic || 'default_profile_pic_url'} alt="Profile" />
              <span>{collaborator.Name}</span>
            </CollaboratorInfo >

            {collaborator.UserId !== user.Id && (
              <RemoveButton onClick={() => handleRemoveCollaborator(collaborator)}>
                Remove
              </RemoveButton>
            )}
          </CollaboratorItem>
        ))}
      </CollaboratorsList>
    </CollaboratorsContainer>
  );
};

export default ManageCollaborators;
