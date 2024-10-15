import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home, DollarSign, BarChart2, FileText, Settings } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const NavContainer = styled.nav`
  background-color: ${props => props.theme.navBarBackground};
  width: ${props => props.isOpen ? '200px' : '60px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.isOpen ? '20px' : ' 20px 0'};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;
   @media (max-width: 450px) {
    flex-direction:row;
    width:100%;
  }
`;

const Logo = styled.div`
  color: ${props => props.theme.navBarTextColor};
  font-size: 1.5rem;
  margin-bottom: 2rem;
  white-space: nowrap;
  cursor: pointer;
     @media (max-width: 450px) {
  margin-bottom: 0;
  }
`;

const NavItem = styled.div`
  display: flex;

  align-items: center;
  justify-content: ${props => props.isOpen ? 'flex-start' : 'center'};
  color: ${props => props.theme.navBarTextColor};
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }

  svg {
    margin-right: ${props => props.isOpen ? '1rem' : '0'};
  }
      @media (max-width: 450px) {
  margin-bottom: 0;
  }
`;

const NavText = styled.span`
  white-space: nowrap;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  display: ${props => props.isOpen ? 'inline' : 'none'};
`;

const UserProfile = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const UserName = styled.span`
  color: ${props => props.theme.navBarTextColor};
  font-size: 0.9rem;
  white-space: nowrap;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 764);
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 764);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    if(window.innerWidth <= 450){
      return
    }
    setIsOpen(!isOpen);
  }

  const navItems = [
    { name: 'MyBoard', icon: <Home size={24} />, path: '/main' },
    { name: 'Expenses', icon: <DollarSign size={24} />, path: '/expenses' },
    { name: 'Statistics', icon: <BarChart2 size={24} />, path: '/statistics' },
    { name: 'Reports', icon: <FileText size={24} />, path: '/reports' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings' },
  ];

  return (
    <NavContainer isOpen={isOpen}>
      <Logo onClick={toggleMenu}>{isOpen ? 'Expense Tracker' : 'ET'}</Logo>
      <UserProfile isOpen={isOpen}>
        <UserImage src={user.ProfilePic || 'https://via.placeholder.com/50'} alt="Profile" />
        <UserName>{user.Name || 'Guest'}</UserName>
      </UserProfile>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          isOpen={isOpen}
          onClick={() => {
            navigate(item.path);
            if (window.innerWidth <= 764) setIsOpen(false);
          }}
        >
          {item.icon}
          <NavText isOpen={isOpen}>{item.name}</NavText>
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default Navbar;