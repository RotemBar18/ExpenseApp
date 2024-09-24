import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const ManageCategoriesContainer = styled.div`
  border-radius: 10px;
  padding:0px 0px 10px 0px ;
  margin-top: 20px;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  border: none;
  color: ${(props) => props.theme.modalTextColor};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollBarThumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.scrollBarTrack};
    border-radius: 4px;
  }
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid ${(props) => (props.special ? props.theme.border : 'transparent')};

  ${(props) =>
    props.special &&
    `
      font-weight: bold;
    `}
`;

const AddCategoryForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  padding: 0px 12px;
`;

const Input = styled.input`
  padding: 8px;
  flex: 1;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.buttonBackground};
  }
`;

const Button = styled.button`
  padding: 8px;
  background-color: ${(props) => props.theme.navBarBackground};
  color: ${(props) => props.theme.navBarTextColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    color: ${(props) => props.theme.buttonHoverTextColor};
  }
`;

const AddButton = styled(Button)`
  background-color: ${(props) => props.theme.navBarBackground};
  color: ${(props) => props.theme.navBarTextColor};

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const ManageCategories = ({ onUpdatePreferences }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const { preferences } = useAuth();

  useEffect(() => {
    setCategories(
      Array.isArray(preferences.DefaultCategories)
        ? preferences.DefaultCategories
        : []
    );
  }, [preferences]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      onUpdatePreferences({
        ExpensesThemeColor: preferences.ExpensesThemeColor,
        DefaultCategories: updatedCategories
      });
      setCategories(updatedCategories);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (category) => {
    const updatedCategories = categories.filter(
      (cat) => cat !== category && cat.trim() !== ''
    );
    setCategories(updatedCategories);
    onUpdatePreferences({
      ExpensesThemeColor: preferences.ExpensesThemeColor,
      DefaultCategories: updatedCategories
    });
  };

  return (
    <ManageCategoriesContainer>
      <CategoryList>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <CategoryItem
              key={index}
              special={category === 'Manage Categories:   '}
            >
              {category}
              {category !== 'Manage Categories:   ' && (
                <Button onClick={() => handleDeleteCategory(category)}>
                  Remove
                </Button>
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
