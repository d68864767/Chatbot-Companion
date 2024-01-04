// Import required modules
const axios = require('axios');

// Function to send a message to the server
async function sendMessage(message) {
    try {
        const response = await axios.post('/api/chat', { message });
        return response.data.response;
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to send feedback to the server
async function sendFeedback(feedback) {
    try {
        await axios.post('/api/feedback', { feedback });
    } catch (error) {
        console.error('Error sending feedback:', error);
    }
}

// Function to update the chat history
function updateChatHistory(message, response) {
    const chatHistory = document.getElementById('chat-history');
    chatHistory.innerHTML += `
        <div class="message user-message">${message}</div>
        <div class="message bot-message">${response}</div>
    `;
}

// Function to handle the send button click event
function handleSendButtonClick() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;
    userInput.value = '';

    sendMessage(message).then(response => {
        updateChatHistory(message, response);
    });
}

// Function to handle the feedback button click event
function handleFeedbackButtonClick() {
    const feedbackInput = document.getElementById('feedback-input');
    const feedback = feedbackInput.value;
    feedbackInput.value = '';

    sendFeedback(feedback);
}

// Add event listeners
document.getElementById('send-button').addEventListener('click', handleSendButtonClick);
document.getElementById('feedback-button').addEventListener('click', handleFeedbackButtonClick);
