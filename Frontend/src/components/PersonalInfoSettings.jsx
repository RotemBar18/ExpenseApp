import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { updateUser } from '../utils/userService'; 
import { useDispatch } from 'react-redux';

const PersonalInfoContainer = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.modalTextColor};
`;

const Section = styled.div`
  margin-bottom: 20px;
  width: 80ch;
  display: flex;
  flex-direction:column;
  gap: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.border};  
`;

const SectionLabel = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.headerTextColor};
`;

const SectionValue = styled.div`
  color: #555;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.buttonBackground};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const InputField = styled.input`
  padding: 5px;
  margin: 5px 0;
  width: 20%;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 4px;
  font-size: 14px;
`;

const SaveButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const PersonalInfoSettings = ({ user }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState({
    Name: false,
    ProfilePic: false,
  });

  const [personalInfo, setPersonalInfo] = useState({
    Name: user.Name,
    ProfilePic: user.ProfilePic || 'default_profile_pic_url',  
  });

  useEffect(() => {
    setPersonalInfo({
      Name: user.Name,
      ProfilePic: user.ProfilePic,
    });
  }, [user]);

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = async (field) => {
    try {
      const updatedUserData = {
        ...user,
        ...personalInfo, 
      };

      const updatedUserFromServer = await updateUser(user.Id, updatedUserData);

      if (updatedUserFromServer) {

        setPersonalInfo({
          Name: updatedUserFromServer.Name || personalInfo.Name,
          ProfilePic: updatedUserFromServer.ProfilePic || personalInfo.ProfilePic,
        });
        dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedUserFromServer });
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      handleEditToggle(field);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ProfilePics'); 

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/expenses/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setPersonalInfo((prevState) => ({
            ...prevState,
            ProfilePic: data.secure_url,
          }));

         

        } else {
          console.error('Error uploading to Cloudinary:', data.error.message);
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <PersonalInfoContainer>
      <h2>Personal Info</h2>

      <Section>
        <SectionLabel>Profile Picture</SectionLabel>
        <SectionValue>
          <ProfilePic
            src={personalInfo.ProfilePic}
            alt="Profile"
          />
          {isEditing.ProfilePic ? (
            <>
              <InputField style={{border:'none'}} type="file" onChange={handleProfilePicChange} />
              <SaveButton onClick={() => handleSave('ProfilePic')}>Save</SaveButton>
            </>
          ) : (
            <EditButton onClick={() => handleEditToggle('ProfilePic')}>Edit</EditButton>
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
                value={personalInfo.Name}
                onChange={(e) => handleInputChange('Name', e.target.value)}
                placeholder={user.Name}
              />
              <SaveButton onClick={() => handleSave('Name')}>Save</SaveButton>
            </>
          ) : (
            <>
              {personalInfo.Name}
              <EditButton onClick={() => handleEditToggle('Name')}>Edit</EditButton>
            </>
          )}
        </SectionValue>
      </Section>
    </PersonalInfoContainer>
  );
};

export default PersonalInfoSettings;
