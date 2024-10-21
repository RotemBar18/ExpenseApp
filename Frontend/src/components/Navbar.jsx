import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home, DollarSign, BarChart2, FileText, Settings } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const NavContainer = styled.nav`
  background-color: ${props => props.theme.navBarBackground};
  width: ${props => props.isOpen ? '200px' : '60px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.isOpen ? '20px' : '20px 0'};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;

  @media (max-width: 450px) {
    flex-direction: row;
    width: 100%;
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

const Profile = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const Name = styled.span`
  color: ${props => props.theme.navBarTextColor};
  font-size: 0.9rem;
  white-space: nowrap;
`;


const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 764);
  const { user } = useAuth();
  const board = useSelector((state) => state.board.selectedBoard);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 764);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [board]);

  const toggleMenu = () => {
    if (window.innerWidth <= 450) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: board ? board.Name : 'Board', icon: <Home size={24} />, path: '/main' },
    { name: 'Expenses', icon: <DollarSign size={24} />, path: '/expenses' },
    { name: 'Statistics', icon: <BarChart2 size={24} />, path: '/statistics' },
    { name: 'Reports', icon: <FileText size={24} />, path: '/reports' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings' },
  ];

  const altNavItems = [
    { name: 'MyBoards', icon: <Home size={24} />, path: '/main' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings' },
  ];

  return (
    <NavContainer isOpen={isOpen}>
      <Logo onClick={toggleMenu}>{isOpen ? 'Expense Tracker' : 'ET'}</Logo>

      {/* Conditional Rendering Based on Whether a Board is Selected */}
      {board ? (
        <>
          <Profile isOpen={isOpen}>
            <Image src={board.ProfilePic || 'https://via.placeholder.com/50'} alt="Profile" />
            <Name>{board.Name || 'Board'}</Name>
          </Profile>
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
        </>
      ) : (
        // Render alternate content if no board is selected
        <>
          <Profile isOpen={isOpen}>
            <Image src={user.ProfilePic || 'https://via.placeholder.com/50'} alt="Profile" />
            <Name>{user.Name || 'Guest'}</Name>
          </Profile>
          {altNavItems.map((item, index) => (
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
        </>
      )}
    </NavContainer>
  );
};

export default Navbar;
