import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { updateUser } from '../utils/userService'; // Ensure this is correctly implemented to handle both name and profile picture updates
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux

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

const PersonalInfoSettings = ({ user }) => {
  const dispatch = useDispatch(); // Initialize the dispatch function


  const [isEditing, setIsEditing] = useState({
    Name: false,
    profilePic: false,
  });
  const [personalInfo, setPersonalInfo] = useState({
    Name: user.Name,
    profilePic: user.ProfilePic || 'default_profile_pic_url', // Fallback to default profile pic
  });

  // Update the component when the user changes
  useEffect(() => {
    setPersonalInfo({
      Name: user.Name,
      profilePic: user.ProfilePic,
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
        ...user, // Send all existing user data
        ...personalInfo, // Include any updated fields
      };

      const updatedUserFromServer = await updateUser(user.Id, updatedUserData);

      if (updatedUserFromServer) {
        setPersonalInfo({
          Name: updatedUserFromServer.Name || personalInfo.Name,
          profilePic: updatedUserFromServer.ProfilePic || personalInfo.profilePic,
        });
        dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedUserData });
        console.log('User updated successfully:', updatedUserFromServer);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      handleEditToggle(field); // Close the edit mode regardless of success
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setPersonalInfo((prevState) => ({
          ...prevState,
          profilePic: reader.result, // Display preview
        }));
      reader.readAsDataURL(file); // For preview; ideally, upload the file to the server directly
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
          {isEditing.Name ? (
            <>
              <InputField
                type="text"
                value={personalInfo.Name} // Display the current user's name
                onChange={(e) => handleInputChange('Name', e.target.value)}
                placeholder={user.Name} // Placeholder shows the current name
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
