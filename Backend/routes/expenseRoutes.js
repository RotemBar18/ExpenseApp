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
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const boards = await req.db.query('SELECT * FROM expenseboards WHERE expenseboardid IN (SELECT expenseboardid FROM boardmembers WHERE userid = ?)', [ userId]);
        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch boards' });
    }
});


router.get('/:boardId', async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await req.db.query('SELECT * FROM expenseboards WHERE expenseboardid = ?', [boardId]);
        if (board.length === 0) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch board' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { boardName, OwnerId } = req.body;

        const result = await req.db.query('INSERT INTO expenseboards (name, ownerid) VALUES (?, ?)', [boardName, OwnerId]);

        const newBoardId = result[0].insertId;

        const [newBoard] = await req.db.query('SELECT * FROM expenseboards WHERE expenseboardid = ?', [newBoardId]);

        res.status(201).json({ message: 'Board created and collaborator added', newBoard: newBoard[0] });
    } catch (error) {
        console.error('Error creating board or adding collaborator:', error);
        res.status(500).json({ error: 'Failed to create board or add collaborator' });
    }
});




router.delete('/:boardId', async (req, res) => {
    try {
        const { boardId } = req.params;
        await req.db.query('DELETE FROM expenseboards WHERE expenseboardid = ?', [boardId]);
        res.status(200).json({ message: 'Board deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete board' });
    }
});

router.put('/:boardId', async (req, res) => {
    try {
        const { boardId } = req.params;
        const { Name, ProfilePic, Budget } = req.body;
        if (!Name || ProfilePic == null) {
            return res.status(400).json({ message: 'Board name and profile picture are required.' });
        }

        await req.db.query('UPDATE expenseboards SET name = ?, profilepic = ?, budget = ? WHERE expenseboardid = ?', [Name, ProfilePic, Budget, boardId]);

        const [updatedBoard] = await req.db.query('SELECT * FROM expenseboards WHERE expenseboardid = ?', [boardId]);

        if (!updatedBoard || updatedBoard.length === 0) {
            return res.status(404).json({ message: 'Board not found.' });
        }

        res.status(200).json({ message: 'Board updated successfully', updatedBoard: updatedBoard[0] });
    } catch (error) {
        console.error('Error updating board:', error);
        res.status(500).json({ error: 'Failed to update board' });
    }
});



module.exports = router;
