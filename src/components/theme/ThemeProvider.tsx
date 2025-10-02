import React, { createContext, useContext } from 'react';

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

export const themes: Record<string, ChatTheme> = {
  light: {
    container: 'bg-gray-50',
    header: 'bg-white border-b border-gray-200 shadow-sm',
    headerTitle: 'text-lg font-semibold text-gray-900',
    headerSubtitle: 'text-xs text-gray-500',
    headerStats: 'text-xs text-gray-400',
    connectionDot: {
      connected: 'w-2 h-2 rounded-full bg-green-500 animate-pulse',
      disconnected: 'w-2 h-2 rounded-full bg-red-500 animate-pulse',
    },
    messageList: 'flex-1 overflow-y-auto p-4',
    emptyState: {
      container: 'flex-1 flex items-center justify-center text-gray-500',
      title: 'text-lg mb-2 text-gray-700',
      subtitle: 'text-sm text-gray-500',
    },
    userMessage: 'bg-blue-500 text-white',
    assistantMessage: 'bg-gray-200 text-gray-800',
    welcomeMessage: 'bg-yellow-200 text-black',
    streamingCursor: 'text-blue-500',
    timestamp: {
      user: 'text-white/70',
      assistant: 'text-gray-500',
      welcome: 'text-black/70',
    },
    input: {
      container: 'bg-white border-t border-gray-200 p-4',
      field: 'flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      button: {
        enabled: 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
        disabled: 'bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed',
      },
    },
    typingIndicator: 'bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm',
    timeDivider: 'text-xs text-gray-400',
  },
  dark: {
    container: 'bg-gray-900',
    header: 'bg-gray-800 border-b border-gray-700 shadow-sm',
    headerTitle: 'text-lg font-semibold text-white',
    headerSubtitle: 'text-xs text-gray-400',
    headerStats: 'text-xs text-gray-500',
    connectionDot: {
      connected: 'w-2 h-2 rounded-full bg-green-400 animate-pulse',
      disconnected: 'w-2 h-2 rounded-full bg-red-400 animate-pulse',
    },
    messageList: 'flex-1 overflow-y-auto p-4',
    emptyState: {
      container: 'flex-1 flex items-center justify-center text-gray-400',
      title: 'text-lg mb-2 text-gray-300',
      subtitle: 'text-sm text-gray-500',
    },
    userMessage: 'bg-blue-600 text-white',
    assistantMessage: 'bg-gray-700 text-gray-100',
    welcomeMessage: 'bg-yellow-600 text-white',
    streamingCursor: 'text-blue-400',
    timestamp: {
      user: 'text-white/60',
      assistant: 'text-gray-400',
      welcome: 'text-white/70',
    },
    input: {
      container: 'bg-gray-800 border-t border-gray-700 p-4',
      field: 'flex-1 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      button: {
        enabled: 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
        disabled: 'bg-gray-600 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed',
      },
    },
    typingIndicator: 'bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg shadow-sm',
    timeDivider: 'text-xs text-gray-500',
  }
};

const ThemeContext = createContext<ChatTheme>(themes.light);

interface ThemeProviderProps {
  theme: 'light' | 'dark';
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const themeConfig = themes[theme] || themes.light;
  
  return (
    <ThemeContext.Provider value={themeConfig}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
