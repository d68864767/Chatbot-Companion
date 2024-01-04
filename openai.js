// Import required modules
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// OpenAI API endpoint
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to generate response from OpenAI API
async function generateResponse(message) {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                prompt: message,
                max_tokens: 60,
                temperature: 0.5,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract the generated text from the response
        const generatedText = response.data.choices[0].text.trim();

        return generatedText;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

// Export the function
module.exports = {
    generateResponse
};
