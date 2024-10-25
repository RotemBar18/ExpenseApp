import styled from "styled-components";
import DailyInsights from "./DailyInsights";
import ExpenseBreakdown from "./ExpenseBreakdown";
import { getSuffix } from "../../utils/utilService";

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`;

const DataCard = styled.div`
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.modalBackground};

  /* Targeting specific class names for each child */
  &.daily {
  display:flex;
  flex-direction:column;
    flex-grow: 1;

  }

  &.breakdown {
    flex-grow: 2;
  }

`;

const CardTitle = styled.div`
  margin: 0;
  text-align:center;
  font-weight: bold;
  color: ${(props) => props.theme.headerTextColor};
`;


const GeneralDataBoard = ({users, expenses,onFilterChange }) => {
  const today = new Date();
  const currentDayOfMonth = today.getDate();
  const currDay = today.toLocaleString('en-US', { weekday: 'long' });
  return (
    <DataContainer>
      <DataCard className="daily">
        <CardTitle>{currDay} The {currentDayOfMonth}{getSuffix(currentDayOfMonth)} </CardTitle>
        <DailyInsights users={users} expenses={expenses} />
      </DataCard>

      <DataCard className="breakdown">
        <CardTitle>Expenses Breakdown</CardTitle>
        <ExpenseBreakdown expenses={expenses}  onFilterChange={onFilterChange}/>
      </DataCard>
    
    </DataContainer>
  );
  
};


export default GeneralDataBoard;


