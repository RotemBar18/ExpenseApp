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

router.get('/:boardId', verifyToken, async (req, res) => {
    try {
        const {boardId} = req.params;
        const [reports] = await req.db.query('SELECT * FROM reports WHERE ExpenseBoardId = ?', [boardId]);

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found' });
        }

        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

router.get('/:boardId/:reportId', verifyToken, async (req, res) => {
    try {
        const { reportId } = req.params;
        const boardId = req.boardId;

        const [report] = await req.db.query('SELECT * FROM reports WHERE ExpenseBoardId = ? AND ReportId = ?', [boardId, reportId]);

        if (report.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report[0]);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ message: 'Error fetching report' });
    }
});

router.post('/:userId/:boardId', verifyToken, async (req, res) => {
    try {
        const {userId,boardId} = req.params;
        const { name, categories, months, years, reportData, createdAt } = req.body;
        const query = `
            INSERT INTO reports (UserId,ExpenseBoardId, ReportName, Categories, Months, Years, CreatedAt, ReportData) 
            VALUES (?,?, ?, ?, ?, ?, ?, ?)
        `;

        const [insertResult]= await req.db.query(query, [
            userId,
            boardId,
            name,
            JSON.stringify(categories),
            JSON.stringify(months),
            JSON.stringify(years),
            createdAt, 
            JSON.stringify(reportData), 
        ]);
        const newReportId = insertResult.insertId;

        const [newReport] = await req.db.query('SELECT * FROM reports WHERE ReportId = ?', [newReportId]);

        res.status(201).json({ report: newReport[0] });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Error creating report' });
    }
});


router.put('/:boardId/:reportId', verifyToken, async (req, res) => {
    try {
        const { reportId,boardId } = req.params;
        const { name, categories, months, years, expenses } = req.body;

        const query = `
            UPDATE reports 
            SET Name = ?, Categories = ?, Months = ?, Years = ?, Expenses = ? 
            WHERE ExpenseBoardId = ? AND ReportId = ?
        `;

        await req.db.query(query, [
            name,
            JSON.stringify(categories),
            JSON.stringify(months),
            JSON.stringify(years),
            JSON.stringify(expenses),
            boardId,
            reportId,
        ]);

        res.status(200).json({ message: 'Report updated successfully' });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Error updating report' });
    }
});

router.delete('/:boardId/:reportId', verifyToken, async (req, res) => {
    try {
        const { boardId ,reportId} = req.params;
        await req.db.query('DELETE FROM reports WHERE ExpenseBoardId = ? AND ReportId = ?', [boardId, reportId]);

        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: 'Error deleting report' });
    }
});

module.exports = router;
