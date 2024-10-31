const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config'); 

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(401).json({ message: 'Token expired or invalid' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
