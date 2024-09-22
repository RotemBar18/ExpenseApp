// src/components/ManageCategories.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth'; // Import the custom hook

const ManageCategoriesContainer = styled.div`
  padding: 5px;
  border-radius: 8px;
  max-width: 300px; /* Optional: Adjust to fit your layout */
  margin: auto;
`;


const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  border: none;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
    
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666666;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
        border-radius: 4px;

  }
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border: none;
  &:last-child {
    border-bottom: none;
  }
    ${(props) =>
    props.special &&
    `
      font-weight: bold;
      padding: 5px;
      margin: 0px 12px;
      border-bottom: 1px solid #ddd;
    `}
`;

const AddCategoryForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 0px;
  padding:0px 12px;
`;

const Input = styled.input`
  padding: 8px;
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
  }
`;

const Button = styled.button`
  padding: 8px;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
    color: #222;

  }
`;
const AddButton = styled.button`
  padding: 8px;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #666666;
    color: #dddddd;

  }
`;


const ManageCategories = ({ onUpdatePreferences }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState();
  const { preferences } = useAuth(); // Get preferences from useAuth

  useEffect(() => {
    setCategories(Array.isArray(preferences.DefaultCategories) ? preferences.DefaultCategories : []);
  }, [preferences]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      onUpdatePreferences({ DefaultCategories: updatedCategories });
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (category) => {
    // Filter out the selected category
    const updatedCategories = categories.filter((cat) => cat !== category && cat.trim() !== "");
    setCategories(updatedCategories);
    onUpdatePreferences({ DefaultCategories: updatedCategories });
  };
  return (
    <ManageCategoriesContainer>
      <CategoryList>
        {Array.isArray(categories) ? (
          categories.map((category, index) => (
            <CategoryItem
              key={index}
              special={category === 'Manage Categories:   '}>
              {category}
              {category !== 'Manage Categories:   ' && (
                <Button onClick={() => handleDeleteCategory(category)}>Remove</Button>
              )}
            </CategoryItem>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </CategoryList>
      <AddCategoryForm onSubmit={handleAddCategory}>
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
        />
        <AddButton type="submit">Add Category</AddButton>
      </AddCategoryForm>
    </ManageCategoriesContainer>
  );
};

export default ManageCategories;
