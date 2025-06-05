export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  isAI?: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  replyTo?: Message;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  type: 'private' | 'group' | 'ai';
}

export interface AppState {
  currentUser: User;
  chats: Chat[];
  currentChatId: string | null;
  messages: Record<string, Message[]>;
  theme: 'light' | 'dark';
} 