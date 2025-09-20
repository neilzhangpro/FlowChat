import React from "react";
import type { Message } from "../types/chat.types";
import { formatTime } from "../../utils/formatTime";

interface ChatMessageProps {
    message: Message;
    isStreaming?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
    message,
    isStreaming = false,
}) => {
    const { id, content, role, timestamp } = message;
    return (
        <div key={id} className={
            `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`
        }>
            <div className={`max-w-[80%] p-5 rounded-lg ${role === 'user' ? 'bg-blue-500 text-white' : role === 'welcome' ? 'bg-yellow-200 text-black' : 'bg-gray-200 text-gray-800'}`}>
              {content}
              {/*add streaming indicator*/}
              {
                isStreaming && (
                    <span className="animate-pulse ml-1 text-blue-500">|</span>
                )
              }
              <span className={`block pt-3 text-xs ${role === 'user' ? 'text-white' : role === 'welcome' ? 'text-black' : 'text-gray-500'}`}>
                {formatTime(timestamp)}
              </span>
            </div>
        </div>
    )
}