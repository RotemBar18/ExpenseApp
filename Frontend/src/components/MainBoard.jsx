// src/components/MainBoard.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddExpense from './AddExpense';
import RecentExpenses from './RecentExpenses';


const MainBoardContainer = styled.div`
    position: fixed;
    display:flex;
    flex-wrap: wrap;
    width:95%;
    height:100vw;
    background-color:#0a0a0a;
    padding-left:290px;
    padding-top:120px;
    gap:40px;
    `
const QuickAccessBoard = styled.div`
 
    `
const QuickAccessBtn = styled.button`
        cursor:pointer;
    `


const MainBoard = ({ categories, userId, expenses, reloadExpenses }) => {
    const [quickAccessKind, setQuickAccessKind] = useState("")

    const handleAddExpense = async (newExpense) => {
        try {
            reloadExpenses();
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };
    const closeModal = (e) => {
        setQuickAccessKind(null)
    };


    return (
        <MainBoardContainer>
            {quickAccessKind === "addExpense" && (
                <AddExpense categories={categories} userId={userId} onAdd={handleAddExpense} onClose={closeModal} />
            )
            }
            <QuickAccessBoard>
                <QuickAccessBtn onClick={() => setQuickAccessKind("addExpense")}>
                    + Add Expense +
                </QuickAccessBtn>


            </QuickAccessBoard>

            <RecentExpenses
                categories={categories}
                expenses={expenses}

            />


        </MainBoardContainer>
    );
};

export default MainBoard;
