# 🤖 SevenAI - الذكاء الاصطناعي العربي المتقدم

<div align="center">

![SevenAI Logo](client/public/logo.png)

**ذكاء اصطناعي عربي متقدم مع نظام تفكير عميق وذاكرة ذكية**

مطور بإخلاص بواسطة **ليث النسر** من شركة **Seven_code7**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## ✨ المميزات

### 🧠 التفكير العميق (Deep Thinking)
- نظام تفكير متقدم يحلل الأسئلة بعمق
- Chain-of-Thought reasoning
- إجابات شاملة ومفصلة

### 💾 الذاكرة الذكية (Smart Memory)
- يتذكر معلومات المستخدم من المحادثات السابقة
- نظام RAG (Retrieval-Augmented Generation)
- تخزين ذكي للحقائق والتفضيلات

### 🎨 توليد وتحليل الصور
- توليد صور من النص باستخدام AI
- تحليل الصور والإجابة على الأسئلة عنها
- دعم متعدد الوسائط

### 🌐 واجهة مستخدم حديثة
- تصميم عصري مع Glass Morphism
- Animations سلسة وجذابة
- Responsive Design للجوال والحاسوب
- دعم كامل للغة العربية (RTL)

### 🔒 الأمان والخصوصية
- نظام أمان متقدم
- حماية من الاستخدام الضار
- مصادقة آمنة

---

## 🚀 التقنيات المستخدمة

### Frontend
- **React 19** - أحدث إصدار
- **TypeScript** - Type safety
- **Vite** - Build tool سريع
- **TailwindCSS 4** - Styling حديث
- **tRPC** - Type-safe API
- **TanStack Query** - Data fetching
- **Radix UI** - Accessible components
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **tRPC** - Type-safe API
- **Drizzle ORM** - Database ORM
- **MySQL** - Database
- **OpenAI API** - LLM integration
- **Replicate** - Image generation

### DevOps
- **pnpm** - Package manager
- **ESBuild** - Bundler
- **Prettier** - Code formatting
- **TypeScript** - Type checking

---

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- pnpm 8+
- MySQL 8+

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/your-repo/sevenai.git
cd sevenai
```

2. **تثبيت الحزم**
```bash
pnpm install
```

3. **إعداد قاعدة البيانات**
```bash
# إنشاء ملف .env
cp .env.example .env

# تعديل إعدادات قاعدة البيانات في .env
# ثم تشغيل migrations
pnpm db:push
```

4. **تشغيل المشروع**
```bash
# Development mode
pnpm dev

# Production build
pnpm build
pnpm start
```

---

## 🔧 الإعدادات

### ملف `.env`

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/sevenai"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Replicate (للصور)
REPLICATE_API_TOKEN="your-replicate-token"

# OAuth (اختياري)
OAUTH_CLIENT_ID="your-client-id"
OAUTH_CLIENT_SECRET="your-client-secret"

# Server
PORT=3000
NODE_ENV=development
```

---

## 📚 البنية المعمارية

```
sevenai/
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Pages
│   │   ├── hooks/       # Custom Hooks
│   │   ├── lib/         # Utilities
│   │   └── contexts/    # React Contexts
│   └── public/          # Static assets
├── server/              # Backend
│   ├── _core/           # Core functionality
│   ├── routers.ts       # tRPC routers
│   ├── db.ts            # Database layer
│   ├── llama-engine.ts  # AI engine
│   └── image-service.ts # Image services
├── shared/              # Shared types
└── drizzle/             # Database schema
```

---

## 🎯 الاستخدام

### المحادثة الأساسية
```typescript
// إرسال رسالة عادية
await trpc.chat.sendMessage.mutate({
  message: "مرحباً، كيف حالك؟",
  useDeepThinking: false
});
```

### التفكير العميق
```typescript
// إرسال رسالة مع التفكير العميق
await trpc.chat.sendMessage.mutate({
  message: "اشرح لي الذكاء الاصطناعي بالتفصيل",
  useDeepThinking: true
});
```

### توليد صورة
```typescript
await trpc.image.generate.mutate({
  prompt: "منظر طبيعي جميل مع غروب الشمس"
});
```

### تحليل صورة
```typescript
await trpc.image.analyze.mutate({
  imageBase64: "base64-encoded-image",
  question: "ما الذي تراه في هذه الصورة؟"
});
```

---

## 🎨 التخصيص

### تغيير الألوان
عدّل ملف `client/src/index.css`:

```css
:root {
  --primary: var(--color-blue-600);
  --primary-foreground: var(--color-blue-50);
  /* ... */
}
```

### إضافة مكونات جديدة
```bash
# استخدم shadcn/ui
npx shadcn-ui@latest add button
```

---

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
pnpm test

# Type checking
pnpm check

# Linting
pnpm format
```

---

## 📈 الأداء

- ⚡ **Fast Loading**: Vite + Code splitting
- 🎯 **Optimized Queries**: TanStack Query caching
- 🔄 **Smart Updates**: Optimistic updates
- 📦 **Small Bundle**: Tree shaking + minification

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📝 الترخيص

MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل

---

## 👨‍💻 المطور

**ليث النسر**  
شركة Seven_code7

- 🌐 Website: [seven-code7.com](https://seven-code7.com)
- 📧 Email: contact@seven-code7.com
- 💼 LinkedIn: [linkedin.com/in/laith-alnasir](https://linkedin.com/in/laith-alnasir)

---

## 🙏 شكر وتقدير

- OpenAI لتوفير GPT API
- Replicate لخدمات توليد الصور
- المجتمع العربي للذكاء الاصطناعي

---

<div align="center">

**صُنع بـ ❤️ في الأردن 🇯🇴**

© 2025 SevenAI - جميع الحقوق محفوظة

</div>
