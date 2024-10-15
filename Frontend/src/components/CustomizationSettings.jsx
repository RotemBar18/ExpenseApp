import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ManageCategories from './ManageCategories';
import ManageTheme from './ManageTheme';
import useAuth from '../hooks/useAuth'; 
import { useDispatch } from 'react-redux';
import { updateUserPreferences } from '../redux/actions/preferenceAction'; 

const CustomizationContainer = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap:20px;
  height:100%;
  padding:0 20px;
  color: ${(props) => props.theme.modalTextColor};
`;

const CustomizationSettings = ({ preferences }) => {
  const { user, token } = useAuth(); 
  const dispatch = useDispatch();
  const [updatedPreferences, setUpdatedPreferences] = useState(preferences);
  useEffect(() => {
    setUpdatedPreferences(preferences);
  }, [preferences]);

  const handleUpdatePreferences = (newPreferences) => {
    setUpdatedPreferences(newPreferences); 
    dispatch(updateUserPreferences(user.Id, token, newPreferences)); 
  };

  return (
    <CustomizationContainer>
      <ManageCategories onUpdatePreferences={handleUpdatePreferences}/>
      <ManageTheme />
    </CustomizationContainer>
  );
};

export default CustomizationSettings;
