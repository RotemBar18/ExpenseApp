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

router.post('/', verifyToken, async (req, res) => {
    const { userId, boardId } = req.body;
    try {
        const query = `INSERT INTO boardmembers (UserId, ExpenseBoardId) VALUES (?, ?)`;
        await req.db.query(query, [userId, boardId]);
        
        res.status(201).json({ message: 'Board member added successfully' });
    } catch (error) {
        console.error('Error adding board member:', error);
        res.status(500).json({ error: 'Failed to add board member' });
    }
});

router.delete('/', async (req, res) => {
    const { userId, boardId } = req.query;
    try {
        const query = `DELETE FROM boardmembers WHERE UserId = ? AND ExpenseBoardId = ?`;
        const result = await req.db.query(query, [userId, boardId]);

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Board member not found' });
        }

        res.status(200).json({ message: 'Board member removed successfully' });
    } catch (error) {
        console.error('Error removing board member:', error);
        res.status(500).json({ error: 'Failed to remove board member' });
    }
});

router.get('/:boardId', verifyToken, async (req, res) => {
    const { boardId } = req.params;

    try {
        const query = `
            SELECT bm.UserId, u.Name, u.ProfilePic 
            FROM boardmembers bm 
            JOIN users u ON bm.UserId = u.Id 
            WHERE bm.ExpenseBoardId = ?`;
        const [rows] = await req.db.query(query, [boardId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching board members:', error);
        res.status(500).json({ error: 'Failed to fetch board members' });
    }
});


module.exports = router;
