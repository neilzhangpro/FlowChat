import { useState, useCallback, useRef,useEffect } from "react";
import type { Message } from "../types/chat.types";

interface WebSocketChatOptions {
    url?: string;
    autoReconnect?: boolean;
}


export function useWebSocketChat({ url = 'ws://localhost:8080', autoReconnect = true }: WebSocketChatOptions = {}) {
    console.log('AutoReconnect enabled:', autoReconnect); // TODO: Implement autoReconnect functionality
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [showTypingIndicator, setShowTypingIndicator] = useState(false);
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
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
    const sendMessage = useCallback(async (content:string)=>{
        if (!content.trim() || isLoading || connectionStatus !== 'connected') return;

        //add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            role: 'user',
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, userMessage]);
        

        //send to websocket
        if(wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'user',
                data: {
                    id: userMessage.id,
                    content: userMessage.content,
                }
            }))
        }
    },[isLoading,connectionStatus])

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
            case 'stream_start':
                //start streaming
                if(message.data){
                    //creat empty message
                    const emptyMessage: Message = {
                        id: message.data.id,
                        content: '',
                        role: 'assistant',
                        timestamp: new Date(message.data.timestamp),
                    }
                    setMessages(prev => [...prev, emptyMessage]);
                    setShowTypingIndicator(false);
                    setStreamingMessageId(message.data.id);
                }
                break;
            case 'stream_chunk':
                //update message
                if(message.data){
                    console.log('Stream chunk message:', message.data);
                    const { content } = message.data;
                    setMessages(prev => {
                        // 找到最后一条assistant消息的索引
                        for (let i = prev.length - 1; i >= 0; i--) {
                            if (prev[i].role === 'assistant') {
                                const newMessages = [...prev];
                                newMessages[i] = {
                                    ...newMessages[i],
                                    content: newMessages[i].content + content
                                };
                                return newMessages;
                            }
                        }
                        return prev;
                    });
                }
                break;
            case 'stream_end':
                //end strwaming
                if(message.data){
                    const { id, content,timestamp} = message.data;
                    setMessages(prev => prev.map(message => message.id === id ? { ...message, content, timestamp } : message));
                    setIsLoading(false);
                    setStreamingMessageId(null);
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
        streamingMessageId,
        sendMessage,
        addMessage,
        clearMessages,
        updateMessage,
        handleMessage,
        reconnect,
        disconnect,
    }

}