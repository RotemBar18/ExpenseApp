import styled from 'styled-components';


const ExpenseListContainer = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.headerTextColor};
  background-color: ${(props) => props.theme.modalBackground}; 
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  max-height: 200px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
`;

const ExpensesTable = styled.div`
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
  font-size: 1.5rem;
  font-weight: 800;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const ExpenceHeader = styled.div`
  display: flex;
justify-content: space-between;
  width:100%;
`;

const HeaderText = styled.div`
  font-weight: 800;
  overflow: hidden;
  color: ${(props) => props.theme.modalTextColor};
`;

const HeaderPrice = styled.div`
  font-weight: 800;
  color: ${(props) => props.theme.modalTextColor};
`;

const Expense = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  color: ${(props) => props.theme.modalTextColor};
`;

const ExpenseAmount = styled.div`
  text-overflow: ellipsis;
  color: ${(props) => props.theme.modalTextColor};
`;

const ExpenseText = styled.div`
  display: inline-block;
    pointer-events: none;
    width: 15ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  color: ${(props) => props.theme.modalTextColor};
`;
const RecentExpenses = ({ expenses }) => {
  const expensesForDisplay = [...expenses]
    .sort((a, b) => new Date(b.Date) - new Date(a.Date))
    .slice(0, 5);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
            <HeaderText >
              Date
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
              <ExpenseText >
                {formatDate(expense.Date)}
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
