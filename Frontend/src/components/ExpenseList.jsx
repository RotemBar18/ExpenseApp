import styled from 'styled-components';
import Expense from './Expense';
import { useState, useEffect } from 'react';
import { filterAndSortExpenses } from '../utils/sortAndFilterService';
import FilterModal from './FilterExpensesModal';

const Boardcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.background};
  padding: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const ExpenseListContainer = styled.div`
  color: ${(props) => props.theme.modalTextColor};
  background-color: ${(props) => props.theme.modalBackground};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  border-radius: 10px;
  width: 95%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);


  @media (max-width: 1000px) {
    padding: 15px;
    width:80%;

  }

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

const ExpensesTable = styled.ul`
  list-style: none;
  padding: 0px 10px;
  margin: 0;
`;

const Header = styled.h3`
  margin: 0;
  padding-bottom: 15px;
  border-bottom: 2px solid ${(props) => props.theme.border};
  font-size: 1.8em;
  color: ${(props) => props.theme.headerTextColor};

  @media (max-width: 768px) {
    font-size: 1.5em;
  }

  @media (max-width: 480px) {
    font-size: 1.2em;
  }
`;

const ExpenceHeader = styled.div`
  display: flex;
  margin-right: 10px;
  padding: 1%;
  justify-content: space-between;

`;

const HeaderText = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border};
  width: 30%;

`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4%;
  padding: 10px 0;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: baseline;
    gap: 10px;
  }
`;

const SortSelect = styled.select`
  margin: 10px;
  padding: 8px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.inputTextColor};
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 50%;
    font-size: 0.8rem;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  margin: 10px;
  font-size: 1rem;
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
  padding: 5px 10px;
  border: none;
  cursor: pointer;
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

          <select id="numExpenses" value={numExpensesToShow} onChange={handleNumExpensesChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="0">All</option>
          </select>

          <Button onClick={() => setIsFilterModalOpen(true)}>Filter</Button>
        </SelectContainer>

        <ExpensesTable>
          <ExpenceHeader>
            <HeaderText>Name</HeaderText>
            <HeaderText>Category</HeaderText>
            <HeaderText>Date</HeaderText>
            <HeaderText>Price</HeaderText>
            <HeaderText style={{ border: 'none', width: '20px', height: '20px' }}></HeaderText>
          </ExpenceHeader>

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
