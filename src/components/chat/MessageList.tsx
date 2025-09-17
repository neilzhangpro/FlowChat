import React, { useEffect, useRef } from "react";
import type { Message } from "../types/chat.types";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "../common/TypingIndicator";

interface MessageListProps {
    messages: Message[];
    showTypingIndicator: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
    messages,
    showTypingIndicator,
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    //auto scroll to the bottom
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[messages]);

    //handle no data
    if(messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <p className="text-lg mb-2">Welcome to FlowChat!</p>
                    <p className="text-sm text-gray-500">Start a conversation with me</p>
                </div>
            </div>
        )
    }
    //render messages
    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
                {messages.map((message, index) => {
                    // judge if show time divider
                    const showTimeDivider =
                        index === 0 ||
                        (message.timestamp.getTime() -
                            messages[index - 1].timestamp.getTime() >
                            60000);

                    return (
                        <div key={message.id}>
                            {
                                showTimeDivider && (
                                    <TimeDivider timestamp={message.timestamp} />
                                )
                            }
                            <ChatMessage message={message} />
                        </div>
                    )
                })}
                {
                    showTypingIndicator && (
                        <div className="flex justify-center my-2">
                            <TypingIndicator />
                        </div>
                    )
                }
            </div>
        </div>
    )
}


//timedivder component
const TimeDivider: React.FC<{ timestamp: Date }> = ({ timestamp }) => {
    return (
        <div className="flex justify-center my-2">
            <span className="text-xs text-gray-400">{timestamp.toLocaleString()}</span>
        </div>
    )
}