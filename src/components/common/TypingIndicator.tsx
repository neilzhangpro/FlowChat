import React from "react";
import { useTheme } from "../theme/ThemeProvider";

export const TypingIndicator: React.FC = () => {
    const theme = useTheme();
    return (
        <div className = "flex justify-center mb-4">
            <div className = {theme.typingIndicator}>
                <div className = "flex gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
            </div>
        </div>
    )
}