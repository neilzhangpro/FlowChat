import { FlowChat } from './components/FlowChat';
import type { FlowChatConfig } from './components/FlowChat';

function App() {
  const config: FlowChatConfig = {
    websocketUrl: 'ws://localhost:8080',
    title: 'FlowChat',
    subtitle: 'Another AI chat interface',
    theme: 'light',
    height: '100vh',
    showConnectionStatus: true,
    showMessageCount: true,
    enableTypingIndicator: true,
    placeholder: 'Type your message...'
  };

  const handleMessage = (message: string) => {
    console.log('用户发送消息:', message);
  };

  const handleConnectionChange = (status: 'connecting' | 'connected' | 'disconnected') => {
    console.log('连接状态变化:', status);
  };

  return (
    <FlowChat 
      config={config}
      onMessage={handleMessage}
      onConnectionChange={handleConnectionChange}
    />
  )
}

export default App;