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
        const userId = req.userId;
        const [preferences] = await req.db.query('SELECT * FROM user_preferences WHERE UserId = ?', [userId]);

        if (preferences.length === 0) {
            return res.status(404).json({ message: 'Preferences not found' });
        }

        res.status(200).json(preferences[0]);
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({ message: 'Error fetching preferences' });
    }
});

router.put('/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { ExpensesThemeColor, DefaultCategories } = req.body; 
        const query = `
            UPDATE user_preferences 
            SET ExpensesThemeColor = ?, DefaultCategories = ?
            WHERE UserId = ?
        `;

        await req.db.query(query, [ExpensesThemeColor, DefaultCategories, userId]);

        res.status(200).json({ success: true, preferences: req.body, message: 'preferences updated successfully' });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({ message: 'Error updating preferences' });
    }
});

router.post('/:userId', verifyToken, async (req, res) => {
    try {
        const {userId} = req.params;  
        const { ExpensesThemeColor, DefaultCategories } = req.body;  

        const query = `
            INSERT INTO user_preferences (UserId, ExpensesThemeColor, DefaultCategories) 
            VALUES (?, ?, ?)
        `;

        await req.db.query(query, [userId, ExpensesThemeColor, DefaultCategories]);
        res.status(201).json({ message: 'Preferences created successfully' });
    } catch (error) {
        console.error('Error creating preferences:', error);
        res.status(500).json({ message: 'Error creating preferences' });
    }
});

module.exports = router;
