import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatDateForMySQL, formatToLocalDate } from '../utils/utilService';

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

const BoardContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.modalBackground};
  padding: 20px;
  width: 90%; 
  max-width: 400px; 
  max-height: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow-y: auto; 

  @media (max-width: 768px) {
    width: 95%; 
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%; 
    padding: 10px; 
  }
      &::-webkit-scrollbar {
    width: 6px;
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: ${(props) => props.theme.modalTextColor};
`;

const DetailSection = styled.div`
  padding: 10px;
  background: ${(props) => props.theme.modalBackground};
  border-radius: 5px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    padding: 8px; 
      }
`;

const DetailTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${(props) => props.theme.headerTextColor};

  @media (max-width: 480px) {
    font-size: 16px; 
  }
`;

const DetailInput = styled.input`
  margin: 5px 0;
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 4px;
  color: ${(props) => props.theme.inputTextColor};
  background: ${(props) => props.theme.inputBackground};

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px;
  }
`;

const DetailSelect = styled.select`
  margin: 5px 0;
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 4px;
  color: ${(props) => props.theme.inputTextColor};
  background: ${(props) => props.theme.inputBackground};

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px;
  }
`;

const DetailText = styled.textarea`
  margin: 5px 0;
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 4px;
  color: ${(props) => props.theme.inputTextColor};
  background: ${(props) => props.theme.inputBackground};

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 480px) {
    justify-content: center; 
    gap: 5px; 
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? props.theme.buttonBackground : props.theme.inputBackground)};
  color: ${(props) => (props.primary ? props.theme.buttonTextColor : props.theme.inputTextColor)};
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 10px;
  }
`;

const ExpenseModal = ({ categories, isOpen, onClose, onUpdate, initialData }) => {
  const [expense, setExpense] = useState(initialData);
  const [currCategory] = useState(expense.Category);

  useEffect(() => {
    if (initialData) {
      setExpense({
        ...initialData,
        Date: formatToLocalDate(initialData.Date),
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "Date" ? formatDateForMySQL(value) : value;
    setExpense((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    onUpdate(expense);
    onClose();
    e.preventDefault();
  };

  if (!isOpen) return null;
  return (
    <ModalBack onClick={onClose}>
      <BoardContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <DetailSection>
          <DetailTitle>Name</DetailTitle>
          <DetailInput name="Name" value={expense.Name} onChange={handleChange} />
        </DetailSection>
        <DetailSection>
          <DetailTitle>Amount</DetailTitle>
          <DetailInput name="Amount" type="number" value={expense.Amount} onChange={handleChange} />
        </DetailSection>
        <DetailSection>
          <DetailTitle>Category</DetailTitle>
          <DetailSelect name="Category" value={expense.Category} onChange={handleChange}>
            <option key={currCategory} value={currCategory}>
              {currCategory}
            </option>
            {categories
              .filter((cat) => cat !== 'Manage Categories:   ' && cat !== currCategory)
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </DetailSelect>
        </DetailSection>
        <DetailSection>
          <DetailTitle>Date</DetailTitle>
          <DetailInput
            name="Date"
            type="date"
            value={expense.Date ? expense.Date.slice(0, 10) : ""}
            onChange={handleChange}
          />
        </DetailSection>
        <DetailSection>
          <DetailTitle>Description</DetailTitle>
          <DetailText name="Description" value={expense.Description} onChange={handleChange} />
        </DetailSection>
        <ButtonGroup>
          <Button primary onClick={handleSubmit}>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </BoardContainer>
    </ModalBack>
  );
};

export default ExpenseModal;
