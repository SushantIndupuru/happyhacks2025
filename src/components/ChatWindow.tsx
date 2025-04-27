import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import {getRequest} from "../../getRequest.js";
interface Message {
    text: string;
    isBot: boolean;
    timestamp: string;
}

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hi! I'm MindBot, a supportive companion here to chat with you. While I can offer a listening ear and general guidance, remember I'm not a replacement for professional help. How are you feeling today?",
            isBot: true,
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        //scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            text: input,
            isBot: false,
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(async () => {
            const botResponse = {
                text: await getBotResponse(input),
                isBot: true,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const getBotResponse = async (userInput: string): Promise<string> => {
        /*const input = userInput.toLowerCase();

        if (input.includes('suicide') || input.includes('kill myself') || input.includes('want to die')) {
            return "I'm very concerned about what you're saying. Please know that your life has value and there are people who want to help. Call 988 right now to speak with someone who can help, or text HOME to 741741. These services are free, confidential, and available 24/7.";
        }

        if (input.includes('anxious') || input.includes('anxiety')) {
            return "It's normal to feel anxious sometimes. Would you like to try a simple breathing exercise? Take a slow breath in for 4 counts, hold for 4, then exhale for 4. This can help calm your nervous system. Would you like to learn more coping strategies for anxiety?";
        }

        if (input.includes('depressed') || input.includes('depression')) {
            return "I hear that you're feeling down, and that must be really difficult. Depression is a real challenge that many teens face. Have you considered talking to a counselor or therapist? They're trained to help with these feelings and can provide professional support.";
        }

        if (input.includes('stressed') || input.includes('stress')) {
            return "Stress can feel overwhelming. What's causing you stress right now? Sometimes it helps to break big problems into smaller, manageable steps. Would you like to explore some stress management techniques?";
        }

        return "Thank you for sharing. Would you like to tell me more about what's on your mind? Remember, I'm here to listen, but I can also connect you with professional resources if you'd like.";*/

        /*console.log("sent "+userInput);
        const response = await fetch('http://localhost:4322/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userInput})
        });
        const data = await response.json();
        const reply = data.reply;
        console.log(reply);
        return reply;*/
        return await getRequest(userInput);
    };

    return (
        <div className="flex flex-col h-[600px] bg-neutral-50 rounded-xl shadow-lg">
            <div className="bg-white p-4 rounded-t-xl border-b">
                <h2 className="text-xl font-semibold text-neutral-800">Chat with MindBot</h2>
                <p className="text-sm text-neutral-600">A supportive companion to listen and guide</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        message={message.text}
                        isBot={message.isBot}
                        timestamp={message.timestamp}
                    />
                ))}
                {isTyping && (
                    <div className="flex items-center text-neutral-500 text-sm">
                        <div className="bg-white rounded-full px-4 py-2">
                            MindBot is typing...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-white rounded-b-xl border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded-full border border-neutral-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                    >
                        Send
                    </button>
                </div>
                <p className="mt-2 text-xs text-neutral-500 text-center">
                    Remember: This is not a crisis service. If you need immediate help, call 988 or visit our{' '}
                    <a href="/get-help" className="text-primary-600 hover:underline">crisis resources</a>.
                </p>
            </form>
        </div>
    );
};

export default ChatWindow;