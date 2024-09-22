import Navbar from "../components/Navbar";
import styled from "styled-components";
import SettingsBoard from "../components/SettingsBoard";
import useAuth from "../hooks/useAuth";

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

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