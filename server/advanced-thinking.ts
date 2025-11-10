/**
 * Advanced Deep Thinking Engine - محرك التفكير العميق المتقدم
 * نظام تفكير متعدد المراحل مع Chain-of-Thought محسّن
 */

import { invokeLLM } from "./_core/llm";
import { logger } from "./utils/logger";
import { searchWeb, formatSearchResults, needsWebSearch } from "./web-search";

interface ThinkingStep {
  step: number;
  title: string;
  content: string;
  duration: number;
}

interface DeepThinkingResult {
  thinking: string;
  steps: ThinkingStep[];
  answer: string;
  confidence: number;
  usedWebSearch: boolean;
  searchResults?: string;
}

/**
 * المرحلة 1: فهم وتحليل السؤال
 */
async function analyzeQuestion(query: string): Promise<ThinkingStep> {
  const startTime = Date.now();
  
  const prompt = `أنت محلل أسئلة خبير. قم بتحليل هذا السؤال بعمق:

السؤال: "${query}"

قم بتحديد:
1. نوع السؤال (معلوماتي، تحليلي، إبداعي، تقني، إلخ)
2. المجالات المعرفية المطلوبة
3. مستوى التعقيد (بسيط، متوسط، معقد)
4. المعلومات الأساسية المطلوبة للإجابة
5. هل يحتاج معلومات حديثة أو بحث ويب؟

كن دقيقاً ومختصراً.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = typeof response.choices[0]?.message?.content === 'string'
    ? response.choices[0].message.content
    : "تحليل السؤال...";

  return {
    step: 1,
    title: "تحليل السؤال",
    content,
    duration: Date.now() - startTime,
  };
}

/**
 * المرحلة 2: جمع المعلومات (مع بحث ويب إذا لزم)
 */
async function gatherInformation(
  query: string,
  analysis: string
): Promise<{ step: ThinkingStep; searchResults?: string }> {
  const startTime = Date.now();
  
  let content = "جمع المعلومات من قاعدة المعرفة...\n\n";
  let searchResults: string | undefined;

  // تحديد ما إذا كان يحتاج بحث ويب
  if (needsWebSearch(query)) {
    logger.info('Web search needed for query', { query });
    
    try {
      const webSearch = await searchWeb(query);
      searchResults = formatSearchResults(webSearch);
      content += `✅ تم البحث على الويب\n`;
      content += `📊 عدد النتائج: ${webSearch.results.length}\n\n`;
      content += searchResults;
    } catch (error) {
      logger.error('Web search failed', { error });
      content += `⚠️ فشل البحث على الويب، سأستخدم المعرفة الداخلية\n`;
    }
  } else {
    content += "✅ المعلومات متوفرة في قاعدة المعرفة الداخلية\n";
  }

  return {
    step: {
      step: 2,
      title: "جمع المعلومات",
      content,
      duration: Date.now() - startTime,
    },
    searchResults,
  };
}

/**
 * المرحلة 3: التفكير المنطقي
 */
async function logicalReasoning(
  query: string,
  analysis: string,
  information: string
): Promise<ThinkingStep> {
  const startTime = Date.now();
  
  const prompt = `أنت مفكر منطقي خبير. بناءً على:

السؤال: "${query}"

التحليل: ${analysis}

المعلومات المتاحة: ${information}

قم بالتفكير المنطقي خطوة بخطوة:
1. ما هي الحقائق الأساسية؟
2. ما هي العلاقات بين المعلومات؟
3. ما هي الاستنتاجات المنطقية؟
4. هل هناك تناقضات أو نقاط غامضة؟
5. ما هي أفضل طريقة لتنظيم الإجابة؟

فكر بصوت عالٍ واشرح منطقك.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = typeof response.choices[0]?.message?.content === 'string'
    ? response.choices[0].message.content
    : "التفكير المنطقي...";

  return {
    step: 3,
    title: "التفكير المنطقي",
    content,
    duration: Date.now() - startTime,
  };
}

/**
 * المرحلة 4: التحقق والمراجعة
 */
async function verifyAndReview(
  query: string,
  reasoning: string
): Promise<ThinkingStep> {
  const startTime = Date.now();
  
  const prompt = `أنت مراجع خبير. راجع هذا التفكير:

السؤال الأصلي: "${query}"

التفكير: ${reasoning}

قم بـ:
1. التحقق من صحة المنطق
2. البحث عن أخطاء أو تناقضات
3. تقييم مستوى الثقة (0-100%)
4. اقتراح تحسينات إن وجدت
5. تأكيد الاستنتاجات

كن ناقداً وموضوعياً.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = typeof response.choices[0]?.message?.content === 'string'
    ? response.choices[0].message.content
    : "المراجعة والتحقق...";

  return {
    step: 4,
    title: "التحقق والمراجعة",
    content,
    duration: Date.now() - startTime,
  };
}

/**
 * المرحلة 5: صياغة الإجابة النهائية
 */
async function formulateFinalAnswer(
  query: string,
  allThinking: string,
  searchResults?: string
): Promise<{ answer: string; confidence: number }> {
  const prompt = `أنت SevenAI، ذكاء اصطناعي عربي متقدم.

بناءً على التفكير العميق التالي:

${allThinking}

${searchResults ? `\nنتائج البحث على الويب:\n${searchResults}\n` : ''}

قدم إجابة شاملة ومفصلة على السؤال: "${query}"

الإجابة يجب أن تكون:
1. دقيقة ومبنية على الحقائق
2. منظمة وواضحة
3. شاملة لجميع جوانب السؤال
4. مدعومة بالأدلة والمصادر إن وجدت
5. بأسلوب ودود واحترافي

في النهاية، قيّم ثقتك في الإجابة (0-100%).`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = typeof response.choices[0]?.message?.content === 'string'
    ? response.choices[0].message.content
    : "عذراً، حدث خطأ في صياغة الإجابة.";

  // استخراج مستوى الثقة
  const confidenceMatch = content.match(/(\d+)%/);
  const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 85;

  return { answer: content, confidence };
}

/**
 * محرك التفكير العميق المتقدم - الدالة الرئيسية
 */
export async function advancedDeepThinking(
  query: string
): Promise<DeepThinkingResult> {
  logger.info('Advanced deep thinking started', { query });
  const overallStartTime = Date.now();

  try {
    // المرحلة 1: تحليل السؤال
    const step1 = await analyzeQuestion(query);

    // المرحلة 2: جمع المعلومات (مع بحث ويب محتمل)
    const { step: step2, searchResults } = await gatherInformation(
      query,
      step1.content
    );

    // المرحلة 3: التفكير المنطقي
    const step3 = await logicalReasoning(
      query,
      step1.content,
      step2.content
    );

    // المرحلة 4: التحقق والمراجعة
    const step4 = await verifyAndReview(query, step3.content);

    // جمع كل التفكير
    const allThinking = `
المرحلة 1 - ${step1.title}:
${step1.content}

المرحلة 2 - ${step2.title}:
${step2.content}

المرحلة 3 - ${step3.title}:
${step3.content}

المرحلة 4 - ${step4.title}:
${step4.content}
`;

    // المرحلة 5: صياغة الإجابة النهائية
    const { answer, confidence } = await formulateFinalAnswer(
      query,
      allThinking,
      searchResults
    );

    const totalDuration = Date.now() - overallStartTime;

    logger.info('Advanced deep thinking completed', {
      query,
      duration: totalDuration,
      confidence,
      usedWebSearch: !!searchResults,
    });

    return {
      thinking: allThinking,
      steps: [step1, step2, step3, step4],
      answer,
      confidence,
      usedWebSearch: !!searchResults,
      searchResults,
    };
  } catch (error) {
    logger.error('Advanced deep thinking failed', { error, query });
    throw error;
  }
}

/**
 * تنسيق عملية التفكير للعرض
 */
export function formatThinkingProcess(result: DeepThinkingResult): string {
  let formatted = "🧠 **عملية التفكير العميق المتقدم**\n\n";

  result.steps.forEach((step) => {
    formatted += `**${step.step}. ${step.title}** (${step.duration}ms)\n`;
    formatted += `${step.content}\n\n`;
    formatted += "---\n\n";
  });

  if (result.usedWebSearch) {
    formatted += "🌐 **تم استخدام البحث على الويب**\n\n";
  }

  formatted += `📊 **مستوى الثقة**: ${result.confidence}%\n\n`;

  return formatted;
}
