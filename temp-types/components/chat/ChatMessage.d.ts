import React from "react";
import type { Message } from "../types/chat.types";
interface ChatMessageProps {
    message: Message;
    isStreaming?: boolean;
}
export declare const ChatMessage: React.FC<ChatMessageProps>;
export {};
