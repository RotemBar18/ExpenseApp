import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { saveReport } from '../../redux/actions/reportsActions';
import useAuth from '../../hooks/useAuth';
import useExpenses from '../../hooks/useExpenses';
import { filterCategories, filterYears, filterExpenses, filterMonths, createNewReport, } from '../../utils/reportService';

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
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: ${(props) => props.theme.textColor || '#333'};
  flex: 1;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.borderColor || '#ccc'};
  border-radius: 4px;
  background: ${(props) => props.theme.inputBackground || '#fff'};
  color: ${(props) => props.theme.inputTextColor || '#333'};
  flex: 2;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.primaryColor || '#007bff'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) =>
    props.primary ? props.theme.primaryColor || '#007bff' : props.theme.secondaryColor || '#6c757d'};
  color: ${(props) => props.theme.buttonTextColor || 'white'};
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) =>
    props.primary ? props.theme.primaryHoverColor || '#0056b3' : props.theme.secondaryHoverColor || '#5a6268'};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SelectStyled = styled(Select)`
  .react-select__control {
    border: 1px solid ${(props) => props.theme.borderColor || '#ccc'};
    border-radius: 4px;
    box-shadow: none;
    transition: border-color 0.2s;

    &:hover {
      border-color: ${(props) => props.theme.primaryColor || '#007bff'};
    }
  }

  .react-select__menu {
    border-radius: 4px;
    overflow: hidden;
  }
`;

const CreateReportModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { userId, token } = useAuth();
  const board = useSelector((state) => state.board.selectedBoard);
  const boardId = board.ExpenseBoardId
  const { expenses } = useExpenses({board});
  
  console.log(board)
  console.log(expenses)
  const [reportName, setReportName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredMonths, setFilteredMonths] = useState([]);
  const [filteredYears, setFilteredYears] = useState([]);

  const monthOptions = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ];

  const categoryOptions = filteredCategories.map((category) => ({
    value: category,
    label: category,
  }));

  const filterOptions = () => {
    const categories = filterCategories(expenses, selectedMonths.map((m) => m.value), selectedYears);
    setFilteredCategories(categories);

    const months = filterMonths(expenses, selectedCategories.map((c) => c.value), selectedYears, monthOptions.map((m) => m.value));
    setFilteredMonths(months.map((month) => ({ value: month, label: month })));

    const years = filterYears(expenses, selectedCategories.map((c) => c.value), selectedMonths.map((m) => m.value));
    setFilteredYears(years);
  };

  useEffect(() => {
    filterOptions();
  }, [selectedCategories, selectedMonths, selectedYears, expenses]);

  const handleYearChange = (event) => {
    const { value, checked } = event.target;
    setSelectedYears((prev) =>
      checked ? [...prev, value] : prev.filter((year) => year !== value)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!reportName || !selectedCategories.length || !selectedMonths.length || !selectedYears.length) {
      alert('Please fill in all fields before creating the report.');
      return;
    }

    const filteredExpenses = filterExpenses(
      expenses,
      selectedCategories.map((c) => c.value),
      selectedMonths.map((m) => m.value),
      selectedYears
    );
    const newReport = createNewReport(
      reportName,
      selectedCategories.map((c) => c.value),
      selectedMonths.map((m) => m.value),
      selectedYears,
      filteredExpenses
    );

    dispatch(saveReport(boardId,userId, newReport, token));
    onClose();
  };

  const isFormValid =
    reportName && selectedCategories.length > 0 && selectedMonths.length > 0 && selectedYears.length > 0;

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

        {filteredCategories.length > 0 && (
          <FormSection>
            <Label>Categories:</Label>
            <SelectStyled
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={(selected) => setSelectedCategories(selected || [])}
              placeholder="Select categories..."
              closeMenuOnSelect={false}
            />
          </FormSection>
        )}

        {filteredMonths.length > 0 && (
          <FormSection>
            <Label>Months:</Label>
            <SelectStyled
              isMulti
              options={filteredMonths}
              value={selectedMonths}
              onChange={(selected) => setSelectedMonths(selected || [])}
              placeholder="Select months..."
              closeMenuOnSelect={false}
            />
          </FormSection>
        )}

        {filteredYears.length > 0 && (
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
        )}

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

export default CreateReportModal;
