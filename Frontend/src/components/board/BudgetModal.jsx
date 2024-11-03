import React, { useState } from 'react';
import styled from 'styled-components';
import useBoards from '../../hooks/useBoards';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';

const ModalContent = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${props => (props.type === 'mainBoard' ? '12px' : '')};
  align-items: center;
  font-weight: 600;
  height: 100%;
  padding-top: ${props => (props.type === 'mainBoard' ? '10px' : '')};
  justify-content: ${props => (props.type === 'mainBoard' ? 'space-between' : '')};
  background-color: ${props => (props.type === 'mainBoard' ? props.theme.modalBackground : 'transparent')};
`;

const BudgetInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9rem;
  gap: 10px;
  color: ${(props) => props.theme.modalTextColor || '#666'};
`;

const Label = styled.span`
  color: ${(props) => props.theme.modalTextColor || '#666'};
  cursor: pointer;
`;

const Span = styled.span`
  font-size: 0.9rem;
  cursor: pointer;
  color: ${(props) => props.theme.modalTextColor || '#333'};
`;

const BudgetInput = styled.input`
  font-size: 0.9rem;
  text-align: right;
  padding: 2px 4px;
  border: 1px solid ${(props) => props.theme.border || '#ccc'};
  border-radius: 4px;
  width: 100px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: ${props => (props.type === 'mainBoard' ? '100%' : '20%')};
  background-color: ${(props) => props.theme.border || '#f0f0f0'};
  border-radius: 6px;
  overflow: hidden;
  margin-top: ${props => (props.type === 'mainBoard' ? '' : '5px')};
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => (props.percentage >= 100 ? props.theme.tagBackground || '#ff6b6b' : props.theme.chartColors[0] || '#4fa3f7')};
  transition: width 0.3s ease-in-out;
  border-radius: 6px 0 0 6px;
`;

const BudgetOverview = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.85rem;
  gap: ${props => (props.type === 'mainBoard' ? '' : '10px')};
  color: ${(props) => props.theme.modalTextColor || '#333'};
`;

const SpentText = styled.span`
  color: ${props => (props.percentage >= 100 ? props.theme.tagBackground || '#ff6b6b' : props.theme.chartColors[1] || '#4fa3f7')};
`;

const RemainingText = styled.span`
  color: ${props => (props.remainingBudget >= 0 ? props.theme.buttonBackground || 'green' : props.theme.tagBackground || '#ff6b6b')};
`;

const BudgetModal = ({ type,outBoard ,expenses }) => {
  const { updateBoard } = useBoards(useAuth().userId);
  const [isEditing, setIsEditing] = useState(false);
  const board = useSelector((state) => state.board.selectedBoard||outBoard);
  const [newBudget, setNewBudget] = useState(board?.Budget || 0);
  const budget = parseFloat(board?.Budget) || 0;
  const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.Amount || 0), 0);
  const remainingBudget = budget - totalExpenses;
  const percentage = budget ? Math.min((totalExpenses / budget) * 100, 100) : 0;
  const handleLabelClick = () => setIsEditing(true);

  const handleInputChange = (e) => setNewBudget(e.target.value);

  const handleBlurOrSubmit = () => {
    setIsEditing(false);
    if (newBudget !== budget) {
      updateBoard({ ...board, Budget: parseFloat(newBudget) });
    }
  };

  return (
    <ModalContent type={type}>
      {type === 'mainBoard' && (
        <BudgetInfoRow>
          <div style={{ textAlign: 'start' }}>
            <Label onClick={handleLabelClick}>
              Budget:
            </Label>{' '}
            {isEditing ? (
              <BudgetInput
                type="number"
                value={newBudget}
                onChange={handleInputChange}
                onBlur={handleBlurOrSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleBlurOrSubmit()}
                autoFocus
              />
            ) : (
              <Span onClick={handleLabelClick}>${budget.toFixed(2)}</Span>
            )}
          </div>
        </BudgetInfoRow>
      )}

      <ProgressContainer>
        <ProgressBar type={type} percentage={percentage} />
      </ProgressContainer>

      <BudgetOverview type={type}>
        <SpentText style={{ textAlign: 'start' }} percentage={percentage}>
          {percentage.toFixed(0)}% spent
        </SpentText>
        <RemainingText style={{ textAlign: 'end' }} remainingBudget={remainingBudget}>
          {remainingBudget >= 0
            ? `$${remainingBudget.toFixed(2)} remaining`
            : `Exceeded by $${Math.abs(remainingBudget).toFixed(2)}`}
        </RemainingText>
      </BudgetOverview>
    </ModalContent>
  );
};

export default BudgetModal;
