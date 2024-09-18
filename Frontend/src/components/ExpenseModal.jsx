import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatDateToUTC, formatToLocalDate } from '../utils/utilService';

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
  z-index: 1000; /* Ensures the modal is on top */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;
const BoardContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
    background: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const DetailSection = styled.div`
  padding: 10px;
  background: white;
  border-radius: 5px;
`;

const DetailTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const DetailText = styled.textarea`
  margin: 5px 0;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const DetailInput = styled.input`
  margin: 5px 0;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const DetailSelect = styled.select`
  margin: 5px 0;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
  background-color: ${props => (props.primary ? '#007bff' : '#6c757d')};
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;


const ExpenseModal = ({ categories, isOpen, onClose, onUpdate, initialData }) => {
    const [expense, setExpense] = useState(initialData);
    console.log(categories)
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
        const formattedValue =
            name === "Date" ? formatDateToUTC(value) : value;


        setExpense((prev) => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = (e) => {
        onUpdate(expense)
        onClose()
        e.preventDefault();
    };
    if (!isOpen) return null;
    return (
        <ModalBack onClick={onClose} >
            <BoardContainer onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>✕</CloseButton>
                <DetailSection>
                    <DetailTitle>Name</DetailTitle>
                    <DetailInput
                        name="Name"
                        value={expense.Name}
                        onChange={handleChange}
                    />
                </DetailSection>
                <DetailSection>
                    <DetailTitle>Amount</DetailTitle>
                    <DetailInput
                        name="Amount"
                        type="number"
                        value={expense.Amount}
                        onChange={handleChange}
                    />
                </DetailSection>
                <DetailSection>
                    <DetailTitle>Category</DetailTitle>
                    <DetailSelect name="Category" value={expense.Category} onChange={handleChange}>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
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
                    <DetailText
                        name="Description"
                        value={expense.Description}
                        onChange={handleChange}
                    />
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