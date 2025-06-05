import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';
import type { Chat } from '../types';
import { mockUsers } from '../mocks/data';

export function Sidebar() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = state.chats.filter(chat =>
    chat.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleChatSelect = (chatId: string) => {
    dispatch({ type: 'SET_CURRENT_CHAT', payload: chatId });
  };

  const handleNewChat = () => {
    const aiUser = mockUsers.find(user => user.isAI);
    if (!aiUser) return;

    const newChat: Chat = {
      id: Date.now().toString(),
      participants: [aiUser],
      type: 'ai',
      unreadCount: 0,
    };

    dispatch({ type: 'ADD_CHAT', payload: newChat });
    dispatch({ type: 'SET_CURRENT_CHAT', payload: newChat.id });
  };

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="chat-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat.id)}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
              state.currentChatId === chat.id ? 'bg-gray-50 dark:bg-gray-800' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={chat.participants[0].avatar || 'https://via.placeholder.com/40'}
                  alt={chat.participants[0].name}
                  className="w-12 h-12 rounded-full ring-2 ring-blue-500"
                />
                {chat.participants[0].isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chat.participants[0].name}
                  </h3>
                  {chat.lastMessage && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {chat.lastMessage
                    ? chat.lastMessage.content
                    : 'No messages yet'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleNewChat}
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>
    </div>
  );
} 