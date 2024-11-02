import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchUsers } from '../../utils/userService';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.selectedBoard ? props.theme.modalBackground : '#ffffff'};
  padding: 20px 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 450px;
  z-index: 1001;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  color: ${(props) =>
    props.selectedBoard ? props.theme.modalTextColor : '#333'};
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) =>
    props.selectedBoard ? props.theme.closeButtonColor : '#999'};
  cursor: pointer;

  &:hover {
    color: ${(props) =>
    props.selectedBoard ? props.theme.closeButtonHoverColor : '#000'};
  }
`;

const UserBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  width: 100%;
  align-items: center;
`;

const AddCollaboratorInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid
    ${(props) => (props.selectedBoard ? props.theme.inputBorderColor : '#ddd')};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
    props.selectedBoard ? props.theme.inputFocusBorderColor : '#007bff'};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }
`;

const SelectedUser = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: ${(props) =>
    props.selectedBoard ? props.theme.buttonBackground : '#007bff'};
  color: ${(props) =>
    props.selectedBoard ? props.theme.buttonTextColor : '#ffffff'};
  border: none;
  padding: 12px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${(props) =>
    props.selectedBoard ? props.theme.buttonHoverBackground : '#0056b3'};
    transform: scale(0.98);
  }
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  background: ${(props) =>
    props.selectedBoard ? props.theme.suggestionsBackground : '#f8f9fa'};
  border: 1px solid
    ${(props) => (props.selectedBoard ? props.theme.suggestionsBorder : '#ddd')};
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  font-size: 0.95em;
  color: ${(props) =>
    props.selectedBoard ? props.theme.suggestionTextColor : '#333'};

  &:hover {
    background-color: ${(props) =>
    props.selectedBoard ? props.theme.suggestionHoverBackground : '#e9ecef'};
  }
`;

const ProfilePic = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AddCollaboratorModal = ({ board, onCollaboratorAdded, closeModal }) => {
  const { token } = useAuth();
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const { user } = useAuth()
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers(token);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSearchChange = async (e) => {
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

  const handleUserSelect = (user) => {
    console.log(user)
    setSelectedUser(user);
    setSearchTerm(user.Name);
    setSearchResults([]);
  };

  const handleAddCollaborator = async () => {
    console.log(selectedUser)
    try {
      if (selectedUser) {
        onCollaboratorAdded(user,selectedUser,board);
        setSearchTerm('');
        setSelectedUser(null);
        closeModal();
      }
    } catch (error) {
      console.error('Error adding collaborator:', error);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    closeModal();
  };


  return (
    <Overlay onClick={handleClose} >
      <ModalContainer selectedBoard={selectedBoard} onClick={(e) => e.stopPropagation()}>
        <ModalHeader >
          <Title selectedBoard={selectedBoard}>Add Collaborator</Title>
          <CloseButton selectedBoard={selectedBoard} onClick={closeModal}>&times;</CloseButton>
        </ModalHeader>
        <UserBox>
          <AddCollaboratorInput
            selectedBoard={selectedBoard}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search user by name"
          />
          {selectedUser && (
            <SelectedUser>
              <ProfilePic src={selectedUser.ProfilePic || 'default_profile_pic_url'} alt="Profile" />
              {selectedUser.Name}
            </SelectedUser>
          )}
        </UserBox>

        {searchResults.length > 0 && (
          <SuggestionsList selectedBoard={selectedBoard}>
            {searchResults.map((user) => (
              <SuggestionItem selectedBoard={selectedBoard} key={user.Id} onClick={() => handleUserSelect(user)}>
                <ProfilePic src={user.ProfilePic || 'default_profile_pic_url'} alt="Profile" />
                {user.Name}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}

        <AddButton selectedBoard={selectedBoard} onClick={handleAddCollaborator}>Add Collaborator</AddButton>
      </ModalContainer>
    </Overlay>
  );
};

export default AddCollaboratorModal;
