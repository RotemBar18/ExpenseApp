import styled from 'styled-components';


const ExpenseListContainer = styled.div`
  padding: 10px;
  color:#bbbbbb ;
  background-color:#1b1b1b;
  display:flex;
  flex-direction:column;
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
  display:flex;
  flex-direction:column;
`;

const Header = styled.div`
  margin: 0;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 800;
  border-bottom: 1px solid #585858;
`;

const ExpenceHeader = styled.div`
display:flex;
justify-content: flex-start;

`;


const HeaderText = styled.div`
  font-weight: 800;
  min-width:15ch;
  overflow: hidden;
  margin-right:33px;
`;
const HeaderPrice = styled.div`
  font-weight: 800;
`;
const Expense = styled.div`
  display: flex;
  cursor:pointer;
;`

const ExpenseAmount = styled.div`
  text-overflow:ellipsis;
  
`;

const ExpenseText = styled.div`
  text-overflow:ellipsis;
  min-width:15ch;
  margin-right:40px;
`;

const RecentExpenses = ({ expenses }) => {
    const expensesForDisplay = expenses.slice(-5).reverse();

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
