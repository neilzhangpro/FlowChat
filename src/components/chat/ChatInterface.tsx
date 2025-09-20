import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from '../input/MessageInput';
//import { useChat } from '../hooks/useChat';
import { useWebSocketChat } from '../hooks/useWebSocketChat';

export const ChatInterface: React.FC = () => {
    const {
        messages,
        isLoading,
        showTypingIndicator,
        streamingMessageId,
        connectionStatus,
        sendMessage,
        clearMessages,
        updateMessage,
        handleMessage,
        reconnect,
        disconnect,
    } = useWebSocketChat();
    
    //render
    return (
        <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">FlowChat</h1>
            <p className="text-xs text-gray-500">Another AI chat interface</p>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <span>{messages.length} messages</span>
          </div>
        </div>
      </header>
      
      {/* Messages */}
      <MessageList 
        messages={messages}
        showTypingIndicator={showTypingIndicator}
        streamingMessageId={streamingMessageId}
      />
      
      {/* Input */}
      <MessageInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}   
        placeholder="Type your message..."
      />
    </div>
    )
}