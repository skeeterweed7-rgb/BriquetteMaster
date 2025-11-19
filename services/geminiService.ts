import { GoogleGenAI } from "@google/genai";
import { ProjectType } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

export const getLandscapingAdvice = async (acres: number, projectType: ProjectType | string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      I am planning a landscaping project.
      Project Type: ${projectType}
      Area: ${acres} acres.
      Material: Briquettes (1 briquette covers 100 sq ft).

      Please provide a concise list of 3-5 expert tips for preparing the ground and laying briquettes for this specific size and type of project. 
      Focus on ground preparation, drainage, and maintenance. 
      Keep the tone professional yet encouraging.
      Format the response with Markdown bullet points.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a master landscape architect with 20 years of experience.",
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for simple advice to reduce latency
      }
    });

    return response.text || "Unable to generate advice at this time.";
  } catch (error) {
    console.error("Error fetching landscaping advice:", error);
    return "Sorry, our AI landscaping expert is currently unavailable. Please try again later.";
  }
};