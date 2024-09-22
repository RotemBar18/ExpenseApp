// src/components/Navbar.jsx
import {RightBorder, BottomBorder, TopBorder, NavLink,UserImage, NavItem, Nav,UserProfile,UserName, NavMenu,  Logo } from './NavbarElements';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Use the custom hook to get user and preferences

   
    const goToStatistics = () => {
        navigate('/statistics'); // Pass the expenses to the statistics page
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

        <Nav>
            <Logo>Expense Tracker</Logo>

            <NavMenu >
                <UserProfile >
                <UserImage src={user.ProfilePic || 'https://via.placeholder.com/80'} alt="Profile" />
                <UserName>{user.Name || 'Guest'}</UserName>                </UserProfile>
                <NavItem onClick={goToMain}>
                    <NavLink >MyBoard</NavLink>
                </NavItem>
                <NavItem onClick={goToExpenses}>
                    <NavLink>Expenses</NavLink>
                </NavItem>
                <NavItem onClick={goToStatistics}>
                    <NavLink>Statistics</NavLink>
                </NavItem>
                <NavItem onClick={goToSettings}>
                    <NavLink >Settings</NavLink>

                </NavItem>

            </NavMenu>
            <TopBorder />
            <BottomBorder />
            <RightBorder />


        </Nav>
    );
};

export default Navbar;
