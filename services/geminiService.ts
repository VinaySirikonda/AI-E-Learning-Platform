
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a concise summary for a given video lesson title.
 * @param lessonTitle The title of the lesson.
 * @returns A promise that resolves to the summary text (can be markdown).
 */
export const generateLessonSummary = async (lessonTitle: string): Promise<string> => {
  const prompt = `
    You are an expert educator. Your task is to provide a concise, easy-to-understand summary for an e-learning video lesson.

    Lesson Title: "${lessonTitle}"

    Based on this title, generate a summary covering the likely key concepts. Structure the summary with the following format:
    - A brief introductory sentence.
    - 3-5 bullet points highlighting the main topics.
    - A concluding sentence on why this topic is important.

    Use markdown for formatting (e.g., '*' for bullet points, '**' for bold text).
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            // Disable thinking for faster, more concise responses suitable for this task.
            thinkingConfig: { thinkingBudget: 0 }
        }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Provide a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(`Failed to generate summary from AI. Reason: ${errorMessage}`);
  }
};
