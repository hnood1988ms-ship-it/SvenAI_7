/**
 * Validators للإدخال
 */
import { z } from 'zod';

// Message validation
export const messageSchema = z.object({
  content: z.string()
    .min(1, 'الرسالة فارغة')
    .max(4000, 'الرسالة طويلة جداً'),
  conversationId: z.number().optional(),
  useDeepThinking: z.boolean().default(false),
});

// Image generation validation
export const imageGenerationSchema = z.object({
  prompt: z.string()
    .min(3, 'الوصف قصير جداً')
    .max(500, 'الوصف طويل جداً'),
  style: z.enum(['realistic', 'artistic', 'anime']).optional(),
  size: z.enum(['512x512', '1024x1024']).optional(),
});

// Image analysis validation
export const imageAnalysisSchema = z.object({
  imageBase64: z.string().min(1, 'الصورة مطلوبة'),
  question: z.string().max(500).optional(),
});

// Conversation validation
export const conversationSchema = z.object({
  title: z.string()
    .min(1, 'العنوان فارغ')
    .max(255, 'العنوان طويل جداً')
    .optional(),
});

// User fact validation
export const userFactSchema = z.object({
  factType: z.string().min(1).max(100),
  factValue: z.string().min(1).max(1000),
});

// Sanitization helpers
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 4000); // Limit length
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validation helpers
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function containsArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

export function containsEnglish(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}
