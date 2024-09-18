// src/components/MainBoard.jsx
import React from 'react';
import styled from 'styled-components';
import ManageCategories from './ManageCategories';

const CustomizationContainer = styled.div`
    position: fixed;
    display:flex;
    width:100%;
    padding-left:250px;
    height:100%;
    font-family: cursive;
    padding-top: 80px;
    flex-wrap: nowrap;
`;

const CustomizationSettings = ({ onAddCategory,onDeleteCategory,preferences}) => {
    return (
        <CustomizationContainer>
            <ManageCategories
                preferences={preferences}
                onAddCategory={onAddCategory}
                onDeleteCategory={onDeleteCategory} />
        </CustomizationContainer>
    );
};

export default CustomizationSettings;
