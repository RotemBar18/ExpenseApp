require('dotenv').config();
const expenseRoutes = require('./routes/expenseRoutes');
const preferencesRoutes = require('./routes/prefrencesRoutes')
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dbConnection = require('./utils/db.js');
const { jwtSecret } = require('./config/config.js');
const bodyParser = require('body-parser');
const app = express();
const port = 8081;


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
    req.db = dbConnection;
    next();
});

app.use('/expenses', (req, res, next) => {
    next();
}, expenseRoutes);

app.use('/preferences', (req, res, next) => {
    next();
}, preferencesRoutes);

app.use('/preferences', preferencesRoutes);


app.get("/users", async (req, res) => {
    const sql = "SELECT * FROM users";
    try {
        const [data] = await req.db.query(sql); // Use await and async to fetch users
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

    // Hash the password and log it to compare with the database
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    try {
        // Query the database for the user with the hashed password
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
        return res.status(400).json({ error: "Email is required" }); // Error if email is not provided
    }

    const sql = "SELECT Id FROM users WHERE Email = ?";
    try {
        const [rows] = await req.db.query(sql, [email]);
        if (rows.length > 0) {
            return res.status(200).json({ userId: rows[0].Id }); // Return the user's Id as JSON
        } else {
            return res.status(404).json({ error: "User not found" }); // Return 404 if the user was not found
        }
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return res.status(500).json({ error: "Internal server error" }); // Return 500 on server error
    }

});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the URL
        const { Name, Email, Password, ProfilePic } = req.body; // Get updated user data from the request body

        // Update query
        const query = `
            UPDATE users 
            SET Name = ?, Email = ?, Password = ?, ProfilePic = ?
            WHERE Id = ?
        `;
        const values = [Name, Email, Password, ProfilePic, id];

        // Execute the query with the new values
        const [result] = await req.db.query(query, values);

        // Check if the user with the given ID exists
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the updated user data to send back in the response
        const [updatedUser] = await req.db.query('SELECT * FROM users WHERE Id = ?', [id]);

        // Send the updated user back in the response
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
