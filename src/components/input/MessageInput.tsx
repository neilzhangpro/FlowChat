import React, {useState} from "react";
import type { KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    placeholder: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    onSendMessage,
    isLoading,
    placeholder = "Type your message...",
}) => {
    const [inputValue, setInputValue] = useState("");

    //handle input change
    const handleSend = () => {
        if (inputValue.trim() && !isLoading){
            onSendMessage(inputValue);
            setInputValue("");
        }
    }
    //handle keydown
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            handleSend();
        }
    }
    //render
    return (
        <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-2">
                <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={inputValue}
                placeholder={placeholder}
                className="flex-3 px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSend} disabled={inputValue.trim() === ''}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                </button>
            </div>
        </div>
    )
}