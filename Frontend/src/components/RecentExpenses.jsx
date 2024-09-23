import styled from 'styled-components';


const ExpenseListContainer = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.headerTextColor}; // Light theme text color
  background-color: ${(props) => props.theme.modalBackground}; // Light theme modal background
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  max-height: 200px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
`;

const ExpensesTable = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 400px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin: 0;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 800;
  border-bottom: 1px solid ${(props) => props.theme.border}; // Using theme border color
`;

const ExpenceHeader = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const HeaderText = styled.div`
  font-weight: 800;
  min-width: 15ch;
  overflow: hidden;
  margin-right: 33px;
  color: ${(props) => props.theme.modalTextColor}; // Header text color
`;

const HeaderPrice = styled.div`
  font-weight: 800;
  color: ${(props) => props.theme.modalTextColor}; // Header text color
`;

const Expense = styled.div`
  display: flex;
  cursor: pointer;
  color: ${(props) => props.theme.modalTextColor}; // Expense text color
`;

const ExpenseAmount = styled.div`
  text-overflow: ellipsis;
  color: ${(props) => props.theme.modalTextColor}; // Amount text color
`;

const ExpenseText = styled.div`
  text-overflow: ellipsis;
  min-width: 15ch;
  margin-right: 40px;
  color: ${(props) => props.theme.modalTextColor}; // Expense text color
`;
const RecentExpenses = ({ expenses }) => {
  console.log(expenses)
    const expensesForDisplay = [...expenses]
    .sort((a, b) => new Date(b.Date) - new Date(a.Date)) // Sort by date descending
    .slice(0, 5); // Get the last 5 entries

    return (
        <>
            <ExpenseListContainer>

                <ExpensesTable>
                    <Header>Recent Expenses</Header>
                    <ExpenceHeader>
                        <HeaderText >
                            Name
                        </HeaderText>
                        <HeaderText >
                            Category
                        </HeaderText>
                        <HeaderPrice >
                            Price
                        </HeaderPrice>
                    </ExpenceHeader>
                    {expensesForDisplay.map((expense, index) => (
                        <Expense
                            key={expense.ExpenseId}>
                            <ExpenseText >
                                {expense.Name}
                            </ExpenseText>
                            <ExpenseText>
                                {expense.Category}
                            </ExpenseText>
                            <ExpenseAmount >
                                ${expense.Amount}
                            </ExpenseAmount>

                        </Expense>
                    ))}
                </ExpensesTable>
            </ExpenseListContainer>
        </>
    );
};

export default RecentExpenses;
