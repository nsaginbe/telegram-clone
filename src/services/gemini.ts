import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenerativeAI;
  private model: string = "gemini-2.0-flash";

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Gemini API key is not set. Please add VITE_GEMINI_API_KEY to your .env file.");
      throw new Error("Gemini API key is not set. Please add VITE_GEMINI_API_KEY to your .env file.");
    }
    this.ai = new GoogleGenerativeAI(apiKey);
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async generateResponse(message: string): Promise<string> {
    try {
      const model = this.ai.getGenerativeModel({ model: this.model });
      const result = await model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating response from Gemini:", error);
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          return "Error: Invalid or missing Gemini API key. Please check your .env file.";
        }
      }
      return "I apologize, but I'm having trouble generating a response right now. Please try again later.";
    }
  }
}

 