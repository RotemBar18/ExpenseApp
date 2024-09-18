import styled from 'styled-components';
import Signup from '../components/signup';
import React from 'react';

const HomeContainer = styled.div`
    display:flex;
    flex-direction: column ;
    
`;
const HeaderContainer = styled.div`
    display:flex;
    flex-direction: column ;
    justify-content:space_around;
    background-color:#d0e0d0;
  
`;
const Header = styled.h1`
  color:#6A956A;
  text-align: center;
  line-height: 18px;
  text-transform: capitalize;
  text-shadow: 2px 1px 0px #6E6E6E;
`;
const Img = styled.img`
  max-width:100px;
`;
const ImgContainer = styled.div`
  display:flex;
  justify-content:center;
  order:;
`;





const Home = () => {


  return (
    <HomeContainer>
      <HeaderContainer>
        <Header>
          Start Tracking Today!
        </Header>
        <ImgContainer>
          <Img src='/images/LOGO.png' alt="" style={{ objectFit: "contain" }} />
        </ImgContainer>
      </HeaderContainer>
      <Signup />
    </HomeContainer>
  );
};

export default Home;