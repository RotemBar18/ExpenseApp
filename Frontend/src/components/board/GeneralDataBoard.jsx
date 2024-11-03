import React, { useState } from "react";
import styled from "styled-components";
import DailyInsights from "./DailyInsights";
import ExpenseBreakdown from "./ExpenseBreakdown";
import BudgetModal from "./BudgetModal";
import { getSuffix } from "../../utils/utilService";

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
    @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DataCard = styled.div`
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.modalBackground};
  display: flex;
  flex-direction: column;

  &.budget {
    flex:  20%;
    justify-content: space-between;
 
  }

  &.daily {
    flex:  30%;
  }

  &.breakdown {
    flex:  35%;
    justify-content: space-between;

  }
`;

const CardTitle = styled.div`
  margin: 0;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.headerTextColor};
`;


const GeneralDataBoard = ({ board, users, expenses, onFilterChange }) => {
  const budget = useState(board.Budget || 0);
  const today = new Date();
  const currentDayOfMonth = today.getDate();
  const currDay = today.toLocaleString("en-US", { weekday: "long" });

  return (
    <DataContainer>
      <DataCard className="budget">
        <CardTitle>Budget Overview</CardTitle>
        <BudgetModal type={'mainBoard'} board={{ ...board, Budget: budget }} users={users} expenses={expenses} />
      </DataCard>

      <DataCard className="daily">
        <CardTitle>
          {currDay} The {currentDayOfMonth}
          {getSuffix(currentDayOfMonth)}
        </CardTitle>
        <DailyInsights users={users} expenses={expenses} />
      </DataCard>

      <DataCard className="breakdown">
        <CardTitle>Expenses Breakdown</CardTitle>
        <ExpenseBreakdown expenses={expenses} onFilterChange={onFilterChange} />
      </DataCard>
    </DataContainer>
  );
};

export default GeneralDataBoard;
