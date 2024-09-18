import styled from 'styled-components';
import deleteIconWhite from "./assets/deleteWhite.png";
import deleteIconBlack from "./assets/deleteBlack.png";
import React from 'react';
import { useState } from 'react';
import ExpenseModal from './ExpenseModal'

const ExpenseContainer = styled.div`
`

const ExpenseItem = styled.li`
  padding: 15px; 
  border-bottom: 1px solid #aa88aa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-right:10px;
  transition: background-color 0.3s,border-radius:0.1s;
  cursor:pointer;
  &:hover {
    border-radius:10px;
    background-color: ${(props) => props.color == 'white' ? 'white' : 'black'};
    color: ${(props) => props.color == 'white' ? 'black' : 'white'};
  }
`;


const ExpenseText = styled.div`
 display: inline-block;
  pointer-events: none;
  width: 10ch;
  overflow: hidden;
  text-overflow: ellipsis; 
  white-space: nowrap; 
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  padding :1px;
`;

const Img = styled.img`
    max-width:20px;
    transition: scale 0.3s;
    cursor:pointer;
  &:hover {
     transform: scale(1.3);
    }
    &:active {
      transform: scale(1);
   }
      
`;

const Expense = ({ color, expense, onDelete, onUpdate, categories }) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleExpenseClick = (e) => {
    setIsExpenseModalOpen(true)
  };
  const closeModal = (e) => {
    setIsExpenseModalOpen(false)
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const iconSrc = isHovered ? deleteIconWhite : deleteIconBlack;
  return (
    <ExpenseContainer>

      <ExpenseItem
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleExpenseClick}
        style={{ borderColor: color }}>
        <ExpenseText >
          {expense.Name}
        </ExpenseText>
        <ExpenseText>
          {expense.Category}
        </ExpenseText>
        <ExpenseText >
          ${expense.Amount}
        </ExpenseText>
        <Buttons>
          <Img
            src={iconSrc}
            color={color}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(expense.ExpenseId);
            }} />
        </Buttons>

      </ExpenseItem>
      {
        isExpenseModalOpen && (
          <ExpenseModal
            categories={categories}
            isOpen={isExpenseModalOpen}
            onClose={closeModal}
            onUpdate={onUpdate}
            initialData={expense}
          />
        )
      }

    </ExpenseContainer>

  );
};

export default Expense;
