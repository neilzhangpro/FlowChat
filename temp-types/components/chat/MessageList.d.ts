import React from "react";
import type { Message } from "../types/chat.types";
interface MessageListProps {
    messages: Message[];
    showTypingIndicator: boolean;
    streamingMessageId: string | null;
}
export declare const MessageList: React.FC<MessageListProps>;
export {};
