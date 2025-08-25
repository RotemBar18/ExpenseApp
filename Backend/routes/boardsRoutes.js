const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.js');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: 'No token provided.' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.userId;
        next();
    });
};

// GET /boards/user/:userId -> boards owned by OR joined by the user
router.get('/user/:userId', verifyToken, async (req, res) => {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) return res.status(400).json({ error: 'Invalid user id' });

    try {
        const [rows] = await req.db.query(`
      SELECT
        b.expenseboardid AS "ExpenseBoardId",
        b.name           AS "Name",
        b.ownerid        AS "OwnerId",
        b.createdat      AS "CreatedAt",
        b.profilepic     AS "ProfilePic",
        b.budget         AS "Budget"
      FROM expenseboards b
      WHERE b.ownerid = ?
         OR EXISTS (
              SELECT 1
              FROM boardmembers m
              WHERE m.expenseboardid = b.expenseboardid
                AND m.userid = ?
         )
      ORDER BY b.createdat DESC
    `, [userId, userId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error('DB error (GET /boards/user/:userId):', error);
        res.status(500).json({ error: 'Failed to fetch boards' });
    }
});

// GET /boards/board/:boardId -> single board
router.get('/board/:boardId', async (req, res) => {
    const boardId = Number(req.params.boardId);
    if (!Number.isInteger(boardId)) return res.status(400).json({ error: 'Invalid board id' });

    try {
        const [rows] = await req.db.query(`
      SELECT
        expenseboardid AS "ExpenseBoardId",
        name           AS "Name",
        ownerid        AS "OwnerId",
        createdat      AS "CreatedAt",
        profilepic     AS "ProfilePic",
        budget         AS "Budget"
      FROM expenseboards
      WHERE expenseboardid = ?
    `, [boardId]);

        if (rows.length === 0) return res.status(404).json({ error: 'Board not found' });
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('DB error (GET /boards/board/:boardId):', error);
        res.status(500).json({ error: 'Failed to fetch board' });
    }
});

// POST /boards -> create board (returns the new board)
router.post('/', verifyToken, async (req, res) => {
    const { boardName, OwnerId } = req.body;
    const ownerId = Number(OwnerId);
    if (!boardName || !Number.isInteger(ownerId)) {
        return res.status(400).json({ error: 'Board name and valid OwnerId are required' });
    }

    try {
        const [rows] = await req.db.query(`
      INSERT INTO expenseboards (name, ownerid)
      VALUES (?, ?)
      RETURNING
        expenseboardid AS "ExpenseBoardId",
        name           AS "Name",
        ownerid        AS "OwnerId",
        createdat      AS "CreatedAt",
        profilepic     AS "ProfilePic",
        budget         AS "Budget"
    `, [boardName, ownerId]);

        // (Optional) If you want to auto-add the owner as a member, uncomment:
        // await req.db.query(
        //   'INSERT INTO boardmembers (expenseboardid, userid) VALUES (?, ?)',
        //   [rows[0].ExpenseBoardId, ownerId]
        // );

        res.status(201).json({ message: 'Board created', newBoard: rows[0] });
    } catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ error: 'Failed to create board' });
    }
});

// PUT /boards/board/:boardId -> update board and return updated
router.put('/board/:boardId', verifyToken, async (req, res) => {
    const boardId = Number(req.params.boardId);
    if (!Number.isInteger(boardId)) return res.status(400).json({ message: 'Invalid board id' });

    const { Name, ProfilePic, Budget } = req.body;
    if (!Name || ProfilePic == null) {
        return res.status(400).json({ message: 'Board name and profile picture are required.' });
    }

    try {
        const [rows] = await req.db.query(`
      UPDATE expenseboards
      SET name = ?, profilepic = ?, budget = ?
      WHERE expenseboardid = ?
      RETURNING
        expenseboardid AS "ExpenseBoardId",
        name           AS "Name",
        ownerid        AS "OwnerId",
        createdat      AS "CreatedAt",
        profilepic     AS "ProfilePic",
        budget         AS "Budget"
    `, [Name, ProfilePic, Budget, boardId]);

        if (rows.length === 0) return res.status(404).json({ message: 'Board not found.' });
        res.status(200).json({ message: 'Board updated successfully', updatedBoard: rows[0] });
    } catch (error) {
        console.error('Error updating board:', error);
        res.status(500).json({ error: 'Failed to update board' });
    }
});

// DELETE /boards/board/:boardId
router.delete('/board/:boardId', verifyToken, async (req, res) => {
    const boardId = Number(req.params.boardId);
    if (!Number.isInteger(boardId)) return res.status(400).json({ error: 'Invalid board id' });

    try {
        const [rows] = await req.db.query(
            'DELETE FROM expenseboards WHERE expenseboardid = ? RETURNING expenseboardid',
            [boardId]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Board not found' });
        res.status(200).json({ message: 'Board deleted' });
    } catch (error) {
        console.error('Error deleting board:', error);
        res.status(500).json({ error: 'Failed to delete board' });
    }
});

module.exports = router;
