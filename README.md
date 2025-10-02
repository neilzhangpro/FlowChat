# FlowChat React

<div align="center">

![npm version](https://img.shields.io/npm/v/@tomiezhang/flowchat-react?style=flat-square)
![React](https://img.shields.io/badge/React-18%2B-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A beautiful and customizable WebSocket chat component for React**

*Real-time messaging with theme support, streaming responses, and complete TypeScript integration*

[📦 Installation](#installation) • [🚀 Quick Start](#quick-start) • [📖 API Reference](#api-reference) • [🎨 Themes](#themes)

</div>

---

## ✨ Features

- 🎯 **TypeScript First** - Complete type safety and excellent IDE support
- 🎨 **Theme System** - Built-in light/dark themes with full customization
- ⚡ **WebSocket Integration** - Real-time messaging with auto-reconnection
- 📱 **Responsive Design** - Works seamlessly across all devices
- 🔄 **Streaming Support** - Real-time message streaming with visual indicators
- 🛠 **Highly Configurable** - Extensive configuration options for all use cases
- 📦 **Lightweight** - Minimal dependencies, optimized bundle size

## Installation

```bash
npm install @tomiezhang/flowchat-react
# or
yarn add @tomiezhang/flowchat-react
# or
pnpm add @tomiezhang/flowchat-react
```

## Quick Start

```tsx
import { FlowChat } from '@tomiezhang/flowchat-react'
import type { FlowChatConfig } from '@tomiezhang/flowchat-react'

function App() {
  const config: FlowChatConfig = {
    websocketUrl: 'ws://localhost:8080',
    title: 'My AI Assistant',
    theme: 'light'
  }

  return <FlowChat config={config} />
}
```

### With Callbacks

```tsx
import { FlowChat } from '@tomiezhang/flowchat-react'

function App() {
  const handleMessage = (message: string) => {
    console.log('User sent:', message)
  }

  const handleConnectionChange = (status: 'connecting' | 'connected' | 'disconnected') => {
    console.log('Connection status:', status)
  }

  return (
    <FlowChat 
      config={{
        websocketUrl: 'ws://localhost:8080',
        title: 'Smart Assistant',
        theme: 'dark',
        height: '600px'
      }}
      onMessage={handleMessage}
      onConnectionChange={handleConnectionChange}
    />
  )
}
```

## API Reference

### FlowChatConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `websocketUrl` | `string` | `'ws://localhost:8080'` | WebSocket server URL |
| `autoReconnect` | `boolean` | `true` | Enable automatic reconnection |
| `title` | `string` | `'FlowChat'` | Chat header title |
| `subtitle` | `string` | `'Another AI chat interface'` | Chat header subtitle |
| `placeholder` | `string` | `'Type your message...'` | Input placeholder text |
| `theme` | `'light' \| 'dark'` | `'light'` | UI theme |
| `height` | `string` | `'100vh'` | Component height |
| `showConnectionStatus` | `boolean` | `true` | Show connection indicator |
| `showMessageCount` | `boolean` | `true` | Show message count |
| `enableTypingIndicator` | `boolean` | `true` | Show typing animation |
| `headerClassName` | `string` | `undefined` | Custom header CSS classes |
| `containerClassName` | `string` | `undefined` | Custom container CSS classes |

### Props

| Property | Type | Description |
|----------|------|-------------|
| `config` | `FlowChatConfig` | Configuration object |
| `onMessage` | `(message: string) => void` | Callback when user sends message |
| `onConnectionChange` | `(status: string) => void` | Callback when connection status changes |

## Themes

### Built-in Themes

**Light Theme**
```tsx
<FlowChat config={{ theme: 'light' }} />
```

**Dark Theme**
```tsx
<FlowChat config={{ theme: 'dark' }} />
```

### Custom Styling

Override styles using CSS classes:

```tsx
<FlowChat 
  config={{
    headerClassName: 'bg-gradient-to-r from-blue-500 to-purple-600',
    containerClassName: 'border-2 border-blue-200 rounded-xl shadow-2xl'
  }}
/>
```

## Advanced Usage

### Individual Components

```tsx
import { 
  ChatInterface, 
  MessageList, 
  MessageInput,
  ThemeProvider 
} from '@tomiezhang/flowchat-react'

function CustomChat() {
  return (
    <ThemeProvider theme="dark">
      <div className="custom-chat-container">
        <MessageList 
          messages={messages} 
          showTypingIndicator={false} 
          streamingMessageId={null} 
        />
        <MessageInput 
          onSendMessage={handleSend} 
          isLoading={false} 
          placeholder="Type here..." 
        />
      </div>
    </ThemeProvider>
  )
}
```

### WebSocket Hook

```tsx
import { useWebSocketChat } from '@tomiezhang/flowchat-react'

function useCustomChat() {
  const {
    messages,
    isLoading,
    connectionStatus,
    sendMessage
  } = useWebSocketChat({
    url: 'ws://your-server.com:8080',
    autoReconnect: true
  })

  return { messages, isLoading, connectionStatus, sendMessage }
}
```

## WebSocket Protocol

The component expects WebSocket messages in this format:

```typescript
// Welcome message
{
  type: 'welcome',
  data: {
    id: string,
    content: string,
    timestamp: string
  }
}

// Streaming start
{
  type: 'stream_start',
  data: {
    id: string,
    timestamp: string
  }
}

// Streaming chunk
{
  type: 'stream_chunk',
  data: {
    content: string
  }
}

// Streaming end
{
  type: 'stream_end',
  data: {
    id: string,
    content: string,
    timestamp: string
  }
}
```

## CSS Requirements

This component uses **Tailwind CSS**. Ensure Tailwind is installed in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## TypeScript Support

Full TypeScript support is included. All types are exported:

```tsx
import type { 
  FlowChatConfig,
  ChatTheme,
  Message,
  ChatState 
} from '@tomiezhang/flowchat-react'
```

## Examples

### Basic Chat
```tsx
<FlowChat config={{ websocketUrl: 'ws://localhost:3001' }} />
```

### Customized Chat
```tsx
<FlowChat 
  config={{
    websocketUrl: 'ws://localhost:3001',
    title: 'Customer Support',
    subtitle: 'How can we help you?',
    theme: 'dark',
    height: '500px',
    placeholder: 'Ask us anything...'
  }}
/>
```

### With Event Handlers
```tsx
<FlowChat 
  config={{ websocketUrl: 'ws://localhost:3001' }}
  onMessage={(msg) => analytics.track('message_sent', { message: msg })}
  onConnectionChange={(status) => setConnectionStatus(status)}
/>
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- WebSocket integration
- Theme support
- TypeScript support
- Streaming messages

---

<div align="center">

Made with ❤️ by [Tomie Zhang](https://github.com/neilzhangpro)

[⭐ Star on GitHub](https://github.com/neilzhangpro/flowchat-react) • [🐛 Report Bug](https://github.com/neilzhangpro/flowchat-react/issues) • [💡 Request Feature](https://github.com/neilzhangpro/flowchat-react/issues)

</div>