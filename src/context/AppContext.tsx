import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Chat, Message } from '../types';
import { mockUsers, mockChats, mockMessages } from '../mocks/data';

type Action =
  | { type: 'SET_CURRENT_CHAT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'UPDATE_MESSAGE_STATUS'; payload: { chatId: string; messageId: string; status: Message['status'] } };

const initialState: AppState = {
  currentUser: mockUsers[0],
  chats: mockChats,
  currentChatId: null,
  messages: mockMessages,
  theme: 'light',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChatId: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.chatId]: [
            ...(state.messages[action.payload.chatId] || []),
            action.payload.message,
          ],
        },
      };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_CHAT':
      return { ...state, chats: [...state.chats, action.payload] };
    case 'UPDATE_MESSAGE_STATUS':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.chatId]: state.messages[action.payload.chatId].map(msg =>
            msg.id === action.payload.messageId
              ? { ...msg, status: action.payload.status }
              : msg
          ),
        },
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 