import express, {json} from 'express';
import cors from 'cors';
import post from 'axios';
import axios from "axios";

const app = express();
const PORT = 4322;

// Store conversation history here
let conversationHistory = [];

app.use(cors());
app.use(json());

// Chat endpoint
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Add the user message to the conversation history
    conversationHistory.push({role: 'user', content: userMessage});

    try {
        // Send the entire conversation history to Ollama
        const response = await axios.post('http://127.0.0.1:11434/api/chat', {
            model: 'llama3', // change this to your Ollama model
            messages: conversationHistory,
            //messages: [{role: 'user', content: 'hi there!'}],
            stream: false
        });

        const aiMessage = response.data.message.content;

        // Add the assistant's response to the conversation history
        conversationHistory.push({role: 'assistant', content: aiMessage});

        // Send the AI response back to the frontend
        res.json({reply: aiMessage});
    } catch (error) {
        console.error('Error talking to Ollama:', error.message);
        res.status(500).json({error: 'Failed to get response from Ollama'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
