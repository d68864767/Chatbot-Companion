// Import required modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define the schema for user feedback
const feedbackSchema = new mongoose.Schema({
    user: String,
    feedback: String,
    timestamp: Date
});

// Create a model from the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Function to connect to the database
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

// Function to store user feedback
const storeFeedback = async (user, feedback) => {
    try {
        const newFeedback = new Feedback({
            user,
            feedback,
            timestamp: new Date()
        });
        await newFeedback.save();
        console.log('Feedback saved');
    } catch (error) {
        console.error('Error saving feedback', error);
    }
};

module.exports = {
    connect,
    storeFeedback
};
