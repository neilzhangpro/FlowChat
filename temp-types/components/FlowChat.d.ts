import React from 'react';
export interface FlowChatConfig {
    websocketUrl?: string;
    autoReconnect?: boolean;
    title?: string;
    subtitle?: string;
    placeholder?: string;
    theme?: 'light' | 'dark';
    height?: string;
    showConnectionStatus?: boolean;
    showMessageCount?: boolean;
    enableTypingIndicator?: boolean;
    headerClassName?: string;
    containerClassName?: string;
}
interface FlowChatProps {
    config?: FlowChatConfig;
    onMessage?: (message: string) => void;
    onConnectionChange?: (status: 'connecting' | 'connected' | 'disconnected') => void;
}
export declare const FlowChat: React.FC<FlowChatProps>;
export default FlowChat;
