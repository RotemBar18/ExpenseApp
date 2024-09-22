import Navbar from "../components/Navbar";
import styled from "styled-components";
import SettingsBoard from "../components/SettingsBoard";
import useAuth from "../hooks/useAuth";

const PageContainer = styled.div`
    background-color:#0a0a0a;
    position:fixed;
    width:100vw;
    top:0;
    left:0;
    height:60vw;
    color:#dddddd;
`;


const Settings = () => {
    const { preferences,user} = useAuth(); // Use the custom hook to get user and preferences
   


    return (
        <PageContainer>
            <Navbar />
            <SettingsBoard user={user} preferences={preferences}/>
        </PageContainer>
    )
};

export default Settings;