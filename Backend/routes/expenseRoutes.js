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
            console.error('Error verifying token:', err); // Log the error for debugging
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.userId;
        next();
    });
};


router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const [rows] = await req.db.query('SELECT * FROM expenses WHERE isVisible = 1 AND UserId = ?', [userId]);
        ('Expenses retrieved:', rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
});



router.post('/', async (req, res) => {
    const  { Amount: amount, Description: description ,Category:category,Name:name,UserId: userId } = req.body;
    try {

        const result = await req.db.query(
            'INSERT INTO expenses (Amount, Description, Category, Name,UserId, isVisible) VALUES (?,?, ?, ?, ?, ?)',
            [amount, description, category, name,userId, 1]
        );

        res.status(201).json({ id: result[0].insertId });
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Error creating expense' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {Name, Amount, Description, Category, Date, isVisible } = req.body;

    try {
        const [result] = await req.db.query(
            'UPDATE expenses SET Name = ?, Amount = ?, Description = ?, Category = ?, Date = ?, isVisible = ? WHERE ExpenseId = ?',
            [Name, Amount, Description, Category, Date, isVisible, id]
        );


        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No expense found with the given ID' });
        }

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await req.db.query('UPDATE expenses SET isVisible = 0 WHERE ExpenseId = ?', [id]);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Error deleting expense' });
    }
});

module.exports = router;
