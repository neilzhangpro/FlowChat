import React from 'react';
import type { FlowChatConfig } from '../FlowChat';
interface ChatInterfaceProps {
    config: FlowChatConfig;
    onMessage?: (message: string) => void;
    onConnectionChange?: (status: 'connecting' | 'connected' | 'disconnected') => void;
}
export declare const ChatInterface: React.FC<ChatInterfaceProps>;
export {};
