import React, { useEffect, useRef } from "react";
import type { Message } from "../types/chat.types";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "../common/TypingIndicator";
import { useTheme } from "../theme/ThemeProvider";

interface MessageListProps {
    messages: Message[];
    showTypingIndicator: boolean;
    streamingMessageId: string | null;
}

export const MessageList: React.FC<MessageListProps> = ({
    messages,
    showTypingIndicator,
    streamingMessageId,
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    //auto scroll to the bottom
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[messages,showTypingIndicator,streamingMessageId]);

    //handle no data
    if(messages.length === 0) {
        return (
            <div className={theme.emptyState.container}>
                <div className="text-center">
                    <p className={theme.emptyState.title}>Welcome to FlowChat!</p>
                    <p className={theme.emptyState.subtitle}>Start a conversation with me</p>
                </div>
            </div>
        )
    }
    //render messages
    return (
        <div className={theme.messageList}>
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
                            <ChatMessage message={message} isStreaming={streamingMessageId === message.id} />
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
                <div ref={bottomRef}></div>
            </div>
        </div>
    )
}


//timedivder component
const TimeDivider: React.FC<{ timestamp: Date }> = ({ timestamp }) => {
    const theme = useTheme();
    return (
        <div className="flex justify-center my-2">
            <span className={theme.timeDivider}>{timestamp.toLocaleString()}</span>
        </div>
    )
}