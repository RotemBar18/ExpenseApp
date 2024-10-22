import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';  
import BoardInfoSettings from './BoardInfoSettings';  
import LoginAndSecuritySettings from './LoginAndSecuritySettings';  
import CustomizationSettings from './CustomizationSettings'; 
import UserInfoSettings from './UserInfoSettings'; 

const SettingBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background}; 
`;

const HeaderContainer = styled.div``;

const Title = styled.h1`
  padding: 20px 20px;
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.headerTextColor}; 
`;

const HeaderChoices = styled.div`
  display: flex;
  padding: 0 20px;
`;

const SettingsContainer = styled.div`
  overflow-y: auto; 
`;

const HeaderText = styled.span`
  display: flex;
  padding: 10px;
  align-items: center;
  color: ${(props) => (props.selected ? props.theme.buttonHoverTextColor : props.theme.navBarTextColor)};  
  cursor: pointer; 
  background-color: ${(props) => (props.selected ? props.theme.buttonHoverBackground : props.theme.navBarBackground)};  
  
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};  
    color: ${(props) => props.theme.buttonHoverTextColor};  
  }
  
  &:last-child {
    border-radius: 0px 10px 10px 0px;  
  }
  
  &:first-child {
    border-radius: 0px 0px 0px 0px;  
  }
`;

const SettingsBoard = ({ user, board, preferences }) => {
  const theme = useTheme();  
  const [settingsKind, setSettingsKind] = useState("personal");  

  const isBoardPresent = !!board; 

  const availableOptions = isBoardPresent 
    ? [{ key: "personal", label: "Board Info" }, { key: "customize", label: "Customization" }]
    : [{ key: "personal", label: "Personal Info" }, { key: "security", label: "Login and Security" }];

  return (
    <SettingBoardContainer>
      <HeaderContainer>
        <Title>{isBoardPresent ? 'Board Settings' : 'User Settings'}</Title>  {/* Title changes based on whether a board is selected */}
        
        <HeaderChoices>
          {availableOptions.map(option => (
            <HeaderText
              key={option.key}
              onClick={() => setSettingsKind(option.key)}  
              selected={settingsKind === option.key}  
              theme={theme}
            >
              {option.label}  
            </HeaderText>
          ))}
        </HeaderChoices>
      </HeaderContainer>

      <SettingsContainer>
        {settingsKind === "security" && !isBoardPresent ? (
          <LoginAndSecuritySettings user={user} />  
        ) : settingsKind === "personal" ? (
          isBoardPresent ? (
            <BoardInfoSettings user={user} board={board} />  
          ) : (
            <UserInfoSettings user={user} /> 
          )
        ) : (
          isBoardPresent && <CustomizationSettings board={board} preferences={preferences} />  
        )}
      </SettingsContainer>
    </SettingBoardContainer>
  );
};

export default SettingsBoard;
