import React, { useEffect, useState } from "react";
import { marked } from 'marked';

interface ChatMessageProps {
    message: string;
    isBot: boolean;
    timestamp: string;
}

// Set marked to synchronous mode
marked.setOptions({ async: false });

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
    const [html, setHtml] = useState<string>("");

    useEffect(() => {
        console.log("converting to md..")
        const run = async () => {
            const result = await marked.parse(message); // parse can still return Promise
            setHtml(result); // Update state
        };
        run();
        console.log("converted")
    }, [message]); // add [message] as dependency!

    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
            <div
                className={`max-w-[80%] ${isBot ? 'bg-white' : 'bg-primary-600 text-white'} rounded-2xl px-4 py-3 shadow-sm`}>
                <p dangerouslySetInnerHTML={{ __html: html }} className="text-sm md:text-base"></p>
                <p className={`text-xs mt-1 ${isBot ? 'text-neutral-500' : 'text-white/70'}`}>
                    {timestamp}
                </p>
            </div>
        </div>
    );
};

export default ChatMessage;
