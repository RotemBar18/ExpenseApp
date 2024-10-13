// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar'; // Adjust the import path as necessary
import { Outlet } from 'react-router-dom'; // Import Outlet from React Router
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
