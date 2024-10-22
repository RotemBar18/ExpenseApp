import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home, DollarSign, BarChart2, FileText, Settings ,ArrowLeft  } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearPreferences } from '../../redux/actions/preferenceAction';
import { clearBoard } from '../../redux/actions/boardActions';
const NavContainer = styled.nav`
  background-color: ${props => props.board ? props.theme.navBarBackground : '#333'}; 
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
  color: ${props => props.board ? props.theme.navBarTextColor : '#fff'}; 
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
  color: ${props => props.board ? props.theme.navBarTextColor : '#fff'};
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.board ? props.theme.buttonHoverBackground : '#444'};
  }

  svg {
    margin-right: ${props => props.isOpen ? '1rem' : '0'};
  }

  @media (max-width: 450px) {
    margin-bottom: 0;
  }
`;

const Profile = styled.div`
display:flex;
height:100px;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: ${props => props.isOpen ? '60px' : '20px'};
  height: ${props => props.isOpen ? '60px' : '20px'};
  border-radius: 50%;
  border: 2px solid ${props => props.board ? props.theme.navBarTextColor : '#00A86B'};
`;

const Name = styled.span`
  transform: ${props => props.isOpen ? 'rotate(0deg)  translateY(0px)' : 'rotate(90deg) translateX(20px)'};
  color: ${props => props.board ? props.theme.navBarTextColor : '#fff'}; 
  font-size: 0.9rem;
 
`;

const NavText = styled.span`
  white-space: nowrap;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  display: ${props => props.isOpen ? 'inline' : 'none'};
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 764);
  const { user } = useAuth();
  const dispatch = useDispatch();
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

  const handleBackClick = () => {
    dispatch(clearPreferences());  
    dispatch(clearBoard());       
  };

  const navItems = [
    { name: board ? board.Name : 'Board', icon: <Home size={24} />, path: '/main' },
    { name: 'Expenses', icon: <DollarSign size={24} />, path: '/expenses' },
    { name: 'Statistics', icon: <BarChart2 size={24} />, path: '/statistics' },
    { name: 'Reports', icon: <FileText size={24} />, path: '/reports' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings' },
    { name: 'Return', icon: <ArrowLeft size={24} />, path: '/main', func: handleBackClick },
  ];

  const altNavItems = [
    { name: 'MyBoards', icon: <Home size={24} />, path: '/main' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings' },
  ];

  return (
    <NavContainer isOpen={isOpen} board={board}>
      <Logo onClick={toggleMenu}  board={board}> {isOpen ? 'Expense Tracker' : 'ET'}</Logo>

      {board ? (
        <>
          <Profile isOpen={isOpen} board={board}>
            <Image isOpen={isOpen} src={board.ProfilePic || 'https://via.placeholder.com/50'} alt="Profile" board={board} />
            <Name isOpen={isOpen} board={board}>{board.Name || 'Board'}</Name>
          </Profile>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              isOpen={isOpen}
              board={board}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth <= 764) setIsOpen(false);
                if (item.func) item.func();
              }}
            >
              {item.icon}
              <NavText isOpen={isOpen} board={board}>{item.name}</NavText>
            </NavItem>
          ))}
        </>
      ) : (
        <>
          <Profile isOpen={isOpen}>
            <Image isOpen={isOpen} src={user.ProfilePic || 'https://via.placeholder.com/50'} alt="Profile" />
            <Name isOpen={isOpen} >{user.Name || 'Guest'}</Name>
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
