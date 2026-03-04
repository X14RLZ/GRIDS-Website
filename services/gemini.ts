
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * REQUIREMENT 4: Search Grounding & Geo-Data
 * Utilizes Gemini 2.5 Flash for Maps Grounding and Gemini 3 Flash for Search Grounding.
 */

export const GeminiAI = {
  // Requirement 4: Policy & Data Grounding using Google Search
  async getGroundedAnalysis(indicatorTitle: string, query: string) {
    const prompt = `Based on the latest Philippine statistics and Baguio City local policies, analyze this GAD indicator: ${indicatorTitle}. Query: ${query}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  }
};
