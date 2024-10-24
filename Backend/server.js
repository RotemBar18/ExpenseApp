require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dbConnection = require('./utils/db.js');
const { jwtSecret } = require('./config/config.js');
const expenseRoutes = require('./routes/expenseRoutes');
const preferencesRoutes = require('./routes/prefrencesRoutes');
const reportsRoutes = require('./routes/reportsRoutes.js');
const boardsRoutes = require('./routes/boardsRoutes.js');
const boardMembersRoutes = require('./routes/boardMemberRoutes.js');
const http = require('http');
const { setupWebSocketServer } = require('./websocketServer'); // Importing WebSocket server setup
const port = 8081
// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Setting up WebSocket server
setupWebSocketServer(server);



app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use((req, res, next) => {
    req.db = dbConnection;
    next();
});

app.use((req, res, next) => {
    const originalSend = res.send;

    res.send = function (body) {
        console.log(`[Outbound HTTP Response] URL: ${req.originalUrl}`);
        console.log(`[Status Code]: ${res.statusCode}`);
        if (typeof body === 'object') {
            console.log(`[Payload Size]: ${JSON.stringify(body).length} bytes`);
        } else {
            console.log(`[Payload Size]: ${body.length} bytes`);
        }
        console.log(`[Payload]:`, body);

        originalSend.call(this, body);
    };
    next();
});

app.use('/expenses', (req, res, next) => {
    next();
}, expenseRoutes);

app.use('/preferences', (req, res, next) => {
    next();
}, preferencesRoutes);

app.use('/reports', (req, res, next) => {
    next();
}, reportsRoutes);

app.use('/boards', (req, res, next) => {
    next();
}, boardsRoutes);

app.use('/boardmembers', (req, res, next) => {
    next();
}, boardMembersRoutes);


app.get("/users", async (req, res) => {
    const sql = "SELECT Id, Name, ProfilePic FROM users";
    try {
        const [data] = await req.db.query(sql);
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



app.post('/signup', async (req, res) => {
    const { Name: username, Password: password, Email: email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    try {
        const [results] = await req.db.query('SELECT Id FROM users WHERE Email = ?', [email]);

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already exists.' });
        }

        await req.db.query('INSERT INTO users (Name, Password, Email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
        res.status(201).json({ success: true, message: 'User registered successfully!' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Database error.' });
    }
});


app.post('/login', async (req, res) => {
    const { Email: email, Password: password } = req.body;

    if (!password || !email) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    try {
        const [results] = await req.db.query('SELECT Id FROM users WHERE Email = ? AND Password = ?', [email, hashedPassword]);


        if (results.length > 0) {
            const userId = results[0].Id;
            const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '6h' });
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: 'Database error.' });
    }
});


app.get("/users/:email", async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const sql = "SELECT Id FROM users WHERE Email = ?";
    try {
        const [rows] = await req.db.query(sql, [email]);
        if (rows.length > 0) {
            return res.status(200).json({ userId: rows[0].Id });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return res.status(500).json({ error: "Internal server error" });
    }

});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Email, Password, ProfilePic } = req.body;
        const query = `
            UPDATE users 
            SET Name = ?, Email = ?, Password = ?, ProfilePic = ?
            WHERE Id = ?
        `;
        const values = [Name, Email, Password, ProfilePic, id];

        const [result] = await req.db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const [updatedUser] = await req.db.query('SELECT * FROM users WHERE Id = ?', [id]);

        res.json({ success: true, user: updatedUser[0], message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});



app.get("/users/Id/:id", async (req, res) => {
    const { id } = req.params;


    const sql = "SELECT * FROM users WHERE Id = ?"; try {
        const [rows] = await req.db.query(sql, [id]);
        if (rows.length > 0) {
            return res.status(200).json({ user: rows[0] });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});




app.listen(port, () => {
    console.log("Server is listening on port 8081");
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});