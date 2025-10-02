import React from "react";
interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    placeholder: string;
}
export declare const MessageInput: React.FC<MessageInputProps>;
export {};
