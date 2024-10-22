import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchUsers } from '../utils/userService';
import { addBoardCollaborator } from '../utils/boardMembersService';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.selectedBoard ? props.theme.modalBackground : '#333'};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 400px;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  color: ${(props) =>
    props.selectedBoard ? props.theme.modalTextColor : '#fff'};
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) =>
    props.selectedBoard ? props.theme.closeButtonColor : '#aaa'};
  cursor: pointer;

  &:hover {
    color: ${(props) =>
      props.selectedBoard ? props.theme.closeButtonHoverColor : '#fff'};
  }
`;

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddCollaboratorInput = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  width: 40%;
  border: 1px solid
    ${(props) => (props.selectedBoard ? props.theme.inputBorderColor : '#555')};
  border-radius: 4px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.selectedBoard ? props.theme.inputFocusBorderColor : '#007bff'};
  }
`;

const SelectedUser = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`;

const AddButton = styled.button`
  background-color: ${(props) =>
    props.selectedBoard ? props.theme.buttonBackground : '#00A86B'};
  color: ${(props) =>
    props.selectedBoard ? props.theme.buttonTextColor : '#fff'};
  border: none;
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background-color: ${(props) =>
      props.selectedBoard ? props.theme.buttonHoverBackground : '#22cc88'};
      transform: scale(0.95);
  }

`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: ${(props) =>
    props.selectedBoard ? props.theme.suggestionsBackground : '#444'};
  border: 1px solid
    ${(props) => (props.selectedBoard ? props.theme.suggestionsBorder : '#555')};
  border-radius: 4px;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  margin-bottom:10px;
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  font-size: 0.85em;
  color: ${(props) =>
    props.selectedBoard ? props.theme.suggestionTextColor : '#fff'};

  &:hover {
    background-color: ${(props) =>
      props.selectedBoard ? props.theme.suggestionHoverBackground : '#555'};
  }
`;

const ProfilePic = styled.img`
  width: 20px;
  height: 20px;
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
        setSelectedUser(user);
        setSearchTerm(user.Name);
        setSearchResults([]);
    };

    const handleAddCollaborator = async () => {
        try {
            if (selectedUser) {
                await addBoardCollaborator(token, selectedUser.Id, board.ExpenseBoardId);
                setSearchTerm('');
                setSelectedUser(null);
                onCollaboratorAdded();
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
                    <CloseButton  selectedBoard={selectedBoard} onClick={closeModal}>&times;</CloseButton>
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
