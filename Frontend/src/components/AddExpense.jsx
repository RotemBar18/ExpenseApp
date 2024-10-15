import React, { useState } from 'react';
import styled from 'styled-components';
import { addExpense } from '../utils/expenseService';


const AddExpenseContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
padding:10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin: 0;
  padding-bottom: 15px;
  font-size: 1em;
  font-weight: bold;
  color: ${(props) => props.theme.headerTextColor};
  &:hover{
  cursor:pointer;
  }
`;

const ExpenseInput = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  font-size: 12px;
  color: ${(props) => props.theme.inputTextColor};
  background-color: ${(props) => props.theme.inputBackground};
`;

const ExpenseSelect = styled.select`
  padding: 5px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  font-size: 12px;
  color: ${({ value, theme }) => (value === '' ? theme.inputTextColor : 'black')};
  background-color: ${(props) => props.theme.inputBackground};
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonBase = styled.button`
  padding: 2px 8px;
  font-size: 1rem;
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.1s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: ${(props) => props.theme.buttonHoverTextColor};
  }
`;

const AddButton = styled(ButtonBase)`
  background-color: ${(props) => props.theme.buttonBackground};

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const CloseButton = styled(ButtonBase)`
  background-color: red;

  &:hover {
    opacity: 0.6;
  }
`;



const AddExpense = ({ categories, userId, onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const newExpense = {
      Name: name,
      Amount: amount,
      Category: category,
      Description: description,
      UserId: userId
    };

    try {
      await addExpense(token, newExpense);
      onAdd();
      setName('');
      setAmount('');
      setCategory('');
      setDescription('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };



  return (
    <AddExpenseContainer>
      <Header>Add New Expense</Header>
      <Form onSubmit={handleSubmit}>

        <ExpenseSelect
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required>
          <option value="" disabled hidden>Select Category</option>
          {categories
            .filter((cat) => cat !== 'Manage Categories:   ')
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </ExpenseSelect>

        <ExpenseInput
          type="text"
          name="name"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />



        <ExpenseInput
          type="number"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <ExpenseInput
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Buttons>
          <AddButton type="submit">Add</AddButton>
          <CloseButton onClick={onClose}>Cancel</CloseButton>
        </Buttons>

      </Form>


    </AddExpenseContainer>
  );
};

export default AddExpense;
