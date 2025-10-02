import React from 'react';
export interface ChatTheme {
    container: string;
    header: string;
    headerTitle: string;
    headerSubtitle: string;
    headerStats: string;
    connectionDot: {
        connected: string;
        disconnected: string;
    };
    messageList: string;
    emptyState: {
        container: string;
        title: string;
        subtitle: string;
    };
    userMessage: string;
    assistantMessage: string;
    welcomeMessage: string;
    streamingCursor: string;
    timestamp: {
        user: string;
        assistant: string;
        welcome: string;
    };
    input: {
        container: string;
        field: string;
        button: {
            enabled: string;
            disabled: string;
        };
    };
    typingIndicator: string;
    timeDivider: string;
}
export declare const themes: Record<string, ChatTheme>;
interface ThemeProviderProps {
    theme: 'light' | 'dark';
    children: React.ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ChatTheme;
export {};
