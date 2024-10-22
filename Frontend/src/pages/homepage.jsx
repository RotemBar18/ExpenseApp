import styled from 'styled-components';
import Signup from '../components/mainBoards/signup';
import React from 'react';
import LogoBg from '../components/assets/logo1.jpg'

const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: url(${LogoBg}) center;
  background-size: cover; /* Make sure the image covers the entire page */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4); /* Darken the background */
  }
`;



const HomePage = () => {


  return (
    <PageContainer>
      <Signup />
    </PageContainer>
  );
};

export default HomePage;