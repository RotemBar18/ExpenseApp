import React from 'react';
import Navbar from './Navbar'; 
import { Outlet } from 'react-router-dom'; 
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  height:100%;

  @media (max-width: 450px) {
    flex-direction:column;
  }
    
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: ${(props) => props.theme.scrollBarTrack};
  border-radius: 10px;
  
  
}

&::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollBarThumb};
  border-radius: 10px;
  
}

&::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.scrollBarThumbHover || props.theme.scrollBarThumb};
  cursor: pointer;
}
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
