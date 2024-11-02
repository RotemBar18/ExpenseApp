import styled, { keyframes } from 'styled-components';
import Signup from '../components/mainBoards/signup';
import React from 'react';
import LogoBg from '../components/assets/logo2.png';
import { FaChartLine, FaUsers, FaLock, FaLayerGroup } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: url(${LogoBg}) center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: #fff;
  overflow-y: auto;
  overflow-x: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom right, rgba(50, 50, 70, 0.1), rgba(20, 20, 40, 0.3));
    z-index: 0;
    
  }
`;




const InfoSection = styled.div`
  text-align: left;
  animation: ${fadeIn} 1s ease forwards;
display: flex;
height:100vh;
    padding: 1rem;

    flex-direction: column;
  
    @media (max-width: 768px) {
    width: 100%;
    text-align: center;

  }

`;

const MainContent = styled.div`
display:flex;
font-size:1rem;
gap: 1rem;

  @media (max-width: 768px) {
flex-direction:column;
  align-items: center;

  }
`;

const HeroTitle = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.7rem;
  font-weight: bold;
  margin-top:0;
  color: #f5f5f5;
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #d3d3d3;
  margin-bottom: 1.5rem;
`;

const InfoCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const cardContainer = styled.div`
  filter:blur(1px)
}
`;
const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.22);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #ffffff;
}
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #6c91c2;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  line-height: 1.3;
`;

const SignupSection = styled.div`
  background: rgba(255, 255, 255, 0.22);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease forwards;
  display: flex;
  align-items: center;
  justify-content:center;


  @media (max-width: 768px) {
  width: 90%;
  margin-bottom: 1rem;

  }
`;

const HomePage = () => {
  return (
    <PageContainer>
      <InfoSection>
        <HeroTitle>Welcome to Expense Tracker</HeroTitle>
        <HeroSubtitle>
          Track, manage, and optimize your finances with ease. Collaborate with your team, set budgets, and gain insights into your spending.
        </HeroSubtitle>
        <MainContent>

          <InfoCardContainer>

            <InfoCard>
              <IconWrapper><FaChartLine /></IconWrapper>
              <div>
                <InfoTitle>Powerful Insights</InfoTitle>
                <InfoText>
                  Visualize and analyze your spending patterns with our interactive reports and charts.
                </InfoText>
              </div>
            </InfoCard>
            <InfoCard>
              <IconWrapper><FaUsers /></IconWrapper>
              <div>
                <InfoTitle>Seamless Collaboration</InfoTitle>
                <InfoText>
                  Invite collaborators to your boards, allowing for smooth team expense management.
                </InfoText>
              </div>
            </InfoCard>
            <InfoCard>
              <IconWrapper><FaLayerGroup /></IconWrapper>
              <div>
                <InfoTitle>Customizable Categories</InfoTitle>
                <InfoText>
                  Create and edit expense categories to personalize your budgeting experience.
                </InfoText>
              </div>
            </InfoCard>
            <InfoCard>
              <IconWrapper><FaLock /></IconWrapper>
              <div>
                <InfoTitle>Data Security</InfoTitle>
                <InfoText>
                  Keep your data safe with industry-standard security protocols and encryption.
                </InfoText>
              </div>
            </InfoCard>
          </InfoCardContainer>
          <SignupSection>
            <Signup />
          </SignupSection>

        </MainContent>
      </InfoSection>

    </PageContainer>
  );
};

export default HomePage;
