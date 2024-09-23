const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.js');

// Middleware to verify JWT token
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

// GET all reports for a user
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        console.log('Fetching reports for userId:', userId);

        const [reports] = await req.db.query('SELECT * FROM reports WHERE UserId = ?', [userId]);
        console.log('Fetched reports:', reports);

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found' });
        }

        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

// GET a specific report by reportId
router.get('/:userId/:reportId', verifyToken, async (req, res) => {
    try {
        const { reportId } = req.params;
        const userId = req.userId;
        console.log('Fetching report:', { userId, reportId });

        const [report] = await req.db.query('SELECT * FROM reports WHERE UserId = ? AND ReportId = ?', [userId, reportId]);
        console.log('Fetched report:', report);

        if (report.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report[0]);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ message: 'Error fetching report' });
    }
});

// CREATE a new report for the user
router.post('/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { name, categories, months, years, reportData, createdAt } = req.body;
        console.log('Creating report with:', { userId, name, categories, months, years, reportData, createdAt });

        const query = `
            INSERT INTO reports (UserId, ReportName, Categories, Months, Years, CreatedAt, ReportData) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Note: The order of the parameters matches the order in the SQL query
        const [insertResult]= await req.db.query(query, [
            userId,
            name,
            JSON.stringify(categories),
            JSON.stringify(months),
            JSON.stringify(years),
            createdAt, // CreatedAt should come before ReportData in the order
            JSON.stringify(reportData), // ReportData comes last in the order
        ]);
        const newReportId = insertResult.insertId;

        const [newReport] = await req.db.query('SELECT * FROM reports WHERE ReportId = ?', [newReportId]);

        console.log('Report created successfully');
        res.status(201).json({ report: newReport[0] });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Error creating report' });
    }
});


// UPDATE an existing report
router.put('/:userId/:reportId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { reportId } = req.params;
        const { name, categories, months, years, expenses } = req.body;
        console.log('Updating report with:', { userId, reportId, name, categories, months, years, expenses });

        const query = `
            UPDATE reports 
            SET Name = ?, Categories = ?, Months = ?, Years = ?, Expenses = ? 
            WHERE UserId = ? AND ReportId = ?
        `;

        await req.db.query(query, [
            name,
            JSON.stringify(categories),
            JSON.stringify(months),
            JSON.stringify(years),
            JSON.stringify(expenses),
            userId,
            reportId,
        ]);

        console.log('Report updated successfully');
        res.status(200).json({ message: 'Report updated successfully' });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Error updating report' });
    }
});

// DELETE a report
router.delete('/:userId/:reportId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { reportId } = req.params;
        console.log('Deleting report:', { userId, reportId });

        await req.db.query('DELETE FROM reports WHERE UserId = ? AND ReportId = ?', [userId, reportId]);

        console.log('Report deleted successfully');
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: 'Error deleting report' });
    }
});

module.exports = router;
