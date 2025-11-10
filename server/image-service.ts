/**
 * Image Service - خدمة توليد وتحليل الصور
 * يستخدم Replicate API مع نموذج مجاني و Gemini لتحليلها
 */

import axios from "axios";
import Replicate from "replicate";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// إنشاء عميل Replicate
const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

/**
 * توليد صورة باستخدام Replicate API
 * يستخدم نموذج Lykon/DreamShaper (مجاني وموثوق)
 */
export async function generateImage(prompt: string): Promise<{ imageUrl: string; base64: string }> {
  if (!REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN is not configured");
  }

  try {
    // استخدام DreamShaper - نموذج مجاني وموثوق
    const output = await replicate.run(
      "lykon-ai/dreamshaper-8",
      {
        input: {
          prompt: prompt,
          negative_prompt: "blurry, low quality, distorted",
          num_outputs: 1,
          num_inference_steps: 25,
          guidance_scale: 7.5,
          scheduler: "DPMSolverMultistep",
        },
      }
    );

    // الحصول على رابط الصورة
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      throw new Error("لم يتم الحصول على رابط الصورة من Replicate");
    }

    // تحميل الصورة وتحويلها إلى base64
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 30000,
    });
    const base64 = Buffer.from(imageResponse.data).toString("base64");

    return { imageUrl, base64 };
  } catch (error: any) {
    console.error("[Image Generation] Error:", error.message);
    throw new Error(`فشل في توليد الصورة: ${error.message}`);
  }
}

/**
 * تحليل صورة باستخدام Gemini Vision
 */
export async function analyzeImage(imageBase64: string, question?: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  try {
    const prompt = question || "صف هذه الصورة بالتفصيل باللغة العربية";

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/png",
                data: imageBase64,
              },
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const analysis = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!analysis) {
      throw new Error("لم يتم الحصول على تحليل من Gemini");
    }

    return analysis;
  } catch (error: any) {
    console.error("[Image Analysis] Error:", error.response?.data || error.message);
    throw new Error("فشل في تحليل الصورة. يرجى المحاولة مرة أخرى.");
  }
}

/**
 * تحليل صورة من URL
 */
export async function analyzeImageFromUrl(imageUrl: string, question?: string): Promise<string> {
  try {
    // تحميل الصورة وتحويلها إلى base64
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64 = Buffer.from(response.data).toString("base64");

    return await analyzeImage(base64, question);
  } catch (error: any) {
    console.error("[Image Analysis from URL] Error:", error.message);
    throw new Error("فشل في تحميل وتحليل الصورة من الرابط.");
  }
}
