const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.js');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.userId;
        next();
    });
};
// Fetch all boards for a user
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const boards = await req.db.query('SELECT * FROM expenseboards WHERE ExpenseBoardId IN (SELECT ExpenseBoardId FROM boardmembers WHERE UserId = ?) OR OwnerId = ?', [userId, userId]);
        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch boards' });
    }
});


// Fetch a specific board
router.get('/:boardId', async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await req.db.query('SELECT * FROM expenseboards WHERE ExpenseBoardId = ?', [boardId]);
        if (board.length === 0) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch board' });
    }
});

// Create a new board
// Assuming your BoardMembers table has columns: UserId, ExpenseBoardId, Role (where Role could be 'Owner' or 'Collaborator')
router.post('/', async (req, res) => {
    try {
        const { boardName, OwnerId } = req.body;

        // Step 1: Insert the new board into the expenseboards table
        const result = await req.db.query('INSERT INTO expenseboards (Name, OwnerId) VALUES (?, ?)', [boardName, OwnerId]);

        // Step 2: Get the newly created board's ID
        const newBoardId = result[0].insertId;

        // Step 3: Retrieve the newly created board details
        const [newBoard] = await req.db.query('SELECT * FROM expenseboards WHERE ExpenseBoardId = ?', [newBoardId]);

        // Step 5: Send back both the new board details and a success message
        res.status(201).json({ message: 'Board created and collaborator added', newBoard: newBoard[0] });
    } catch (error) {
        console.error('Error creating board or adding collaborator:', error);
        res.status(500).json({ error: 'Failed to create board or add collaborator' });
    }
});




// Delete a board
router.delete('/:boardId', async (req, res) => {
    try {
        const { boardId } = req.params;
        await req.db.query('DELETE FROM expenseboards WHERE ExpenseBoardId = ?', [boardId]);
        res.status(200).json({ message: 'Board deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete board' });
    }
});
// Update a specific board
router.put('/:boardId', async (req, res) => {
    try {
        const { boardId } = req.params;
        const { Name, ProfilePic } = req.body;
        // Validate the incoming data
        if (!Name || ProfilePic == null) {
            return res.status(400).json({ message: 'Board name and profile picture are required.' });
        }

        // Step 1: Update the board details in the expenseboards table
        await req.db.query('UPDATE expenseboards SET Name = ?, ProfilePic = ? WHERE ExpenseBoardId = ?', [Name, ProfilePic, boardId]);

        // Step 2: Retrieve the updated board details
        const [updatedBoard] = await req.db.query('SELECT * FROM expenseboards WHERE ExpenseBoardId = ?', [boardId]);

        if (!updatedBoard || updatedBoard.length === 0) {
            return res.status(404).json({ message: 'Board not found.' });
        }

        // Step 3: Send back the updated board details
        res.status(200).json({ message: 'Board updated successfully', updatedBoard: updatedBoard[0] });
    } catch (error) {
        console.error('Error updating board:', error);
        res.status(500).json({ error: 'Failed to update board' });
    }
});



module.exports = router;
