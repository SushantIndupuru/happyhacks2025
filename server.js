import express, {json} from 'express';
import cors from 'cors';
import post from 'axios';
import axios from "axios";
import os from "os"
const app = express();
const PORT = 4322;

//const os = require('os');

// Middleware
app.use(cors());
app.use(json());

let conversationHistory = [];
conversationHistory.push({
    role: "assistant", content: "Hi! I'm MindBot, a supportive companion here to chat with you. While I can offer a listening ear and general guidance, remember I'm not a replacement for professional help. How are you feeling today?",
})
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
}


console.log(getLocalIP());

conversationHistory.push({role: 'assistant', content: "Hi! I'm MindBot, a supportive companion here to chat with you. While I can offer a listening ear and general guidance, remember I'm not a replacement for professional help. How are you feeling today?"});


// Chat endpoint
app.post('/chat', async (req, res) => {
    console.log("received "+ req.body.message)
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
const ip = getLocalIP()
app.listen(PORT, ip,() => {
    console.log(`local: Server running at http://localhost:${PORT}`);
    console.log(`network: Server running at http://${ip}:${PORT}`);

});
