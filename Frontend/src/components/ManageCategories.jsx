import React, { useState } from 'react';
import styled from 'styled-components';

const ManageCategoriesContainer = styled.div`
    text-align: left;
    width:200px;
    display:flex;
    flex-direction: column;
    align-items: center;
    border-radius:10px;
`;
const Header = styled.h2`
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 11px;
`;

const ExpenseInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 11px;
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

const CategoryList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CategoryListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const CategoryDeleteButton = styled.button`
    background-color: #FF6347;
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #FF4500;
    }
`;

const ManageCategories = ({ preferences, onAddCategory, onDeleteCategory }) => {
    const [newCategory, setNewCategory] = useState(''); // New category input
    const categories = preferences.DefaultCategories
    
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            onAddCategory(newCategory);
            setNewCategory('');
        }
    };

    return (
        <ManageCategoriesContainer>
            <Header>Manage Categories</Header>
            <ExpenseInput
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />
            <AddButton type="button" onClick={handleAddCategory}>
                Add Category
            </AddButton>

            <CategoryList>
                {categories.map((cat) => (
                    <CategoryListItem key={cat}>
                        {cat}
                        <CategoryDeleteButton onClick={() => onDeleteCategory(cat)}>
                            Delete
                        </CategoryDeleteButton>
                    </CategoryListItem>
                ))}
            </CategoryList>
        </ManageCategoriesContainer>
    );
};

export default ManageCategories;
