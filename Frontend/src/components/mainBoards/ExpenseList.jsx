import styled from 'styled-components';
import Expense from '../expense/Expense';
import { useState, useEffect } from 'react';
import { filterAndSortExpenses } from '../../utils/sortAndFilterService';
import FilterModal from '../expense//FilterExpensesModal';

const Boardcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background};
  overflow-y:hidden;

`;

const ExpenseListContainer = styled.div`
  color: ${(props) => props.theme.modalTextColor};
  background-color: ${(props) => props.theme.modalBackground};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Poppins', sans-serif;
  border-radius: 5px;
  width:100%;
  height:100%;
`;

const ExpensesTable = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0;
  height:70%;
    @media (max-width: 780px) {
      height:45%;

    }    
    @media (max-width: 450px) {
      height:35%;
    }
`;
const Expenses = styled.ul`
padding: 10px 20px;
height:100%;
overflow-y:auto;
&::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: ${(props) => props.theme.scrollBarTrack};
  border-radius: 10px;
  
  
}

&::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollBarThumb};
  border-radius: 10px;
  
}

&::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.scrollBarThumbHover || props.theme.scrollBarThumb};
  cursor: pointer;
}
`;


const Header = styled.h3`
padding: 20px 20px 0 ;
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.headerTextColor};

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ExpenceHeader = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  transition: background-color 0.3s, border-radius 0.1s;
  cursor: pointer;
  margin:0 20px;
  padding-right:37px;

`;

const HeaderText = styled.div`
  display: inline-block;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
width:40%;
  color: ${(props) => props.theme.textColor};
  `;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
    gap: 20px;
  margin:10px 20px;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: baseline;
    gap:5px;

  }
`;

const SortSelect = styled.select`
padding: 8px 5px;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.inputTextColor};
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 50%;
    font-size: 0.6rem;
  }
`; const Select = styled.select`
padding: 8px 5px;
font-size: 0.8rem;
color: ${(props) => props.theme.inputTextColor};
border: 1px solid ${(props) => props.theme.inputBorderColor};
border-radius: 5px;
  cursor: pointer;

`;

const SearchInput = styled.input`
padding: 8px 5px;
font-size: 0.8rem;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.inputTextColor};

  @media (max-width: 768px) {
    width: 50%;
    font-size: 0.8rem;
  }
`;

const Button = styled.button`
  padding: 8px 5px;
  border: none;
  cursor: pointer;
font-size: 0.8rem;

  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  border-radius: 5px;

  &:hover {
    color: ${(props) => props.theme.buttonHoverTextColor};
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
  }
`;
const ExpenseList = ({ expenses, onDelete, onUpdate, categories }) => {
  const [numExpensesToShow, setNumExpensesToShow] = useState(10);
  const [sortOption, setSortOption] = useState('date-asc');
  const [filterOptions, setFilterOptions] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultFilterOptions = {
    category: '',
    dateRange: { start: '1990-01-01', end: '2220-01-01' },
    minAmount: 0,
    maxAmount: Number.MAX_VALUE,
  };

  useEffect(() => {
    setFilterOptions(defaultFilterOptions);
    setSortOption('date-asc');
  }, []);

  const filteredAndSortedExpenses = filterAndSortExpenses(expenses, filterOptions, sortOption).filter(
    (expense) =>
      expense.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.Category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUpdate = (updatedExpense) => {
    onUpdate(updatedExpense);
  };

  const handleFilterApply = (newFilterOptions) => {
    const { category, dateRange, minAmount, maxAmount } = newFilterOptions;

    const updatedFilterOptions = {
      category: category || '',
      dateRange: {
        start: dateRange.start || '1997-01-01',
        end: dateRange.end || '2220-01-01',
      },
      minAmount: minAmount !== '' ? parseFloat(minAmount) : 0,
      maxAmount: maxAmount !== '' ? parseFloat(maxAmount) : Number.MAX_VALUE,
    };
    setFilterOptions(updatedFilterOptions);
  };

  const handleNumExpensesChange = (e) => {
    const value = e.target.value === 'all' ? expenses.length : parseInt(e.target.value);
    setNumExpensesToShow(value);
  };

  const expensesForDisplay = filteredAndSortedExpenses.slice(-numExpensesToShow).reverse();
  return (
    <Boardcontainer>
      <ExpenseListContainer>
        <Header>Expenses</Header>

        <SelectContainer>
          <SearchInput
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <SortSelect value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="date-asc">Date (Newest First)</option>
            <option value="date-desc">Date (Oldest First)</option>
            <option value="amount-asc">Amount (High to Low)</option>
            <option value="amount-desc">Amount (Low to High)</option>
            <option value="category-asc">Category (Z-A)</option>
            <option value="category-desc">Category (A-Z)</option>
          </SortSelect>

          <Select id="numExpenses" value={numExpensesToShow} onChange={handleNumExpensesChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="0">All</option>
          </Select>

          <Button onClick={() => setIsFilterModalOpen(true)}>Filter</Button>
        </SelectContainer>

        <ExpensesTable>
          <ExpenceHeader>
            <HeaderText>Name</HeaderText>
            <HeaderText>Category</HeaderText>
            <HeaderText>Date</HeaderText>
            <HeaderText>Price</HeaderText>
          </ExpenceHeader>
          <Expenses>

            {expensesForDisplay.map((expense, index) => (
              <Expense
                categories={categories}
                key={expense.ExpenseId}
                index={index}
                onDelete={onDelete}
                expense={expense}
                onUpdate={handleUpdate}
              />
            ))}
          </Expenses>

        </ExpensesTable>

        <FilterModal
          expenses={expenses}
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilter={handleFilterApply}
          categories={categories}
        />
      </ExpenseListContainer>
    </Boardcontainer>
  );
};

export default ExpenseList;
