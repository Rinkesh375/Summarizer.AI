import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const ai = new GoogleGenAI({ apiKey });

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Transform the following document into an engaging, easy-to-read summary.
Use contextually relevant emojis and proper markdown formatting.
Strictly follow the predefined structure and formatting rules.

Document content:
${pdfText}
      `,
      config: {
        systemInstruction: SUMMARY_SYSTEM_PROMPT,
        temperature: 0.7,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    return {
      content: response.text,
      usage: {
        promptTokens: response.usageMetadata?.promptTokenCount ?? 0,
        completionTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
        totalTokens: response.usageMetadata?.totalTokenCount ?? 0,
      },
    };
  } catch (error: any) {
    const isRateLimit =
      error?.status === 429 ||
      error?.message?.includes("429") ||
      error?.message?.includes("RESOURCE_EXHAUSTED");

    if (isRateLimit) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
};
