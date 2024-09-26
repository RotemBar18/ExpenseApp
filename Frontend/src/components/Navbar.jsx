import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styled from 'styled-components';
import { useState } from 'react';

const Nav = styled.nav`
    background-color: ${(props) => props.theme.navBarBackground};
    color: ${(props) => props.theme.navBarTextColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    width: 300px;
    border-right: 1px solid ${(props) => props.theme.buttonBackground};
    transition: transform 0.3s ease;
    z-index:100;
    @media (max-width: 768px) {
    width: 250px;
    min-height: 100%;
    transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    position: fixed;
    top: 0px;
    left: -1px;
  }
`;
const ToggleModal = styled.div`
  display: none;
  transition: transform 0.3s ease;

    @media (max-width: 768px) {
  display:${(props) => props.isOpen ? "block" : "none"};

  background-color: ${(props) => props.theme.navBarBackground};
  opacity:0.4;
  width: 100%;
  height:100%;
  position: fixed;
  top: 0;
  left:0;
  }
`;

const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
     
    
    @media (max-width: 768px) {
    align-items: center;
    margin-bottom: 10px;
    
  }
`;

const UserImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;

    @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const UserName = styled.p`
    margin-top: 10px;
    font-size: 18px;

     @media (max-width: 768px) {
    margin-top: 0;
    margin-left: 10px;
    font-size: 16px;
  }
`;

const NavMenu = styled.ul`
    list-style-type: none;
    width: 100%;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    padding: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${(props) => props.theme.buttonBackground};
   color: ${(props) => props.theme.buttonTextColor};
    
    &:hover {
   color: ${(props) => props.theme.buttonHoverTextColor};
    background-color: ${(props) => props.theme.buttonHoverBackground};
    }
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavLink = styled.span`
    text-decoration: none;
    display: flex;
    font-size: 1rem;
    width: 70%;
    cursor:pointer;
    border:none;
   

     @media (max-width: 768px) {
    font-size: 0.9rem;
    width: auto;
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.modalTextColor};
  cursor: pointer;
  position: absolute;
  top: 15px;
  left: 15px;
z-index :1001;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.span`
    color: ${(props) => props.theme.navBarTextColor};
    font-size: 1.5rem;
    margin-bottom: 60px;
      @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, preferences } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const goToStatistics = () => {
    navigate('/statistics');
    setIsOpen(false);
  };
  const goToMain = () => {
    navigate('/main');
    setIsOpen(false);
  };
  const goToSettings = () => {
    navigate('/settings');
    setIsOpen(false);
  };
  const goToExpenses = () => {
    navigate('/expenses');
    setIsOpen(false);
  };
  const goToReports = () => {
    navigate('/Reports');
    setIsOpen(false);
  };

  return (
    <>
      <Hamburger onClick={ toggleMenu } >☰</Hamburger>

      <Nav isOpen={isOpen}>
        <Logo>Expense Tracker</Logo>

        <NavMenu>
          <UserProfile>
            <UserImage src={user.ProfilePic || 'https://via.placeholder.com/80'} alt="Profile" />
            <UserName>{user.Name || 'Guest'}</UserName>
          </UserProfile>
          <NavItem onClick={goToMain}>
            <NavLink>MyBoard</NavLink>
          </NavItem>
          <NavItem onClick={goToExpenses}>
            <NavLink>Expenses</NavLink>
          </NavItem>
          <NavItem onClick={goToStatistics}>
            <NavLink>Statistics</NavLink>
          </NavItem>
          <NavItem onClick={goToReports}>
            <NavLink>Reports</NavLink>
          </NavItem>
          <NavItem onClick={goToSettings}>
            <NavLink>Settings</NavLink>
          </NavItem>
        </NavMenu>
      </Nav>
      <ToggleModal onClick={toggleMenu } isOpen={isOpen} >
      </ToggleModal>
    </>

  );
};

export default Navbar;