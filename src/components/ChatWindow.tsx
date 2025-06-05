import { useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { GeminiService } from '../services/gemini';
import { MessageContent } from './MessageContent';

export function ChatWindow() {
  const { state, dispatch } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentChat = state.chats.find(chat => chat.id === state.currentChatId);
  const messages = state.messages[state.currentChatId || ''] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const content = input.value.trim();

    if (content && state.currentChatId) {
      const newMessage = {
        id: Date.now().toString(),
        content,
        senderId: state.currentUser.id,
        timestamp: new Date(),
        status: 'sending' as const,
        type: 'text' as const,
      };

      dispatch({
        type: 'ADD_MESSAGE',
        payload: { chatId: state.currentChatId, message: newMessage },
      });

      // Simulate message delivery
      setTimeout(() => {
        dispatch({
          type: 'UPDATE_MESSAGE_STATUS',
          payload: {
            chatId: state.currentChatId!,
            messageId: newMessage.id,
            status: 'delivered' as const,
          },
        });
      }, 1000);

      input.value = '';

      // If this is an AI chat, generate a response using Gemini
      if (currentChat?.type === 'ai') {
        const geminiService = GeminiService.getInstance();
        const aiResponse = await geminiService.generateResponse(content);
        
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          senderId: '3', // AI user ID
          timestamp: new Date(),
          status: 'delivered' as const,
          type: 'text' as const,
        };

        dispatch({
          type: 'ADD_MESSAGE',
          payload: { chatId: state.currentChatId, message: aiMessage },
        });
      }
    }
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Welcome to Telegram Clone
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="relative">
          <img
            src={currentChat.participants[0].avatar || 'https://via.placeholder.com/40'}
            alt={currentChat.participants[0].name}
            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          />
          {currentChat.participants[0].isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {currentChat.participants[0].name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentChat.participants[0].isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === state.currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`message-bubble ${
                message.senderId === state.currentUser.id
                  ? 'message-bubble-out'
                  : 'message-bubble-in'
              }`}
            >
              <MessageContent
                content={message.content}
                isAI={message.senderId === '3'}
              />
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs opacity-75">
                  {format(message.timestamp, 'HH:mm')}
                </span>
                {message.senderId === state.currentUser.id && (
                  <span className="text-xs">
                    {message.status === 'sending' && '🕒'}
                    {message.status === 'sent' && '✓'}
                    {message.status === 'delivered' && '✓✓'}
                    {message.status === 'read' && '✓✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex space-x-2">
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="chat-input"
          />
          <button
            type="submit"
            className="btn-primary"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 