import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { updateUser } from '../utils/userService';

const PersonalInfoContainer = styled.div`
  padding-left: 10px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  width: 80ch;
  display: flex;
  gap: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dddddd;
`;

const SectionLabel = styled.div`
  font-weight: bold;
`;

const SectionValue = styled.div`
  color: #555;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const InputField = styled.input`
  padding: 5px;
  margin: 5px 0;
  width: 60%;
`;

const SaveButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const PersonalInfoSettings = ({user}) => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    profilePic: false,
  });
  const [personalInfo, setPersonalInfo] = useState({
    name: user.name,
    profilePic: user.profilePic || 'default_profile_pic_url', // Fallback to default profile pic
  });

  useEffect(() => {
    console.log('User state has been updated:', user);
  }, [user]);

  const handleEditToggle = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleInputChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleSave = (field) => {
    handleUserUpdate({ [field]: personalInfo[field] });
    handleEditToggle(field);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPersonalInfo({ ...personalInfo, profilePic: reader.result });
      reader.readAsDataURL(file); // You might need to upload the file instead of converting it to base64.
    }
  };

  const handleUserUpdate = async (updatedUser) => {
    console.log('User to update:', user.Id);
    try {
      const updatedUserData = {
        name: updatedUser.name || personalInfo.name, // Use updated name or fallback to current value
        profilePic: updatedUser.profilePic || personalInfo.profilePic, // Use updated profile pic or fallback to current value
      };

      const updatedUserFromServer = await updateUser(user.Id, updatedUserData);

      if (updatedUserFromServer) {
        setUser((prevUser) => ({
          ...prevUser,
          name: updatedUserFromServer.name || prevUser.name, // Fallback to existing values if something is missing
          profilePic: updatedUserFromServer.profilePic || prevUser.profilePic,
        }));
        console.log('User updated successfully');
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <PersonalInfoContainer>
      <h2>Personal Info</h2>

      {/* Profile Picture Section */}
      <Section>
        <SectionLabel>Profile Picture</SectionLabel>
        <SectionValue>
          <ProfilePic
            src={personalInfo.profilePic} // Show current or default profile picture
            alt="Profile"
          />
          {isEditing.profilePic ? (
            <>
              <input type="file" onChange={handleProfilePicChange} />
              <SaveButton onClick={() => handleSave('profilePic')}>Save</SaveButton>
            </>
          ) : (
            <EditButton onClick={() => handleEditToggle('profilePic')}>Edit</EditButton>
          )}
        </SectionValue>
      </Section>

      {/* Name Section */}
      <Section>
        <SectionLabel>Name</SectionLabel>
        <SectionValue>
          {isEditing.name ? (
            <>
              <InputField
                type="text"
                value={personalInfo.name} // Display the current user's name
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={user.Name} // Placeholder shows the current name
              />
              <SaveButton onClick={() => handleSave('name')}>Save</SaveButton>
            </>
          ) : (
            <>
              {personalInfo.name}
              <EditButton onClick={() => handleEditToggle('name')}>Edit</EditButton>
            </>
          )}
        </SectionValue>
      </Section>
    </PersonalInfoContainer>
  );
};

export default PersonalInfoSettings;
