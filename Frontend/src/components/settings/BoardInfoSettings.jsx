import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { updateBoard } from '../../utils/boardService';
import { useDispatch } from 'react-redux';
import { selectBoard } from '../../redux/actions/boardActions';
import useAuth from '../../hooks/useAuth';
import BoardCollaborators from '../collaborator/BoardCollaborators';

const BoardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${(props) => props.theme.modalTextColor};
  padding: 0 20px;`
;

const Section = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.border};`
;

const SectionLabel = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.headerTextColor};`
;

const SectionValue = styled.div`
  color: #555;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;`
;

const EditButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.buttonBackground};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }`
;

const InputField = styled.input`
  padding: 5px;
  margin: 5px 0;
  width: 20%;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 4px;
  font-size: 14px;`
;

const SaveButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }`
;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;`
;

const BoardInfoSettings = ({ user, board }) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState({
    Name: false,
    ProfilePic: false,
  });

  const [boardInfo, setBoardInfo] = useState({
    Name: board.Name,
    ProfilePic: board.ProfilePic || 'default_profile_pic_url',
  });

  useEffect(() => {
    setBoardInfo({
      Name: board.Name,
      ProfilePic: board.ProfilePic,
    });
  }, [board]);

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setBoardInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBoardInfo((prevState) => ({
          ...prevState,
          ProfilePic: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (field) => {
    try {
      const updatedBoardData = {
        ...board,
        ...boardInfo,
      };

      const updatedBoardFromServer = await updateBoard(board.ExpenseBoardId, updatedBoardData);
      const updatedBoard = updatedBoardFromServer.updatedBoard;
      if (updatedBoard) {
        setBoardInfo({
          Name: updatedBoard.Name || boardInfo.Name,
          ProfilePic: updatedBoard.ProfilePic || boardInfo.ProfilePic,
        });

        dispatch(selectBoard(updatedBoard));
      } else {
        console.error('Failed to update board');
      }
    } catch (error) {
      console.error('Error updating board:', error);
    } finally {
      handleEditToggle(field);
    }
  };

  return (
    <BoardInfoContainer>
      <Section>
        <SectionLabel>Profile Picture</SectionLabel>
        <SectionValue>
          <ProfilePic src={boardInfo.ProfilePic} alt="Profile" />
          {isEditing.ProfilePic ? (
            <>
              <InputField
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <SaveButton onClick={() => handleSave('ProfilePic')}>
                Save
              </SaveButton>
            </>
          ) : (
            <EditButton onClick={() => handleEditToggle('ProfilePic')}>
              Edit
            </EditButton>
          )}
        </SectionValue>
      </Section>

      <Section>
        <SectionLabel>Name</SectionLabel>
        <SectionValue>
          {isEditing.Name ? (
            <>
              <InputField
                type="text"
                value={boardInfo.Name}
                onChange={(e) => handleInputChange('Name', e.target.value)}
                placeholder={board.Name}
              />
              <SaveButton onClick={() => handleSave('Name')}>Save</SaveButton>
            </>
          ) : (
            <>
              {boardInfo.Name}
              <EditButton onClick={() => handleEditToggle('Name')}>Edit</EditButton>
            </>
          )}
        </SectionValue>
      </Section>

      <BoardCollaborators board={board}  />
    </BoardInfoContainer>
  );
};

export default BoardInfoSettings;