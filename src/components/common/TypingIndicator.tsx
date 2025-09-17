import React from "react";

export const TypingIndicator: React.FC = () => {
    return (
        <div className = "flex justify-center mb-4">
            <div className = "bg-white border border-gray-200 px-4 py-3 rounded-lg">
                <div className = "flex gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
            </div>
        </div>
    )
}