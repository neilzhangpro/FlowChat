import React from 'react';
import { ChatInterface } from './chat/ChatInterface';
import { ThemeProvider } from './theme/ThemeProvider';

export interface FlowChatConfig {
  // WebSocket 配置
  websocketUrl?: string;
  autoReconnect?: boolean;
  
  // 外观配置
  title?: string;
  subtitle?: string;
  placeholder?: string;
  theme?: 'light' | 'dark';
  height?: string;
  
  // 功能配置
  showConnectionStatus?: boolean;
  showMessageCount?: boolean;
  enableTypingIndicator?: boolean;
  
  // 自定义样式
  headerClassName?: string;
  containerClassName?: string;
}

interface FlowChatProps {
  config?: FlowChatConfig;
  onMessage?: (message: string) => void;
  onConnectionChange?: (status: 'connecting' | 'connected' | 'disconnected') => void;
}

export const FlowChat: React.FC<FlowChatProps> = ({ 
  config = {},
  onMessage,
  onConnectionChange 
}) => {
  const defaultConfig: FlowChatConfig = {
    websocketUrl: 'ws://localhost:8080',
    autoReconnect: true,
    title: 'FlowChat',
    subtitle: 'Another AI chat interface',
    placeholder: 'Type your message...',
    theme: 'light',
    height: '100vh',
    showConnectionStatus: true,
    showMessageCount: true,
    enableTypingIndicator: true,
  };

  const finalConfig = { ...defaultConfig, ...config };

  return (
    <ThemeProvider theme={finalConfig.theme!}>
      <div 
        style={{ height: finalConfig.height }} 
        className={finalConfig.containerClassName}
      >
        <ChatInterface 
          config={finalConfig}
          onMessage={onMessage}
          onConnectionChange={onConnectionChange}
        />
      </div>
    </ThemeProvider>
  );
};

export default FlowChat;
