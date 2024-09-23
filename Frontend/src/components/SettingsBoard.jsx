// src/components/SettingsBoard.jsx
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components'; // Import useTheme to access the theme
import PersonalInfoSettings from './PersonalInfoSettings';
import LoginAndSecuritySettings from './LoginAndSecuritySettings';
import CustomizationSettings from './CustomizationSettings';

const SettingBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  padding-left:2%;
  padding-top:1%;
background-color: ${(props) => props.theme.background};

`;

const HeaderContainer = styled.div``;

const HeaderChoices = styled.div`
  display: flex;
`;

const SettingsContainer = styled.div`
  display: flex;
`;

const HeaderText = styled.span`
  display: flex;
  padding: 10px;
  align-items: center;
  color: ${(props) => (props.selected ? props.theme.buttonHoverTextColor : props.theme.navBarTextColor)}; // Dynamic color based on selection and theme
  cursor: pointer;
background-color: ${(props) => (props.selected ? props.theme.buttonHoverBackground : props.theme.navBarBackground)}; // Theme-based hover background
  
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground}; // Theme-based hover background
    color: ${(props) => props.theme.buttonHoverTextColor}; // Theme-based hover text color
  }
      &:last-child {
    border-radius: 0px 10px 10px 0px  ; // Full 10px border radius on all corners for the last child
  }      
    &:first-child {
    margin-left:10px;
    border-radius: 10px 0px  0px 10px ; // Full 10px border radius on all corners for the last child
  }
`;

const SettingsBoard = ({ user, preferences }) => {
  const theme = useTheme(); // Access the current theme from ThemeProvider
  const [settingsKind, setSettingsKind] = useState("personal");

  return (
    <SettingBoardContainer>
      <HeaderContainer>
        <h1 style={{ paddingLeft: '10px', color: theme.headerTextColor }}>Settings</h1> {/* Use theme header text color */}
        <HeaderChoices>
          <HeaderText
            onClick={() => setSettingsKind("personal")}
            selected={settingsKind === "personal"}
            theme={theme}
          >
            Personal Info
          </HeaderText>
          <HeaderText
            onClick={() => setSettingsKind("security")}
            selected={settingsKind === "security"}
            theme={theme}
          >
            Login & Security
          </HeaderText>
          <HeaderText
            onClick={() => setSettingsKind("customize")}
            selected={settingsKind === "customize"}
            theme={theme}
          >
            Customization
          </HeaderText>
        </HeaderChoices>
      </HeaderContainer>
      <SettingsContainer>
        {settingsKind === "security" ? (
          <LoginAndSecuritySettings user={user} />
        ) : settingsKind === "personal" ? (
          <PersonalInfoSettings user={user} />
        ) : (
          <CustomizationSettings preferences={preferences} />
        )}
      </SettingsContainer>
    </SettingBoardContainer>
  );
};

export default SettingsBoard;
