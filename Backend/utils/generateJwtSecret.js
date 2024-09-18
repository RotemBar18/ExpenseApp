const crypto = require('crypto');
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log(`Your JWT secret key: ${jwtSecret}`);
