// 主组件
export { FlowChat, default as FlowChatComponent } from './FlowChat';
export type { FlowChatConfig } from './FlowChat';

// 主题系统
export { ThemeProvider, useTheme, themes } from './theme/ThemeProvider';
export type { ChatTheme } from './theme/ThemeProvider';

// 单独的组件（如果需要单独使用）
export { ChatInterface } from './chat/ChatInterface';
export { MessageList } from './chat/MessageList';
export { ChatMessage } from './chat/ChatMessage';
export { MessageInput } from './input/MessageInput';
export { TypingIndicator } from './common/TypingIndicator';

// Hooks
export { useWebSocketChat } from './hooks/useWebSocketChat';

// 类型
export type { Message, ChatState } from './types/chat.types';

// 工具函数
export { formatTime } from '../utils/formatTime';
