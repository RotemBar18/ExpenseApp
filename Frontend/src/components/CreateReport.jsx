import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { saveReport } from '../redux/actions/reportsActions';
import useAuth from '../hooks/useAuth';
import useExpenses from '../hooks/useExpenses';

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ReportFormContainer = styled.div`
  background: ${(props) => props.theme.modalBackground || 'white'};
  border-radius: 10px;
  padding: 20px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const FormSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
    & > :nth-child(1) {
    flex: 0 0 12%;
  }

  & > :nth-child(2) {
    flex: 0 0 10%;
  }

  & > :nth-child(3) {
    flex: 0 0 78%;
  }
`;
const SelectAll = styled.div`
display: flex;
flex-direction:column-reverse;
gap: 10px;
align-items: center;
`;

const Label = styled.label`
  font-weight: bold;
  color: ${(props) => props.theme.textColor || '#333'};
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.borderColor || '#ccc'};
  border-radius: 4px;
  background: ${(props) => props.theme.inputBackground || '#fff'};
  color: ${(props) => props.theme.inputTextColor || '#333'};
`;

const ScrollableSection = styled.div`
  max-width: 70%;
  overflow-x: auto;
  padding: 5px;
  display: flex;
  border-radius: 4px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollbarThumb || '#888'};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.scrollbarThumbHover || '#555'};
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0px 10px;
  color: ${(props) => props.theme.textColor || '#333'};
`;

const Month = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0px 10px;
  color: ${(props) => props.theme.textColor || '#333'};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? props.theme.primaryColor || '#007bff' : props.theme.secondaryColor || '#6c757d')};
  color: ${(props) => props.theme.buttonTextColor || 'white'};

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CreateReport = ({ onClose }) => {
  const dispatch = useDispatch();
  const { userId, token } = useAuth();
  const { expenses } = useExpenses(userId);
  const [reportName, setReportName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [includeSummary, setIncludeSummary] = useState(false);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredMonths, setFilteredMonths] = useState([]);
  const [filteredYears, setFilteredYears] = useState([]);

  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [selectAllMonths, setSelectAllMonths] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const filterOptions = () => {
    const categories = [...new Set(expenses.map((expense) => expense.Category).filter(Boolean))];
    const filteredCategories = categories.filter((category) =>
      expenses.some((expense) => {
        const expenseDate = new Date(expense.Date);
        const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' });
        const expenseYear = expenseDate.getFullYear().toString();
        return (
          expense.Category === category &&
          (selectedMonths.length === 0 || selectedMonths.includes(expenseMonth)) &&
          (selectedYears.length === 0 || selectedYears.includes(expenseYear))
        );
      })
    );

    const filteredMonths = months.filter((month) =>
      expenses.some((expense) => {
        const expenseDate = new Date(expense.Date);
        const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' });
        const expenseYear = expenseDate.getFullYear().toString();
        return (
          expenseMonth === month &&
          (selectedCategories.length === 0 || selectedCategories.includes(expense.Category)) &&
          (selectedYears.length === 0 || selectedYears.includes(expenseYear))
        );
      })
    );

    const filteredYears = [...new Set(expenses.map((expense) => new Date(expense.Date).getFullYear().toString()))].filter((year) =>
      expenses.some((expense) => {
        const expenseDate = new Date(expense.Date);
        const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' });
        return (
          expenseDate.getFullYear().toString() === year &&
          (selectedCategories.length === 0 || selectedCategories.includes(expense.Category)) &&
          (selectedMonths.length === 0 || selectedMonths.includes(expenseMonth))
        );
      })
    );

    setFilteredCategories(filteredCategories);
    setFilteredMonths(filteredMonths);
    setFilteredYears(filteredYears);
  };

  useEffect(() => {
    filterOptions();
  }, [selectedCategories, selectedMonths, selectedYears, expenses]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  const handleMonthChange = (event) => {
    const { value, checked } = event.target;
    setSelectedMonths((prev) =>
      checked ? [...prev, value] : prev.filter((month) => month !== value)
    );
  };

  const handleYearChange = (event) => {
    const { value, checked } = event.target;
    setSelectedYears((prev) =>
      checked ? [...prev, value] : prev.filter((year) => year !== value)
    );
  };

  const handleSelectAllCategories = () => {
    setSelectAllCategories(!selectAllCategories);
    if (!selectAllCategories) {
      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectAllMonths = () => {
    setSelectAllMonths(!selectAllMonths);
    if (!selectAllMonths) {
      setSelectedMonths(filteredMonths);
    } else {
      setSelectedMonths([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!reportName || !selectedCategories.length || !selectedMonths.length || !selectedYears.length) {
      alert('Please fill in all fields before creating the report.');
      return;
    }

    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.Date);
      const expenseMonth = expenseDate.toLocaleString('en-US', { month: 'long' }).trim();
      const expenseYear = expenseDate.getFullYear().toString().trim();
      const expenseCategory = expense.Category ? expense.Category.trim() : '';

      const isCategorySelected = selectedCategories.length
        ? selectedCategories.includes(expenseCategory)
        : true;

      const isMonthSelected = selectedMonths.length
        ? selectedMonths.includes(expenseMonth)
        : true;

      const isYearSelected = selectedYears.length
        ? selectedYears.includes(expenseYear)
        : true;

      return isCategorySelected && isMonthSelected && isYearSelected;
    });

    const newReport = {
      name: reportName,
      categories: selectedCategories,
      months: selectedMonths,
      years: selectedYears,
      reportData: filteredExpenses,
      createdAt: new Date().toISOString(),
    };

    dispatch(saveReport(userId, newReport, token));
    onClose();
  };

  const isFormValid = reportName && selectedCategories.length > 0 && selectedMonths.length > 0 && selectedYears.length > 0;

  return (
    <ModalBack onClick={onClose}>
      <ReportFormContainer onClick={(e) => e.stopPropagation()}>
        <h2>Create Report</h2>
        <FormSection>
          <Label>Report Name:</Label>
          <Input
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="Enter report name"
            required
          />
        </FormSection>

        <FormSection>
        <Label>Categories:</Label>

          <SelectAll>
            <input
              type="checkbox"
              checked={selectAllCategories}
              onChange={handleSelectAllCategories}
            />
            <span>
            Select All
              </span>
          </SelectAll>
          <ScrollableSection>
            {filteredCategories.map((category) => (
              <Category key={category}>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                {category}
              </Category>
            ))}
          </ScrollableSection>
        </FormSection>

        <FormSection>
          <Label>Months:</Label>
          <SelectAll>
            <input
              type="checkbox"
              checked={selectAllMonths}
              onChange={handleSelectAllMonths}
            />
            <span>
            Select All

            </span>
          </SelectAll>
          <ScrollableSection>
            {filteredMonths.map((month) => (
              <Month key={month}>
                <input
                  type="checkbox"
                  value={month}
                  checked={selectedMonths.includes(month)}
                  onChange={handleMonthChange}
                />
                {month}
              </Month>
            ))}
          </ScrollableSection>
        </FormSection>

        <FormSection>
          <Label>Select Years:</Label>
          {filteredYears.map((year) => (
            <div key={year}>
              <input
                type="checkbox"
                value={year}
                checked={selectedYears.includes(year)}
                onChange={handleYearChange}
              />
              {year}
            </div>
          ))}
        </FormSection>

        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button primary onClick={handleSubmit} disabled={!isFormValid}>
            Create Report
          </Button>
        </ButtonGroup>
      </ReportFormContainer>
    </ModalBack>
  );
};

export default CreateReport;
