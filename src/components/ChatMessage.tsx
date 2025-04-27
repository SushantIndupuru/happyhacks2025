import React from 'react';

interface ChatMessageProps {
    message: string;
    isBot: boolean;
    timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`max-w-[80%] ${isBot ? 'bg-white' : 'bg-primary-600 text-white'} rounded-2xl px-4 py-3 shadow-sm`}>
                <p className="text-sm md:text-base">{message}</p>
                <p className={`text-xs mt-1 ${isBot ? 'text-neutral-500' : 'text-white/70'}`}>{timestamp}</p>
            </div>
        </div>
    );
};

export default ChatMessage;