import type { Message } from '../types';

// This is a simple mock AI service that simulates responses
export class AIService {
  private static instance: AIService;
  private responses: string[] = [
    "I understand your question. Let me help you with that.",
    "That's an interesting point. Here's what I think...",
    "I can help you solve this problem. Here's a solution:",
    "Let me analyze that for you...",
    "Based on my knowledge, I would suggest...",
  ];

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateResponse(message: Message): Promise<Message> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const randomResponse = this.responses[Math.floor(Math.random() * this.responses.length)];
    
    return {
      id: Date.now().toString(),
      content: randomResponse,
      senderId: '3', // AI user ID
      timestamp: new Date(),
      status: 'sent' as const,
      type: 'text' as const,
    };
  }
} 