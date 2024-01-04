// Import required modules
const assert = require('assert');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define the base URL for the server
const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

// Define a test user
const TEST_USER = 'testUser';

// Define a test message
const TEST_MESSAGE = 'Hello, world!';

// Define a test feedback
const TEST_FEEDBACK = 'Great response!';

// Test the chat functionality
async function testChat() {
    try {
        const response = await axios.post(`${BASE_URL}/api/chat`, { message: TEST_MESSAGE });
        assert(response.status === 200, 'Expected HTTP 200 OK response');
        assert(typeof response.data.response === 'string', 'Expected a string response');
        console.log('Chat test passed');
    } catch (error) {
        console.error('Chat test failed:', error);
    }
}

// Test the feedback functionality
async function testFeedback() {
    try {
        const response = await axios.post(`${BASE_URL}/api/feedback`, { user: TEST_USER, feedback: TEST_FEEDBACK });
        assert(response.status === 200, 'Expected HTTP 200 OK response');
        console.log('Feedback test passed');
    } catch (error) {
        console.error('Feedback test failed:', error);
    }
}

// Run the tests
async function runTests() {
    await testChat();
    await testFeedback();
}

runTests();
