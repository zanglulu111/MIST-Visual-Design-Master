import { GoogleGenerativeAI } from "@google/generative-ai";

// 读取 Key，防崩处理
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

// --- 定义返回类型 ---
export interface MasterPromptResult {
  purist: string;
  aesthete: string;
  creative: string;
}

// --- 视觉导演系统指令 (V2) ---
const MASTER_SYSTEM_INSTRUCTION = `
ROLE:
You are a World-Class AI Visual Director and Prompt Engineer specialized in Midjourney V6.

TASK:
Receive a raw list of visual tags (Raw Data).
Generate 3 DISTINCT variations of Midjourney prompts based on the following strategies:

1. THE PURIST (Logical Fix):
   - Focus: Logic and coherence.
   - Action: Fix conflicting tags (e.g. "Robot" + "Ancient"). Prioritize the Subject.
   - Tone: Clear, descriptive, high-fidelity.

2. THE AESTHETE (Artistic Soul):
   - Focus: Style and Atmosphere.
   - Action: Weave the "Visual Soul" (Director style) into the lighting and mood.
   - Tone: Poetic, cinematic, evocative.

3. THE CREATIVE (Wild Card):
   - Focus: Narrative and Drama.
   - Action: Add a specific, unprompted detail (a prop, a background event) that tells a story.
   - Tone: Dramatic, dynamic.

OUTPUT FORMAT:
Return a JSON object strictly. Do not use Markdown code blocks.
{
  "purist": "string...",
  "aesthete": "string...",
  "creative": "string..."
}
`;

// --- 核心函数：生成三套方案 ---
// ⚠️ 这就是报错说缺失的那个函数！
export async function generateMasterPrompts(rawPrompt: string): Promise<MasterPromptResult> {
  
  // 1. 检查 Key
  if (!API_KEY || !genAI) {
    console.error("❌ API Key 缺失");
    return {
      purist: "Error: API Key missing. Check .env file.",
      aesthete: "Error: API Key missing.",
      creative: "Error: API Key missing."
    };
  }

  try {
    // 2. 调用模型 (使用 json 模式确保格式正确)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-pro-preview", 
      systemInstruction: MASTER_SYSTEM_INSTRUCTION,
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(`RAW DATA:\n${rawPrompt}`);
    const response = result.response;
    const text = response.text();

    // 3. 解析 JSON
    const data = JSON.parse(text);
    
    // 4. 返回结果
    return {
      purist: data.purist || "Generation failed",
      aesthete: data.aesthete || "Generation failed",
      creative: data.creative || "Generation failed"
    };

  } catch (error) {
    console.error("Gemini Request Failed:", error);
    return {
      purist: "AI connection failed.",
      aesthete: "Please check your network.",
      creative: "Or check your API Key quota."
    };
  }
}

// --- 旧函数兼容 (如果别的地方还在用) ---
export async function enhancePromptWithGemini(rawPrompt: string): Promise<string> {
  const res = await generateMasterPrompts(rawPrompt);
  return res.aesthete; // 默认返回艺术版
}
