
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface SEOAdviceResponse {
  summary: string;
  difficulty: 'low' | 'medium' | 'high';
  roadmap: string[];
  competitiveEdge: string;
  warning?: string;
  scores: {
    automation: number;
    security: number;
    visibility: number;
    conversion: number;
  };
}

export const getSEOAdvice = async (businessName: string, niche: string): Promise<SEOAdviceResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I have a business named "${businessName}" in the "${niche}" niche. Provide a localized SEO and digital marketing growth roadmap. Include scores from 0-100 for current status in automation, security, visibility, and conversion based on general industry benchmarks for this niche.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A high-level summary of the growth potential." },
            difficulty: { type: Type.STRING, enum: ["low", "medium", "high"], description: "Market saturation/competition level." },
            roadmap: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Step by step marketing actions." },
            competitiveEdge: { type: Type.STRING, description: "One specific unique selling point recommendation." },
            warning: { type: Type.STRING, description: "Potential pitfalls in this specific niche." },
            scores: {
              type: Type.OBJECT,
              properties: {
                automation: { type: Type.NUMBER },
                security: { type: Type.NUMBER },
                visibility: { type: Type.NUMBER },
                conversion: { type: Type.NUMBER }
              },
              required: ["automation", "security", "visibility", "conversion"]
            }
          },
          required: ["summary", "difficulty", "roadmap", "competitiveEdge", "scores"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
