// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const openai = require('./openai');
const database = require('./database');
const security = require('./security');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
database.connect();

// Setup security
security.setup(app);

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/chat', async (req, res) => {
    try {
        const message = req.body.message;
        const response = await openai.generateResponse(message);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Error processing your message' });
    }
});

app.post('/api/feedback', (req, res) => {
    // Handle feedback here
    // This could involve storing it in the database and/or using it to improve the chatbot
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
