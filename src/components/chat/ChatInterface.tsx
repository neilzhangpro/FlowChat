import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from '../input/MessageInput';
//import { useChat } from '../hooks/useChat';
import { useWebSocketChat } from '../hooks/useWebSocketChat';
import { useTheme } from '../theme/ThemeProvider';
import type { FlowChatConfig } from '../FlowChat';

interface ChatInterfaceProps {
  config: FlowChatConfig;
  onMessage?: (message: string) => void;
  onConnectionChange?: (status: 'connecting' | 'connected' | 'disconnected') => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  config,
  onMessage,
  onConnectionChange 
}) => {
  const theme = useTheme();
    const {
        messages,
        isLoading,
        showTypingIndicator,
        streamingMessageId,
        connectionStatus,
        sendMessage,
    } = useWebSocketChat({
        url: config.websocketUrl,
        autoReconnect: config.autoReconnect
    });

    // 处理消息回调
    React.useEffect(() => {
        if (onMessage) {
            // 监听用户消息
            const userMessages = messages.filter(msg => msg.role === 'user');
            if (userMessages.length > 0) {
                const lastUserMessage = userMessages[userMessages.length - 1];
                onMessage(lastUserMessage.content);
            }
        }
    }, [messages, onMessage]);

    // 处理连接状态回调
    React.useEffect(() => {
        if (onConnectionChange) {
            onConnectionChange(connectionStatus);
        }
    }, [connectionStatus, onConnectionChange]);
    
    //render
    return (
        <div className={`h-full flex flex-col ${theme.container} ${config.containerClassName || ''}`}>
      {/* Header */}
      <header className={`${theme.header} ${config.headerClassName || ''} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={theme.headerTitle}>{config.title}</h1>
            <p className={theme.headerSubtitle}>{config.subtitle}</p>
          </div>
          {(config.showConnectionStatus || config.showMessageCount) && (
            <div className={`${theme.headerStats} flex items-center gap-2`}>
              {config.showConnectionStatus && (
                <div className={connectionStatus === 'connected' ? theme.connectionDot.connected : theme.connectionDot.disconnected}></div>
              )}
              {config.showMessageCount && (
                <span>{messages.length} messages</span>
              )}
            </div>
          )}
        </div>
      </header>
      
      {/* Messages */}
      <MessageList 
        messages={messages}
        showTypingIndicator={config.enableTypingIndicator ? showTypingIndicator : false}
        streamingMessageId={streamingMessageId}
      />
      
      {/* Input */}
      <MessageInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}   
        placeholder={config.placeholder || "Type your message..."}
      />
    </div>
    )
}