// src/components/Navbar.jsx
import {RightBorder, BottomBorder, TopBorder, NavLink,UserImage, NavItem, Nav,UserProfile,UserName, NavMenu,  Logo } from './NavbarElements';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, preferences, expenses }) => {


    const navigate = useNavigate();

    const goToStatistics = () => {
        navigate('/statistics', { state: { user: user, expenses: expenses, preferences: preferences } }); // Pass the expenses to the statistics page
    };
    const goToMain = () => {
        navigate('/main', { state: { user: user, expenses: expenses, preferences: preferences } });
    };
    const goToSettings = () => {
        navigate('/settings', { state: { user: user, expenses: expenses, preferences: preferences } });
    };
    const goToExpenses = () => {
        navigate('/expenses', { state: { user: user, expenses: expenses, preferences: preferences } });
    };




    return (

        <Nav>
            <Logo>Expense Tracker</Logo>

            <NavMenu >
                <UserProfile >
                    <UserImage src='https://via.placeholder.com/80'/>
                    <UserName >{user.Name}</UserName>
                </UserProfile>
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
