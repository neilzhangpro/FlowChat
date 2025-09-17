import { useState, useCallback } from "react";
import type { Message } from "../types/chat.types";

// message handler
// CURD operations


export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTypingIndicator, setShowTypingIndicator] = useState(false);

    //add message
    const addMessage = useCallback((content:string,role: Message['role'])=>{
        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            role,
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, newMessage]);
        return newMessage;
    },[]);

    //send message
    const sendMessage = useCallback(async (content:string)=>{
        // if content is empty or loading, return
        if (!content.trim() || isLoading) return;
        //add user message
        addMessage(content, 'user');
        //set loading state
        setIsLoading(true);
        setShowTypingIndicator(true);
        //set timeout to simulate loading
        setTimeout(()=>{
            const aiResponse = `you said: "${content}"，this is AI's response. I can help you answer any questions.`;
            addMessage(aiResponse, 'assistant');
            setIsLoading(false);
            setShowTypingIndicator(false);
        }, 2000);
    },[addMessage, isLoading]);

    //clear messages
    const clearMessages = useCallback(()=>{
        setMessages([]);
    },[]);

    //update message
    const updateMessage = useCallback((id:string,updates:Partial<Message>)=>{
        setMessages(prev => prev.map(message => message.id === id ? { ...message, ...updates } : message));
    },[]);

    return { messages, isLoading, showTypingIndicator, addMessage, sendMessage, clearMessages, updateMessage };
}