import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

// Sidebar container
export const Nav = styled.nav`
    width: 250px;
    height: 100vh;
    background-color: #151b20;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
    padding-top: 20px;
    position: fixed;
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
    color: #fff;
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
    color: ${(props) => (props.selected ? '#00d3a9' : '#fff')};
    background-color: ${(props) => (props.selected ? '#333' : 'transparent')};
    cursor: pointer;
    
    &:hover {
        background-color: #333;
        
    }
         &.active {
        color: #00d3a9;
    }

    &:hover {
        color: #00d3a9;
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
export const Logo = styled.div`
    color: white;
    font-size: 1.5rem;
    margin-bottom: 20px;
`;

export const TopBorder = styled.div`
       background-color: #151b20;
    position:fixed;
    top:0;
    width:1000vw;
    height:80px;
    z-index:-1;

`;

export const BottomBorder = styled.div`
    background-color: #151b20;
    position:fixed;
    bottom:0;
    width:1000vw;
    height:80px;
    z-index:-1;
`;

export const RightBorder = styled.div`
    background-color: #151b20;
    position:fixed;
    top:0;
    right:0;
    width:80px;
    height:1000vw;

`;