import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummaryFromOpenAI = async (pdfText: string) => {
  try {
    const response = await client.responses.create({
      model: "gpt-5",
      reasoning: { effort: "low" },
      instructions: SUMMARY_SYSTEM_PROMPT,
      input: `
Transform the following document into an engaging, easy-to-read summary.
Use contextually relevant emojis and proper markdown formatting.
Strictly follow the predefined structure and formatting rules.

Document content:
\n\n${pdfText}
`,
    });

    return response;
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error("RATEE_LIMIT_EXCEEDED");
    }
    throw error;
  }
};
