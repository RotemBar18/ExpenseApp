import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home, DollarSign, BarChart2, FileText, Settings, ArrowLeft, LogOut, NotepadText } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearPreferences } from '../../redux/actions/preferenceAction';
import { clearBoard } from '../../redux/actions/boardActions';
import { disconnectWebSocket } from '../../utils/websocketClient';
import { logoutUser } from '../../redux/actions/userActions';

const NavContainer = styled.nav`
  width: ${props => props.board ? (props.isOpen ? '200px' : '60px') : '100%'}; 
  background-color: ${props => props.board ? props.theme.navBarBackground || '#ffffff' : '#ffffff'};
  color: ${props => props.theme.navBarTextColor || '#333'};
  display: flex;
  flex-direction: ${props => props.board ? 'column' : 'row'};
  align-items: center;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  overflow: hidden;
  height:${props => props.board ? '100vh' : '10%'};
  @media (max-width: 450px) {
    flex-direction: row;
    width: 100%;
  }
`;

const Logo = styled.div`
  color: ${props => props.theme.navBarTextColor || '#333'};
  font-size: 1.5rem;
  margin-bottom: ${props => props.board ? '0.5rem' : '0'};
  white-space: nowrap;
  cursor:${props => props.board ? 'pointer' : 'default'};
  padding: ${props => props.board ? '20px 0' : '0'};

  @media (max-width: 450px) {
    margin-bottom: 0;
  }
`;
const NavItems = styled.div`
margin-left: ${props => props.board ? '0px' : 'auto'};
  display: flex;
`;
const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content:${props => props.board ? (props.isOpen ? 'flex-start' : 'center') : 'flex-end'};
  color: ${props => props.theme.navBarTextColor || '#333'};
  padding: 0.75rem;
  margin-bottom: ${props => props.board ? '0.5rem' : '0'};
  cursor: pointer;
  width: ${props => props.board ? '85%' : 'auto'};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.board ? (props.theme.buttonHoverBackground || '#e0e0e0') : 'inherit'};
    color: ${props => props.board ? 'inherit' : props.theme.buttonHoverBackground};
  }

  svg {
    margin-right: ${props => props.board ? (props.isOpen ? '1rem' : '0') : '0.1rem'};
  }

  @media (max-width: 450px) {
    margin-bottom: 0;
  }
`;

const Profile = styled.div`
  display: flex;
  position: relative;
  height: ${props => props.board ? '100px' : 'auto'};
  flex-direction: row;
  gap:10px;
  align-items: center;
  margin-left: ${props => props.board ? '0px' : '10px'};
`;

const Image = styled.img`
  width: ${props => props.board ? (props.isOpen ? '60px' : '20px') : '30px'};
  height: ${props => props.board ? (props.isOpen ? '60px' : '20px') : '30px'};
  border-radius: 50%;
  margin-right:${props => props.board ? '0px' : '10px'};
  cursor:  ${props => props.board ? 'default' : 'pointer'};
`;


const NavText = styled.span`
  white-space: nowrap;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  display: ${props => props.isOpen ? 'inline' : 'none'};
`;
const UserModal = styled.div`
  position: fixed;
  top: 50px;
  right: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
  width: 150px;
  z-index: 5000; /* Ensure it's on top of ModalOptionBack */

`;

const ModalOptionBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity:0;
  z-index: 3500; /* Ensure it's on top of ModalOptionBack */
  background-color: rgba(0, 0, 0, 0.2);
`;
const ModalOption = styled.div`
display: flex;
    justify-content: flex-start;
    align-items: center;
    gap:10px;
  padding: 5px 0px;
  cursor: pointer;
  z-index: 5000; /* Ensure it's on top of ModalOptionBack */

  color: ${props => props.theme.navBarTextColor || '#333'};
  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground || '#e0e0e0'};
    border-radius: 5px;
  }
`;
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 764);
  const [toggleModal, setToggleModal] = useState(false);
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
    disconnectWebSocket();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  };

  const toggleUserModal = () => {
    setToggleModal(!toggleModal)
  };
  const navItems = [
    { name: board ? board.Name : 'Board', icon: <NotepadText size={24} />, path: '/main' },
    { name: 'Expenses', icon: <DollarSign size={24} />, path: '/expenses' },
    { name: 'Statistics', icon: <BarChart2 size={24} />, path: '/statistics' },
    { name: 'Reports', icon: <FileText size={24} />, path: '/reports' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings' },
    { name: 'Return', icon: <ArrowLeft size={24} />, path: '/main', func: handleBackClick },
  ];

  const altNavItems = [
    { name: 'MyBoards', icon: <Home size={18} />, path: '/main' },
  ];

  return (
    <NavContainer isOpen={isOpen} board={board}>

      {board ? (
        <>
          <Logo onClick={toggleMenu} board={board}> {isOpen ? 'Expense Tracker' : 'ET'}</Logo>

          <Profile isOpen={isOpen} board={board}>
            <Image isOpen={isOpen} src={board.ProfilePic || 'https://via.placeholder.com/50'} alt="Profile" board={board} />
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
          <Logo board={board}> {isOpen ? 'Expense Tracker' : 'ET'}</Logo>

          <NavItems>

            {altNavItems.map((item, index) => (
              <NavItem
                key={index}
                isOpen={isOpen}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth <= 764) setIsOpen(false);
                  if (item.func) item.func();
                }}
              >
                {item.icon}
                <NavText isOpen={isOpen}>{item.name}</NavText>
              </NavItem>
            ))}
            <Profile isOpen={isOpen} >
              <Image onClick={toggleUserModal} isOpen={isOpen} src={user.ProfilePic || 'https://via.placeholder.com/50'} alt="Profile" />
              {toggleModal && (
                <>
                  <ModalOptionBack onClick={(e) => {
                    e.stopPropagation();
                    toggleUserModal();
                  }} />                  <UserModal>
                    <ModalOption onClick={() => navigate('/settings')}><Settings size={20} />Settings</ModalOption>
                    <ModalOption onClick={handleLogout}><LogOut size={20} />Logout</ModalOption>

                  </UserModal>
                </>

              )}
            </Profile >
          </NavItems>
        </>
      )}
    </NavContainer>

  );
};

export default Navbar;
