import type { User, Chat, Message } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Current User',
    isOnline: true,
  },
  {
    id: '2',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: false,
  },
  {
    id: '3',
    name: 'AI Assistant',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isAI: true,
    isOnline: true,
  },
];

export const mockChats: Chat[] = [
  {
    id: '1',
    participants: [mockUsers[1]],
    lastMessage: {
      id: '1',
      content: 'Hey, how are you?',
      senderId: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    type: 'private',
  },
  {
    id: '2',
    participants: [mockUsers[2]],
    lastMessage: {
      id: '2',
      content: 'I can help you with that!',
      senderId: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'delivered',
      type: 'text',
    },
    unreadCount: 2,
    type: 'ai',
  },
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: 'Hey, how are you?',
      senderId: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'read',
      type: 'text',
    },
    {
      id: '2',
      content: 'I\'m good, thanks! How about you?',
      senderId: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
      status: 'read',
      type: 'text',
    },
  ],
  '2': [
    {
      id: '1',
      content: 'Can you help me with a coding problem?',
      senderId: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      status: 'read',
      type: 'text',
    },
    {
      id: '2',
      content: 'I can help you with that!',
      senderId: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'delivered',
      type: 'text',
    },
  ],
}; 