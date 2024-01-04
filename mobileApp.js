// Import required modules
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    // Function to send a message to the server
    const sendMessage = async () => {
        try {
            const response = await axios.post('/api/chat', { message });
            updateChatHistory(message, response.data.response);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Function to send feedback to the server
    const sendFeedback = async () => {
        try {
            await axios.post('/api/feedback', { feedback });
            setFeedback('');
        } catch (error) {
            console.error('Error sending feedback:', error);
        }
    };

    // Function to update the chat history
    const updateChatHistory = (message, response) => {
        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: 'user', content: message },
            { type: 'bot', content: response },
        ]);
    };

    return (
        <View style={{ padding: 20 }}>
            <ScrollView style={{ height: '80%', borderWidth: 1, marginBottom: 20 }}>
                {chatHistory.map((message, index) => (
                    <Text key={index} style={{ color: message.type === 'user' ? 'blue' : 'green' }}>
                        {message.content}
                    </Text>
                ))}
            </ScrollView>
            <TextInput
                value={message}
                onChangeText={setMessage}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                placeholder="Type your message here"
            />
            <Button title="Send Message" onPress={sendMessage} />
            <TextInput
                value={feedback}
                onChangeText={setFeedback}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, marginBottom: 20 }}
                placeholder="Type your feedback here"
            />
            <Button title="Send Feedback" onPress={sendFeedback} />
        </View>
    );
}
