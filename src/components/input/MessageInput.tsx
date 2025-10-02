import React, {useState} from "react";
import type { KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

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
    const theme = useTheme();

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
        <div className={theme.input.container}>
            <div className="flex gap-2">
                <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={inputValue}
                placeholder={placeholder}
                className={theme.input.field}
                />
                <button 
                    className={inputValue.trim() === '' ? theme.input.button.disabled : theme.input.button.enabled} 
                    onClick={handleSend} 
                    disabled={inputValue.trim() === ''}
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                </button>
            </div>
        </div>
    )
}