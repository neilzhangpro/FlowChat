import React from "react";
import type { Message } from "../types/chat.types";
import { formatTime } from "../../utils/formatTime";
import { useTheme } from "../theme/ThemeProvider";

interface ChatMessageProps {
    message: Message;
    isStreaming?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
    message,
    isStreaming = false,
}) => {
    const { id, content, role, timestamp } = message;
    const theme = useTheme();

    const getMessageStyle = () => {
        switch (role) {
            case 'user':
                return theme.userMessage;
            case 'welcome':
                return theme.welcomeMessage;
            default:
                return theme.assistantMessage;
        }
    };

    const getTimestampStyle = () => {
        return theme.timestamp[role] || theme.timestamp.assistant;
    };
    return (
        <div key={id} className={
            `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`
        }>
            <div className={`max-w-[80%] p-5 rounded-lg ${getMessageStyle()}`}>
              {content}
              {/*add streaming indicator*/}
              {
                isStreaming && (
                    <span className={`animate-pulse ml-1 ${theme.streamingCursor}`}>|</span>
                )
              }
              <span className={`block pt-3 text-xs ${getTimestampStyle()}`}>
                {formatTime(timestamp)}
              </span>
            </div>
        </div>
    )
}