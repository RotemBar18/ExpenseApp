// MonthlyInsights.jsx

import React from "react";
import styled from "styled-components";
import { totalMonthExpenses } from "../utils/expenseService"; // Assuming this filters the expenses
import MonthlyInsightsChart from "../charts/MonthlyInsightsChart"; // Import the chart component

const InsightsContainer = styled.div`
display:flex;
flex-direction:column;
align-items: center;

`;

const Section = styled.div`
`;

const Title = styled.div`
  color: ${(props) => props.theme.headerTextColor};
`;

const CardValue = styled.h6`
  font-size: 12px;
  margin: 0;
  color: ${(props) => props.theme.headerTextColor};
`;


const MonthlyInsights = ({ expenses }) => {
    const MonthExpenses = totalMonthExpenses(expenses);

    const totalSpending = MonthExpenses.reduce((total, expense) => total + parseFloat(expense.Amount), 0);

    const categorySpending = {};
    MonthExpenses.forEach((expense) => {
        if (categorySpending[expense.Category]) {
            categorySpending[expense.Category] += parseFloat(expense.Amount);
        } else {
            categorySpending[expense.Category] = parseFloat(expense.Amount);
        }
    });
    return (
        <InsightsContainer>
            <Section>
                <Title>
                    Total: ${totalSpending.toFixed(2)}
                </Title>
                <CardValue>
                </CardValue>
            </Section>
            <MonthlyInsightsChart categorySpending={categorySpending} />
        </InsightsContainer>
    );
};

export default MonthlyInsights;
