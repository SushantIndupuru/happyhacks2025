import express, {json} from 'express';
import cors from 'cors';
import post from 'axios';
import axios from "axios";

const app = express();
const PORT = 4322;

// Middleware
app.use(cors());
app.use(json());



// Chat endpoint
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('http://127.0.0.1:11434/api/chat', {
            model: 'llama3.2', // change this to your Ollama model
            messages: [{role: 'user', content: userMessage}],
            stream: false
        });

        const aiMessage = response.data.message.content;

        res.json({reply: aiMessage});
    } catch (error) {
        console.error('Error talking to Ollama:', error.message);
        res.status(500).json({error: 'Failed to get response from Ollama'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
