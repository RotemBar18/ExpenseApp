import React from 'react';
import styled from 'styled-components';


const LoginAndSecurityContainer = styled.div`
    position: fixed;
    display:flex;
    width:100%;
    padding-left:250px;
    height:100%;
    font-family: cursive;
    padding-top: 80px;
    flex-wrap: nowrap;
`;

const LoginAndSecuritySettings = ({ }) => {
    return (
        <LoginAndSecurityContainer>
            Login And Security

        </LoginAndSecurityContainer>
    );
};

export default LoginAndSecuritySettings;
