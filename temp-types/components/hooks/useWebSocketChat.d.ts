import type { Message } from "../types/chat.types";
interface WebSocketChatOptions {
    url?: string;
    autoReconnect?: boolean;
}
export declare function useWebSocketChat({ url, autoReconnect }?: WebSocketChatOptions): {
    messages: Message[];
    isLoading: boolean;
    showTypingIndicator: boolean;
    connectionStatus: "connecting" | "connected" | "disconnected";
    error: string;
    streamingMessageId: string;
    sendMessage: (content: string) => Promise<void>;
    addMessage: () => void;
    clearMessages: () => void;
    updateMessage: () => void;
    handleMessage: (message: any) => void;
    reconnect: () => void;
    disconnect: () => void;
};
export {};
