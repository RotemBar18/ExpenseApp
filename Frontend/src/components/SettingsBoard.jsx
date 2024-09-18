// src/components/MainBoard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ManageCategories from './ManageCategories';
import PersonalInfoSettings from './PersonalInfoSettings';
import LoginAndSecuritySettings from './LoginAndSecuritySettings';
import CustomizationSettings from './CustomizationSettings';

const SettingBoardContainer = styled.div`
    padding-left:250px;
    padding-top: 80px;
    margin-left:40px;

`;
const HeaderContainer = styled.div`
`;


const HeaderChoises = styled.div`
    display:flex;
    gap:20px;
`;
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderText = styled.span`
    display: flex;
padding:10px;
    align-items: center;
    color: ${(props) => (props.selected ? '#00d3a9' : '#bbbbbb')};
    cursor: pointer;
    border-radius:10px 10px 0px 0px;
    
    &:hover {
        background-color: #333;
        
    }

    &:hover {
        color: #00d3a9;
    }
`
const SettingsBoard = ({user, preferences,onAddCategory, onDeleteCategory, categories }) => {
    const [SettingsKind, setSettingsKind] = useState("personal")
    
    console.log(user)
    return (
        <SettingBoardContainer>
            <HeaderContainer>
                <h1 style={{paddingLeft:'10px'}}>Settings</h1>
                <HeaderChoises>
                    <HeaderText onClick={() => setSettingsKind("personal")}>
                        Personal Info
                    </HeaderText>
                    <HeaderText onClick={() => setSettingsKind("security")}>
                        Login & Security
                    </HeaderText>
                    <HeaderText onClick={() => setSettingsKind("customize")}>
                        Customization
                    </HeaderText>
                </HeaderChoises>
            </HeaderContainer>
            <SettingsContainer>

                {
                    SettingsKind === "security" ? (
                        <LoginAndSecuritySettings user={user} />
                    ) : SettingsKind === "personal" ? (
                        <PersonalInfoSettings user={user} />
                    ) : (
                        <CustomizationSettings onAddCategory={onAddCategory} onDeleteCategory={onDeleteCategory} preferences={preferences}  />
                    )
                }

            </SettingsContainer>


        </SettingBoardContainer>
    );
};

export default SettingsBoard;
