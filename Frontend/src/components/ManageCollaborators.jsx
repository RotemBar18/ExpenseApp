import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchCollaborators, addBoardCollaborator, removeBoardCollaborator } from '../utils/boardMembersService';
import { fetchUsers } from '../utils/userService';
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

const AddCollaboratorInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  width: 200px;
`;

const AddButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border: 1px solid #ddd;
  width: 300px;
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  font-size: 0.9em;
  
  &:hover {
    background-color: #eee;
  }
`;

const ProfilePic = styled.img`
  width: 30px; 
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ManageCollaborators = ({ board, user }) => {
  const { token } = useAuth();
  const [collaborators, setCollaborators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers(token);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const loadCollaborators = async () => {
      try {
        const boardCollaborators = await fetchCollaborators(token, board.ExpenseBoardId);
        setCollaborators(boardCollaborators);
      } catch (error) {
        console.error('Error fetching collaborators:', error);
      }
    };

    fetchAllUsers();
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

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filteredResults = users.filter((user) =>
        user.Name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleUserSelect = (userId, userName) => {
    setSelectedUserId(userId);
    setSearchTerm(userName);
    setSearchResults([]);
  };

  const handleAddCollaborator = async () => {
    try {
      if (selectedUserId) {
        await addBoardCollaborator(token, selectedUserId, board.ExpenseBoardId);
        setSearchTerm('');
        setSelectedUserId(null);
        refreshCollaborators();  // Refresh collaborators list
      }
    } catch (error) {
      console.error('Error adding collaborator:', error);
    }
  };

  const handleRemoveCollaborator = async (collaborator) => {
    try {
      await removeBoardCollaborator(token, collaborator.UserId, board.ExpenseBoardId);
      refreshCollaborators();  // Refresh collaborators list
    } catch (error) {
      console.error('Error removing collaborator:', error);
    }
  };

  return (
    <CollaboratorsContainer>
      <h3>Collaborators</h3>

      <AddCollaboratorInput
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search user by name"
      />

      {searchResults.length > 0 && (
        <SuggestionsList>
          {searchResults.map((user) => (
            <SuggestionItem
              key={user.Id}
              onClick={() => handleUserSelect(user.Id, user.Name)}
            >
              <ProfilePic src={user.ProfilePic || 'default_profile_pic_url'} alt="Profile" />
              {user.Name}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}

      <AddButton onClick={handleAddCollaborator}>Add Collaborator</AddButton>

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
