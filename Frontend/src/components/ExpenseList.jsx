import styled from 'styled-components';
import Expense from './Expense';
import { useState ,useEffect} from 'react';
import {  filterAndSortExpenses } from '../utils/sortAndFilterService';
import FilterModal from './FilterExpensesModal';

const ExpenseListContainer = styled.div`
  position: fixed;
    display:flex;
    color:#bbbbbb;
    flex-direction: column;
    align-items: flex-start;
  background-color:#1b1b1b;
    margin-left:290px;
    font-family: Poppins;
    margin-top:120px;
    padding:20px;
    border-radius:10px;
    gap:40px;
      


 ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
   background:background:${(props) => props.color === 'black' ? '#555' : '#aaa'};;
    margin-top:10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
  width:80%;
      background:${(props) => props.color === 'black' ? '#333' : '#ccc'};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background:${(props) => props.color === 'black' ? '#555' : '#aaa'};
    cursor:pointer;
  }
`;

const ExpensesTable = styled.ul` 
  list-style: none;
  padding: 0;
  margin: 0;
    overflow-y: auto;
  max-height: 400px;

`;

const Header = styled.h3`
  margin: 0;
  padding-bottom: 15px;
  border-bottom: 2px solid;
  font-size: 1.5em;
`;

const ExpenceHeader = styled.div`
display:flex;
padding:15px;
gap:60px;

`;


const HeaderText = styled.div`
  font-weight: 600;
  overflow: hidden;
  text-align: center;
  border-bottom: 1px solid;
  padding-bottom:2px;
  
`;

const SelectContainer = styled.div`
  display:flex;
`;
const SortSelect = styled.select`
  margin: 10px;
  padding: 8px;
  font-size: 16px;
`;


const AmountSelect = styled.div`
  margin-bottom: 15px;
`;

const ExpenseList = ({ expenses, onDelete, onUpdate, categories }) => {
  const [numExpensesToShow, setNumExpensesToShow] = useState(10);
  const [sortOption, setSortOption] = useState('date-asc'); // Default sorting option
  const [filterOptions, setFilterOptions] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
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


  const filteredAndSortedExpenses = filterAndSortExpenses(expenses, filterOptions, sortOption);

  const handleUpdate = (updatedExpense) => {
    onUpdate(updatedExpense);
    setIsModalOpen(false);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterApply = (newFilterOptions) => {
    const { category, dateRange, minAmount, maxAmount } = newFilterOptions;
    
    const updatedFilterOptions = {
      category: category || '', 
      dateRange: {
        start: dateRange.start || "1997-01-01",  
        end: dateRange.end || new Date().toISOString().split('T')[0],  
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
    <>
      <ExpenseListContainer
      >
        <Header>Expenses
          <button onClick={() => setIsFilterModalOpen(true)}>Filter</button>

        </Header>

        <SelectContainer>
          <AmountSelect>
            <select id="numExpenses" value={numExpensesToShow} onChange={handleNumExpensesChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="0">All</option>
            </select>
          </AmountSelect>
          <SortSelect value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="date-asc">Date (Newest First)</option>
            <option value="date-desc">Date (Oldest First)</option>
            <option value="amount-asc">Amount (High to Low)</option>
            <option value="amount-desc">Amount (Low to High)</option>
            <option value="category-asc">Category (Z-A)</option>
            <option value="category-desc">Category (A-Z)</option>
          </SortSelect>
        </SelectContainer>

        <ExpensesTable>
          <ExpenceHeader>
            <HeaderText >
              Name
            </HeaderText>
            <HeaderText >
              Category
            </HeaderText>
            <HeaderText >
              Price
            </HeaderText>
          </ExpenceHeader>
          {expensesForDisplay.map((expense, index) => (
            <Expense
              categories={categories}
              key={expense.ExpenseId}
              index={index}
              onDelete={onDelete}
              expense={expense}
              onUpdate={handleUpdate}
            >
            </Expense>
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
    </>
  );
};

export default ExpenseList;
