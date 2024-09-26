import styled from "styled-components";
import SettingsBoard from "../components/SettingsBoard";
import useAuth from "../hooks/useAuth";

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

`;



const Settings = () => {
    const { preferences,user} = useAuth();
   


    return (
        <PageContainer>
            <SettingsBoard user={user} preferences={preferences}/>
        </PageContainer>
    )
};

export default Settings;