// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styled from 'styled-components'; // Import ThemeProvider

export const Nav = styled.nav`
    background-color: ${(props) => props.theme.navBarBackground};
    color: ${(props) => props.theme.navBarTextColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
    padding-top: 40px;
    width:20%;
`;

// Profile section at the top of the sidebar
export const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
`;

export const UserImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

export const UserName = styled.p`
    margin-top: 10px;
    font-size: 18px;
`;

// Navigation menu container
export const NavMenu = styled.ul`
    list-style-type: none;
    width: 100%;
    padding: 0;
    margin: 0;
`;

// Navigation menu item
export const NavItem = styled.li`
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
`;

// Navigation link (applies to the text and icon)
export const NavLink = styled.span`
    text-decoration: none;
    display: flex;
    font-size: 1rem;
    width: 70%;
     background-color: inherit;
    cursor:pointer;
    border:none;
    color:inherit;
   
`;

// Hamburger menu for mobile view
export const Hamburger = styled.div`
    display: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 15px;
    left: 15px;

    @media (max-width: 768px) {
        display: block;
    }
`;

// Logo container for branding or app name
export const Logo = styled.span`
    color: ${(props) => props.theme.navBarTextColor};
    font-size: 1.5rem;
    margin-bottom: 60px;
`;

const Navbar = () => {
    const navigate = useNavigate();
    const { user, preferences } = useAuth(); // Get user and preferences from custom hook
    const goToStatistics = () => {
        navigate('/statistics');
    };
    const goToMain = () => {
        navigate('/main');
    };
    const goToSettings = () => {
        navigate('/settings');
    };
    const goToExpenses = () => {
        navigate('/expenses');
    };

    return (
        // Wrap Nav component with ThemeProvider and pass the correct theme object
            <Nav>
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
                    <NavItem onClick={goToSettings}>
                        <NavLink>Settings</NavLink>
                    </NavItem>
                </NavMenu>
            </Nav>
    );
};

export default Navbar;