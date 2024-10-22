import styled from "styled-components";
import SettingsBoard from "../components/SettingsBoard";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  
`;



const Settings = () => {
    const { preferences,user} = useAuth();
   const selectedBoard = useSelector((state) => state.board.selectedBoard);


    return (
        <PageContainer>
            <SettingsBoard user={user} board={selectedBoard} preferences={preferences}/>
        </PageContainer>
    )
};

export default Settings;