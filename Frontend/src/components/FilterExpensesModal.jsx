import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.h3`
  margin: 0;
`;

const Label = styled.span`

`;

const CaregorySelect = styled.select`
    margin-left:20px;
    max-height:20px;
    overflow-y:auto; 
`;
const DateInput = styled.input`
    margin-left:20px
`;

const SubmitContainer = styled.div`
display:flex;
justify-content: space-around
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const FilterModal = ({ expenses, isOpen, onClose, onApplyFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const getUniqueCategories = (expenses) => {
        const categories = [];
        expenses.forEach((expense) => {
            if (!categories.includes(expense.Category)) {
                categories.push(expense.Category);
            }
        });

        return categories;
    };


    const categories = getUniqueCategories(expenses)

    if (!isOpen) return null;

    const handleApplyFilter = () => {
        const filterValues = {
            category: selectedCategory || null, // Use null if no category is selected
            dateRange: {
                start: startDate || null, // Use null if start date is empty
                end: endDate || null,    // Use null if end date is empty
            },
            minAmount: minAmount !== '' ? parseFloat(minAmount) : null, // Use null if minAmount is empty
            maxAmount: maxAmount !== '' ? parseFloat(maxAmount) : null, // Use null if maxAmount is empty
        };

        onApplyFilter(filterValues);
        onClose();
    };


    return (
        <ModalBackground onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>Filter Options</ModalHeader>

                <Label>
                    Category:
                    <CaregorySelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </CaregorySelect>
                </Label>

                <Label>
                    from -&gt; to:
                    <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Label>
                <Label style={{ display: 'flex', flexDirection: '' }}>

                    <Label>
                        <span>Min Amount:</span>
                        <input
                            type="number"
                            placeholder="Min Amount"
                            value={minAmount}
                            onChange={(e) => setMinAmount(e.target.value)}
                        />
                    </Label>
                    <Label>
                        <span>Max Amount:</span>
                        <input
                            type="number"
                            placeholder="Max Amount"
                            value={maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value)}
                        />
                    </Label>
                </Label>



                <SubmitContainer>
                    <ModalButton onClick={handleApplyFilter}>Apply Filter</ModalButton>
                    <ModalButton onClick={onClose} style={{ backgroundColor: 'gray' }}>
                        Cancel
                    </ModalButton>
                </SubmitContainer>
            </ModalContainer>
        </ModalBackground >
    );
};

export default FilterModal;
