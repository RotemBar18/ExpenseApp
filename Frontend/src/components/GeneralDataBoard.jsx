import styled from "styled-components";
import MonthlyInsights from "./MonthlyInsights";
import DailyInsights from "./DailyInsights";
import { getSuffix } from "../utils/utilService";
const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width:90%;
`;

const DataCard = styled.div`
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
`;

const CardTitle = styled.div`
  margin: 0;
  text-align:center;
  font-weight: bold;
  color: ${(props) => props.theme.headerTextColor};
`;


const GeneralDataBoard = ({ expenses }) => {
    const today = new Date();

    const currentMonthName = today.toLocaleString('en-US', { month: 'long' });
    const currentDayOfMonth = today.getDate();
    const currDay = today.toLocaleString('en-US',{ weekday: 'long' });
    return (
        <DataContainer>
            <DataCard>
                <CardTitle>{currDay} The {currentDayOfMonth}{getSuffix(currentDayOfMonth)} </CardTitle>
                <DailyInsights expenses={expenses}/>
            </DataCard>

            <DataCard>
                <CardTitle>{currentMonthName}</CardTitle>
                <MonthlyInsights expenses={expenses} />
            </DataCard>
        </DataContainer>
    );
};

export default GeneralDataBoard;
