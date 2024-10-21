import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';  
import BoardInfoSettings from './BoardInfoSettings';  // Component for managing board-related settings
import LoginAndSecuritySettings from './LoginAndSecuritySettings';  // Component for managing user login and security settings
import CustomizationSettings from './CustomizationSettings';  // Component for managing customization options for the board
import UserInfoSettings from './UserInfoSettings';  // Component for managing user info (if needed)

// Container for the whole settings page
const SettingBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background};  // Apply background color from theme
`;

// Container for the header section (title and navigation between settings)
const HeaderContainer = styled.div``;

// Styled title for the settings page
const Title = styled.h1`
  padding: 20px 20px;
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.headerTextColor};  // Color for title from theme
`;

// Container for the different options in the settings header (like Personal Info, Customization, etc.)
const HeaderChoices = styled.div`
  display: flex;
  padding: 0 20px;
`;

// Container for the actual settings content
const SettingsContainer = styled.div`
  overflow-y: auto; 
`;

// Styled text for each setting option in the header (like Personal Info, Customization)
const HeaderText = styled.span`
  display: flex;
  padding: 10px;
  align-items: center;
  color: ${(props) => (props.selected ? props.theme.buttonHoverTextColor : props.theme.navBarTextColor)};  // Change text color if selected
  cursor: pointer;  // Pointer cursor on hover
  background-color: ${(props) => (props.selected ? props.theme.buttonHoverBackground : props.theme.navBarBackground)};  // Change background if selected
  
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};  // Change background color on hover
    color: ${(props) => props.theme.buttonHoverTextColor};  // Change text color on hover
  }
  
  &:last-child {
    border-radius: 0px 10px 10px 0px;  // Rounds the last header choice
  }
  
  &:first-child {
    border-radius: 0px 0px 0px 0px;  // No border radius for the first item
  }
`;

// Main component that handles the settings logic
const SettingsBoard = ({ user, board, preferences }) => {
  const theme = useTheme();  // Access the current theme using styled-components' `useTheme`
  const [settingsKind, setSettingsKind] = useState("personal");  // State to manage which settings section is active

  const isBoardPresent = !!board;  // Boolean that checks if a board is selected or not

  // Dynamically adjust the available options based on board presence
  const availableOptions = isBoardPresent 
    ? [{ key: "personal", label: "Board Info" }, { key: "customize", label: "Customization" }]
    : [{ key: "personal", label: "Personal Info" }, { key: "security", label: "Login and Security" }];

  return (
    <SettingBoardContainer>
      {/* Header section */}
      <HeaderContainer>
        <Title>{isBoardPresent ? 'Board Settings' : 'User Settings'}</Title>  {/* Title changes based on whether a board is selected */}
        
        {/* Header choices for switching between different settings */}
        <HeaderChoices>
          {availableOptions.map(option => (
            <HeaderText
              key={option.key}
              onClick={() => setSettingsKind(option.key)}  // Set active tab
              selected={settingsKind === option.key}  // Highlight if selected
              theme={theme}
            >
              {option.label}  {/* Render the label (Personal Info, Board Info, etc.) */}
            </HeaderText>
          ))}
        </HeaderChoices>
      </HeaderContainer>

      {/* Main content for settings */}
      <SettingsContainer>
        {/* Render different settings components based on the active tab */}
        {settingsKind === "security" && !isBoardPresent ? (
          <LoginAndSecuritySettings user={user} />  /* Show Login and Security settings if no board is selected */
        ) : settingsKind === "personal" ? (
          isBoardPresent ? (
            <BoardInfoSettings user={user} board={board} />  /* Show Board Info */
          ) : (
            <UserInfoSettings user={user} />  /* Show Personal Info */
          )
        ) : (
          isBoardPresent && <CustomizationSettings board={board} preferences={preferences} />  /* Show Customization settings if a board is selected */
        )}
      </SettingsContainer>
    </SettingBoardContainer>
  );
};

export default SettingsBoard;
