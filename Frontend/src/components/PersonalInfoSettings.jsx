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
    ProfilePic: false,
  });

  const [personalInfo, setPersonalInfo] = useState({
    Name: user.Name,
    ProfilePic: user.ProfilePic || 'default_profile_pic_url', // Fallback to default profile pic
  });

  // Update the component when the user changes
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
        ...user, // Send all existing user data
        ...personalInfo, // Include any updated fields
      };

      const updatedUserFromServer = await updateUser(user.Id, updatedUserData);

      if (updatedUserFromServer) {
        
        // Update the local state and Redux store with the new data
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
      handleEditToggle(field); // Close the edit mode regardless of success
    }
  };
  
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file); // Append the file
      formData.append('upload_preset', 'ProfilePics'); // Replace with your Cloudinary upload preset
  
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/expenses/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (response.ok) {
          setPersonalInfo((prevState) => ({
            ...prevState,
            ProfilePic: data.secure_url, // Use the returned URL for display
          }));
          
          // Optional: Update the user on the server with the new profile picture URL

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

      {/* Profile Picture Section */}
      <Section>
        <SectionLabel>Profile Picture</SectionLabel>
        <SectionValue>
          <ProfilePic
            src={personalInfo.ProfilePic} // Show current or default profile picture
            alt="Profile"
          />
          {isEditing.ProfilePic ? (
            <>
              <input type="file" onChange={handleProfilePicChange} />
              <SaveButton onClick={() => handleSave('ProfilePic')}>Save</SaveButton>
            </>
          ) : (
            <EditButton onClick={() => handleEditToggle('ProfilePic')}>Edit</EditButton>
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
