import { MasterPromptResult } from "../types";

// NOTE: We do NOT import @google/genai here anymore. 
// The client-side code interacts only with our own /api/generate endpoint.

const SYSTEM_INSTRUCTION = `
Role: You are a world-class Midjourney Prompt Engineer and Visual Director.

Input: A raw, potentially contradictory list of visual tags provided by a user (The "Raw Data").
Task: Analyze the Raw Data and generate 3 distinct, high-quality Midjourney prompts based on the following strategies.

---
STRATEGY 1: THE PURIST (Logical Fix / 逻辑修复)
- Goal: Fix logic errors (e.g., conflicting subject types, impossible weather) while keeping as many user tags as possible.
- Method:
  1. Identify the Main Subject. If multiple conflicting species/genders exist, pick the most specific/interesting one (e.g., Orc > Human).
  2. Consolidate Fashion/Attire into a coherent outfit.
  3. Ensure Weather/Time physics make sense.
  4. Structure: [Medium/Style] + [Subject description] + [Action/Pose] + [Environment/Props] + [Lighting/Atmosphere] + --v 6.0 --style raw

STRATEGY 2: THE AESTHETE (Artistic Soul / 艺术升华)
- Goal: Maximize the visual style defined in the "Layer 0" (Medium/Soul/Global) tags.
- Method:
  1. Prioritize Artist names, Art Movements, and Rendering Engines over literal object descriptions.
  2. Rewrite the Subject and Scene to fit strictly within that art style (e.g., if "Ukiyo-e" is selected, the "Cyberpunk City" becomes "Edo-period Sci-fi woodblock print").
  3. Use emotive, abstract adjectives.

STRATEGY 3: THE STORYTELLER (Cinematic / 叙事重构)
- Goal: Create a dramatic, cohesive scene focusing on mood and lighting.
- Method:
  1. Focus on the "Action", "Expression", and "Gaze".
  2. Describe the interaction between the Subject and the Environment.
  3. Use lighting (Volumetric, Rim, etc.) to glue the scene together.
  4. Discard minor details that clutter the composition.
  5. Create a specific "moment in time".

---
TRANSLATION REQUIREMENT:
For each prompt, provide a "translation" field in CHINESE (Simplified).
This translation should not just be a literal translation, but an explanation of the visual intent suitable for a Chinese user to understand the scene.

Constraint:
- Output strictly in JSON format.
- The 'prompt' field must be English.
- The 'translation' field must be Chinese.
`;

// Helper for retry delay
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateMasterPrompts = async (rawPrompt: string): Promise<MasterPromptResult> => {
  let lastError: any;
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Fetch from our own Vercel API route (proxies to Google)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: rawPrompt,
          systemInstruction: SYSTEM_INSTRUCTION
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      return data as MasterPromptResult;

    } catch (error: any) {
      lastError = error;
      console.warn(`Attempt ${attempt + 1} failed:`, error.message);

      // Retry on network errors or specific server errors
      const isRetryable = 
        !error.message || 
        error.message.includes('504') || 
        error.message.includes('503') ||
        error.message.includes('429');

      if (isRetryable && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000 + (Math.random() * 500);
        await wait(delay);
        continue;
      }
      
      break;
    }
  }

  console.error("AI Generation Fatal Error:", lastError);
  throw lastError;
};
