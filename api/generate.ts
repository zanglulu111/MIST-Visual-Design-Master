// api/generate.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: 'edge', // 使用 Edge Runtime 以获得更快的响应
};

export default async function handler(req: Request) {
  // 1. 只允许 POST 请求
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 2. 从 Vercel 环境变量中获取 Key (注意：不要在代码里硬编码 Key)
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "Server API Key missing" }), { status: 500 });
    }

    // 3. 解析前端发来的 prompt
    const { prompt } = await req.json();

    // 4. 初始化 Google AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // 注意：Gemini 2.5 Flash 属于新模型，如果旧版 SDK 不支持，请改回 gemini-1.5-flash 或升级 SDK
    // 这里沿用您代码里的模型
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      systemInstruction: `
ROLE: You are a World-Class AI Visual Director.
TASK: Generate 3 DISTINCT Midjourney prompts (Purist, Aesthete, Creative) based on the raw input.
OUTPUT: Strict JSON object with keys: purist, aesthete, creative.
`,
      generationConfig: { responseMimeType: "application/json" }
    });

    // 5. 调用 Google
    const result = await model.generateContent(`RAW DATA:\n${prompt}`);
    const response = result.response;
    const text = response.text();

    // 6. 将结果返回给前端
    return new Response(text, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("Server API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}