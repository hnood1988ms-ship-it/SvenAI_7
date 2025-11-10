/**
 * Web Search Engine - محرك البحث على الويب
 * يستخدم APIs مجانية للبحث على الإنترنت
 */

import axios from 'axios';
import { logger } from './utils/logger';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

interface WebSearchResponse {
  results: SearchResult[];
  query: string;
  timestamp: Date;
}

/**
 * البحث باستخدام DuckDuckGo (مجاني)
 */
async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get('https://api.duckduckgo.com/', {
      params: {
        q: query,
        format: 'json',
        no_html: 1,
        skip_disambig: 1,
      },
      timeout: 5000,
    });

    const results: SearchResult[] = [];

    // Abstract
    if (response.data.Abstract) {
      results.push({
        title: response.data.Heading || 'نتيجة رئيسية',
        url: response.data.AbstractURL || '',
        snippet: response.data.Abstract,
        source: 'DuckDuckGo',
      });
    }

    // Related Topics
    if (response.data.RelatedTopics) {
      for (const topic of response.data.RelatedTopics.slice(0, 3)) {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text.split(' - ')[0] || 'نتيجة',
            url: topic.FirstURL,
            snippet: topic.Text,
            source: 'DuckDuckGo',
          });
        }
      }
    }

    return results;
  } catch (error) {
    logger.error('DuckDuckGo search error', { error });
    return [];
  }
}

/**
 * البحث باستخدام Wikipedia (مجاني)
 */
async function searchWikipedia(query: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get('https://ar.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        srsearch: query,
        format: 'json',
        srlimit: 3,
      },
      timeout: 5000,
    });

    const results: SearchResult[] = [];

    if (response.data.query?.search) {
      for (const item of response.data.query.search) {
        results.push({
          title: item.title,
          url: `https://ar.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
          snippet: item.snippet.replace(/<[^>]*>/g, ''), // Remove HTML tags
          source: 'Wikipedia',
        });
      }
    }

    return results;
  } catch (error) {
    logger.error('Wikipedia search error', { error });
    return [];
  }
}

/**
 * محرك البحث الرئيسي
 */
export async function searchWeb(query: string): Promise<WebSearchResponse> {
  logger.info('Web search started', { query });

  const startTime = Date.now();

  // البحث في مصادر متعددة بالتوازي
  const [duckResults, wikiResults] = await Promise.all([
    searchDuckDuckGo(query),
    searchWikipedia(query),
  ]);

  // دمج النتائج
  const allResults = [...duckResults, ...wikiResults];

  // إزالة التكرار
  const uniqueResults = allResults.filter(
    (result, index, self) =>
      index === self.findIndex((r) => r.url === result.url)
  );

  const duration = Date.now() - startTime;
  logger.info('Web search completed', { 
    query, 
    resultsCount: uniqueResults.length,
    duration 
  });

  return {
    results: uniqueResults.slice(0, 5), // أفضل 5 نتائج
    query,
    timestamp: new Date(),
  };
}

/**
 * تنسيق نتائج البحث للذكاء الاصطناعي
 */
export function formatSearchResults(searchResponse: WebSearchResponse): string {
  if (searchResponse.results.length === 0) {
    return 'لم يتم العثور على نتائج بحث.';
  }

  let formatted = `نتائج البحث عن "${searchResponse.query}":\n\n`;

  searchResponse.results.forEach((result, index) => {
    formatted += `${index + 1}. **${result.title}**\n`;
    formatted += `   المصدر: ${result.source}\n`;
    formatted += `   ${result.snippet}\n`;
    formatted += `   الرابط: ${result.url}\n\n`;
  });

  return formatted;
}

/**
 * تحديد ما إذا كان السؤال يحتاج بحث ويب
 */
export function needsWebSearch(query: string): boolean {
  const webSearchKeywords = [
    'ابحث', 'بحث', 'search', 'find',
    'أخبار', 'news', 'جديد', 'latest',
    'الآن', 'now', 'حالياً', 'currently',
    'ما هو', 'what is', 'من هو', 'who is',
    'أين', 'where', 'متى', 'when',
    'كيف', 'how', 'لماذا', 'why',
    'معلومات عن', 'information about',
    'تعريف', 'definition', 'شرح', 'explain',
  ];

  const queryLower = query.toLowerCase();
  return webSearchKeywords.some(keyword => queryLower.includes(keyword));
}
