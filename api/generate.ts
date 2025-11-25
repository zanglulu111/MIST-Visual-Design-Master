import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { prompt, systemInstruction } = await req.json();
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server Configuration Error: API_KEY is missing." }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Use gemini-2.5-flash as configured
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            purist: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                prompt: { type: Type.STRING },
                translation: { type: Type.STRING },
                reasoning: { type: Type.STRING }
              },
              required: ["title", "prompt", "translation"]
            },
            aesthete: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                prompt: { type: Type.STRING },
                translation: { type: Type.STRING },
                reasoning: { type: Type.STRING }
              },
              required: ["title", "prompt", "translation"]
            },
            storyteller: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                prompt: { type: Type.STRING },
                translation: { type: Type.STRING },
                reasoning: { type: Type.STRING }
              },
              required: ["title", "prompt", "translation"]
            }
          },
          required: ["purist", "aesthete", "storyteller"]
        }
      }
    });

    return new Response(response.text, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("Vercel API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
