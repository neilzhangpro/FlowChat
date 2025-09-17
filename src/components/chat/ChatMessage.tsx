import React from "react";
import type { Message } from "../types/chat.types";
import { formatTime } from "../../utils/formatTime";

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
    message,
}) => {
    const { id, content, role, timestamp } = message;
    return (
        <div key={id} className={
            `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`
        }>
            <div className={`max-w-[80%] p-2 rounded-lg ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {content}
              <span className={`block text-xs ${role === 'user' ? 'text-white' : 'text-gray-500'}`}>
                {formatTime(timestamp)}
              </span>
            </div>
        </div>
    )
}