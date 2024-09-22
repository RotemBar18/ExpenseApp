import React, { useState } from 'react';
import styled from 'styled-components';
import { addExpense } from '../utils/expenseService';


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
`;
const AddExpenseContainer = styled.div`
    display: flex;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    max-width: 300px;
    width:250px;
    position: fixed;
  top: 80;
  left: 280;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width:60%;
`;

const Header = styled.div`
    margin: 0;
    padding-bottom: 15px;
    font-size: 1.5em;
`;

const ExpenseInput = styled.input`
    padding: 10px;
    width: 90%;
    margin-bottom: 10px;
        border: none;

    border-radius: 5px;
    font-size: 12px;
`;

const ExpenseSelect = styled.select`
    padding: 10px;
    padding-left:7px;
    width: 108%;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    color: ${({ value }) => (value === "" ? "gray" : "black")}; /* Style for placeholder */
`;

const AddButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #6A956A;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.1s ease;
    font-family: 'comic sans ms';

    &:hover {  
        color: #386238;
    }
    &:active {
        transform: translateY(4px);
    }
`;

const AddExpense = ({ categories, userId, onAdd, onClose }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(''); // Selected category

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
            const response = await addExpense(token, newExpense);
            onAdd(response);
            setName('');
            setAmount('');
            setCategory('');
            setDescription('');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };



    return (
        < div style={{ display: 'flex' }}>
            <ModalBack onClick={onClose} />
            <AddExpenseContainer>
                <Header>Add New Expense</Header>
                <Form onSubmit={handleSubmit}>
                    <ExpenseInput
                        type="text"
                        name="name"
                        placeholder="Expense Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Category Dropdown */}
                    <ExpenseSelect
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>Select Category</option>
                        {categories
                            .filter((cat) => cat !== 'Manage Categories:   ') // Filter out the unwanted category
                            .map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                    </ExpenseSelect>

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
        </div>
    );
};

export default AddExpense;
