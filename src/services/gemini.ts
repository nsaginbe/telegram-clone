import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenerativeAI;
  private model: string = "gemini-2.0-flash";

  private constructor() {
    this.ai = new GoogleGenerativeAI("AIzaSyCtxWP_T_pGUsthLNef02AemkERFjwojpw");
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
      return "I apologize, but I'm having trouble generating a response right now.";
    }
  }
}

 