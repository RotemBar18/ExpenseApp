import React, { useState } from 'react';
import styled from 'styled-components';
import { addExpense } from '../utils/expenseService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position:fixed;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.modalBackground};
  opacity: 0.8;
  z-index: 1;
`;

const AddExpenseContainer = styled.div`
  position: fixed; /* Position fixed to stay in place relative to the viewport */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Offset by 50% of its height and width to truly center it */
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  border-radius: 10px;
  max-width: 280px;
  width: 250px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 2; /* Ensure it appears above the overlay */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  margin: 0;
  padding-bottom: 15px;
  font-size: 1.5em;
  color: ${(props) => props.theme.headerTextColor};
`;

const ExpenseInput = styled.input`
  padding: 10px;
  width: 90%;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  font-size: 12px;
  color: ${(props) => props.theme.inputTextColor};
  background-color: ${(props) => props.theme.inputBackground};
`;

const ExpenseSelect = styled.select`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  font-size: 12px;
  color: ${({ value, theme }) => (value === '' ? theme.inputTextColor : 'black')};
  background-color: ${(props) => props.theme.inputBackground};
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.buttonBackground};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.1s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    color: ${(props) => props.theme.buttonHoverTextColor};
  }

  &:active {
    transform: translateY(4px);
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
    < Container style={{ display: 'flex' }}>
      <ModalBack onClick={onClose} />
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
          <AddButton type="submit">Add Expense</AddButton>
        </Form>


      </AddExpenseContainer>
    </Container>
  );
};

export default AddExpense;
