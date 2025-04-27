import express, {json} from 'express';
import cors from 'cors';
import post from 'axios';
import axios from "axios";

const app = express();
const PORT = 4322;

// Middleware
app.use(cors());
app.use(json());

let conversationHistory = [];

// Chat endpoint
app.post('/chat', async (req, res) => {
    console.log("resieved "+ req.body.message)
    const userMessage = req.body.message;
    conversationHistory.push({role: 'user', content: userMessage});
    try {
        const response = await axios.post('http://127.0.0.1:11434/api/chat', {
            model: 'therapist', // change this to your Ollama model
            messages: conversationHistory,
            stream: false
        });

        const aiMessage = response.data.message.content;

        conversationHistory.push({role: 'assistant', content: aiMessage});
        console.log(conversationHistory);
        res.json({reply: aiMessage});
    } catch (error) {
        console.error('Error talking to Ollama:', error.message);
        res.status(500).json({error: 'Failed to get response from Ollama'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
