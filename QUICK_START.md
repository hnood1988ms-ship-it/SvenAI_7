# 🚀 دليل البدء السريع - SevenAI

## ⚡ البدء في 5 دقائق

### 1. المتطلبات
```bash
✅ Node.js 18+
✅ pnpm 8+
✅ MySQL 8+
```

### 2. التثبيت
```bash
# استنساخ المشروع
git clone https://github.com/your-repo/sevenai.git
cd sevenai

# تثبيت الحزم
pnpm install
```

### 3. الإعداد
```bash
# نسخ ملف البيئة
cp .env.example .env

# تعديل .env بإعداداتك
# DATABASE_URL="mysql://user:password@localhost:3306/sevenai"
# OPENAI_API_KEY="your-key"

# تشغيل migrations
pnpm db:push
```

### 4. التشغيل
```bash
# Development mode
pnpm dev

# سيعمل على http://localhost:3000
```

---

## 🎯 الأوامر الأساسية

```bash
# Development
pnpm dev              # تشغيل المشروع

# Build
pnpm build            # بناء للإنتاج
pnpm start            # تشغيل الإنتاج

# Database
pnpm db:push          # تشغيل migrations

# Quality
pnpm check            # فحص TypeScript
pnpm format           # تنسيق الكود
pnpm test             # تشغيل الاختبارات
```

---

## 📁 البنية الأساسية

```
sevenai/
├── client/           # Frontend (React)
│   ├── src/
│   │   ├── pages/    # الصفحات
│   │   ├── components/ # المكونات
│   │   └── hooks/    # Custom Hooks
│   └── public/       # الملفات الثابتة
├── server/           # Backend (Node.js)
│   ├── _core/        # الوظائف الأساسية
│   ├── routers.ts    # tRPC routers
│   └── db.ts         # قاعدة البيانات
└── shared/           # الأنواع المشتركة
```

---

## 🔧 الإعدادات المهمة

### .env
```env
# الأساسية (مطلوبة)
DATABASE_URL="mysql://user:password@localhost:3306/sevenai"
OPENAI_API_KEY="your-openai-api-key"

# اختيارية
REPLICATE_API_TOKEN="your-replicate-token"
PORT=3000
NODE_ENV=development
```

---

## 🎨 التخصيص السريع

### تغيير الألوان
```css
/* client/src/index.css */
:root {
  --primary: var(--color-blue-600);
  /* غيّر اللون الأساسي */
}
```

### تغيير الشعار
```
استبدل: client/public/logo.png
```

### تغيير العنوان
```typescript
/* client/src/const.ts */
export const APP_TITLE = "اسم تطبيقك";
```

---

## 🐛 حل المشاكل الشائعة

### خطأ في الاتصال بقاعدة البيانات
```bash
# تأكد من تشغيل MySQL
# تحقق من DATABASE_URL في .env
```

### خطأ في OpenAI API
```bash
# تحقق من OPENAI_API_KEY في .env
# تأكد من صلاحية المفتاح
```

### خطأ في التثبيت
```bash
# امسح node_modules وأعد التثبيت
rm -rf node_modules
pnpm install
```

---

## 📚 الموارد

- [README الكامل](README.md)
- [الدليل التقني](TECHNICAL_GUIDE.md)
- [دليل المساهمة](CONTRIBUTING.md)
- [سجل التغييرات](CHANGELOG.md)

---

## 🎉 جاهز!

الآن يمكنك:
1. ✅ فتح http://localhost:3000
2. ✅ تسجيل الدخول
3. ✅ بدء المحادثة مع SevenAI

---

**مطور بإخلاص بواسطة ليث النسر - Seven_code7**

© 2025 SevenAI
