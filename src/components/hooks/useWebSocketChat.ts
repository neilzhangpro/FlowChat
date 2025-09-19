import { useState, useCallback, useRef,useEffect } from "react";
import type { Message } from "../types/chat.types";

interface WebSocketChatOptions {
    url?: string;
    autoReconnect?: boolean;
}


export function useWebSocketChat({ url = 'ws://localhost:8080', autoReconnect = true }: WebSocketChatOptions = {}) {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [showTypingIndicator, setShowTypingIndicator] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
    const [error, setError] = useState<string | null>(null);

    const wsRef = useRef<WebSocket | null>(null);

    //connect to websocket
    const connect = useCallback(()=>{
        if (wsRef.current?.readyState === WebSocket.OPEN) return;
        //set connection status to connecting
        setConnectionStatus('connecting');
        setError(null);
        try {
            const ws = new WebSocket(url);
            wsRef.current = ws;
            ws.onopen = (event) =>{
                console.log('WebSocket connected');
                console.log('WebSocket event:', event);
                setConnectionStatus('connected');
            }
            ws.onmessage = (event) =>{
                console.log('WebSocket message:', event);
                try {
                    const message = JSON.parse(event.data);
                    handleMessage(message);
                }catch(err){
                    console.error('Error parsing WebSocket message:', err);
                }
            }
            ws.onclose = () =>{
                console.log('WebSocket disconnected');
                setConnectionStatus('disconnected');
            }
        }catch(error){
            setError('Cannot create WebSocket connection');
            setConnectionStatus('disconnected');
        }

    },[url])

    //send message to websocket
    const sendMessage = () => {}

    //add message to messages
    const addMessage = () => {}

    //clear messages
    const clearMessages = () => {}

    //update message
    const updateMessage = () => {}

    //handle message from websocket
    const handleMessage = useCallback((message: any)=>{
        switch(message.type){
            case 'welcome':
                if(message.data){
                    //add welcome message
                    const welcomeMessage: Message = {
                        id: message.data.id,
                        content: message.data.content,
                        role: 'welcome',
                        timestamp: new Date(message.data.timestamp),
                    }
                    setMessages(prev => [...prev, welcomeMessage]);
                }
                break;
            default:
                console.log('Unknown message type:', message.type);
                }
    },[]);

    //disconnect from websocket
    const disconnect = useCallback(()=>{
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.close();
        }
    },[]);

    //reconnect to websocket
    const reconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
        }
        setTimeout(connect, 1000);
    },[connect]);

    //initialize connection
    useEffect(()=>{
        connect();
        return () => disconnect();
    },[url]);

    return {
        messages,
        isLoading,
        showTypingIndicator,
        connectionStatus,
        error,
        sendMessage,
        addMessage,
        clearMessages,
        updateMessage,
        handleMessage,
        reconnect,
        disconnect,
    }

}