# 🚀 دليل نشر SevenAI

## طرق النشر المتاحة

### 1. 🌟 Vercel (الأسهل والأسرع - مجاني)

#### المميزات:
- ✅ مجاني بالكامل
- ✅ نشر تلقائي من GitHub
- ✅ SSL مجاني
- ✅ CDN عالمي
- ✅ دومين مجاني (.vercel.app)

#### الخطوات:

**أ. التحضير:**
```bash
# 1. تأكد من أن المشروع يعمل محلياً
pnpm install
pnpm build

# 2. أنشئ حساب على GitHub (إذا لم يكن لديك)
# 3. ارفع المشروع على GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/sevenai.git
git push -u origin main
```

**ب. النشر على Vercel:**

1. اذهب إلى: https://vercel.com
2. سجل دخول بحساب GitHub
3. انقر "New Project"
4. اختر مشروع SevenAI
5. اضبط الإعدادات:
   ```
   Framework Preset: Vite
   Build Command: pnpm build
   Output Directory: dist/public
   Install Command: pnpm install
   ```
6. أضف Environment Variables:
   ```
   DATABASE_URL=your-database-url
   OPENAI_API_KEY=your-openai-key
   REPLICATE_API_TOKEN=your-replicate-token
   ```
7. انقر "Deploy"

**ج. الرابط:**
```
https://sevenai.vercel.app
أو
https://your-project-name.vercel.app
```

---

### 2. 🔷 Railway (سهل - مجاني جزئياً)

#### المميزات:
- ✅ دعم قواعد البيانات
- ✅ نشر تلقائي
- ✅ $5 مجاناً شهرياً
- ✅ دومين مجاني

#### الخطوات:

1. اذهب إلى: https://railway.app
2. سجل دخول بحساب GitHub
3. انقر "New Project"
4. اختر "Deploy from GitHub repo"
5. اختر مشروع SevenAI
6. أضف MySQL Database:
   - انقر "New" → "Database" → "MySQL"
   - انسخ DATABASE_URL
7. أضف Environment Variables
8. انقر "Deploy"

**الرابط:**
```
https://sevenai.up.railway.app
```

---

### 3. 🐳 Docker + أي خدمة (متقدم)

#### إنشاء Dockerfile:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
```

#### docker-compose.yml:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/sevenai
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - REPLICATE_API_TOKEN=${REPLICATE_API_TOKEN}
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=sevenai
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

#### النشر:
```bash
# بناء الصورة
docker-compose build

# تشغيل
docker-compose up -d

# الرابط
http://localhost:3000
```

---

### 4. ☁️ AWS / Google Cloud / Azure (احترافي)

#### AWS Elastic Beanstalk:

1. **التحضير:**
```bash
# تثبيت AWS CLI
# Windows: https://aws.amazon.com/cli/
# Mac: brew install awscli

# تسجيل الدخول
aws configure
```

2. **إنشاء .ebextensions/nodecommand.config:**
```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "pnpm start"
```

3. **النشر:**
```bash
# تثبيت EB CLI
pip install awsebcli

# تهيئة
eb init -p node.js sevenai

# إنشاء بيئة
eb create sevenai-env

# النشر
eb deploy

# فتح الرابط
eb open
```

---

### 5. 🌐 Netlify (للـ Frontend فقط)

#### الخطوات:

1. اذهب إلى: https://netlify.com
2. سجل دخول بحساب GitHub
3. انقر "New site from Git"
4. اختر مشروع SevenAI
5. اضبط:
   ```
   Build command: pnpm build
   Publish directory: dist/public
   ```
6. أضف Environment Variables
7. انقر "Deploy"

**ملاحظة:** Netlify للـ Frontend فقط، ستحتاج خدمة منفصلة للـ Backend.

---

## 🔧 إعداد قاعدة البيانات

### خيارات قواعد البيانات المجانية:

#### 1. PlanetScale (مجاني)
```
1. اذهب إلى: https://planetscale.com
2. أنشئ حساب
3. أنشئ قاعدة بيانات جديدة
4. انسخ DATABASE_URL
5. أضفها في Environment Variables
```

#### 2. Railway MySQL (مجاني جزئياً)
```
1. في Railway، انقر "New" → "Database" → "MySQL"
2. انسخ DATABASE_URL
3. استخدمها في المشروع
```

#### 3. Supabase (مجاني)
```
1. اذهب إلى: https://supabase.com
2. أنشئ مشروع جديد
3. احصل على DATABASE_URL
4. استخدمها في المشروع
```

---

## 🔐 Environment Variables

### المتغيرات المطلوبة:

```env
# قاعدة البيانات (مطلوب)
DATABASE_URL="mysql://user:password@host:3306/database"

# OpenAI (مطلوب)
OPENAI_API_KEY="sk-..."

# Replicate (اختياري - للصور)
REPLICATE_API_TOKEN="r8_..."

# OAuth (اختياري)
OAUTH_CLIENT_ID="..."
OAUTH_CLIENT_SECRET="..."

# الخادم
PORT=3000
NODE_ENV=production
```

### كيفية إضافتها:

**Vercel:**
```
Settings → Environment Variables → Add
```

**Railway:**
```
Variables → New Variable
```

**Docker:**
```bash
# في ملف .env
cp .env.example .env
# عدّل القيم
```

---

## 🌍 ربط دومين خاص

### Vercel:

1. اذهب إلى: Settings → Domains
2. أضف دومينك: `sevenai.com`
3. اتبع التعليمات لتحديث DNS

### Railway:

1. اذهب إلى: Settings → Domains
2. انقر "Generate Domain"
3. أو أضف دومين خاص

### Cloudflare (موصى به):

1. سجل دومين على Namecheap/GoDaddy
2. أضفه على Cloudflare (مجاني)
3. غيّر Nameservers
4. أضف DNS Records:
   ```
   Type: CNAME
   Name: @
   Target: your-app.vercel.app
   ```

---

## 📊 المراقبة والصيانة

### 1. Vercel Analytics (مجاني)
```
Settings → Analytics → Enable
```

### 2. Sentry (مراقبة الأخطاء)
```bash
# تثبيت
pnpm add @sentry/node @sentry/react

# إعداد
# في server/_core/index.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
});
```

### 3. Uptime Monitoring
- UptimeRobot (مجاني): https://uptimerobot.com
- Pingdom (مجاني جزئياً): https://pingdom.com

---

## 🚀 أفضل خيار للبداية (موصى به)

### الخطة المجانية الكاملة:

1. **Frontend + Backend:** Vercel (مجاني)
2. **قاعدة البيانات:** PlanetScale (مجاني)
3. **الدومين:** Vercel subdomain (مجاني)
4. **SSL:** تلقائي (مجاني)
5. **CDN:** تلقائي (مجاني)

### الخطوات السريعة:

```bash
# 1. ارفع على GitHub
git init
git add .
git commit -m "Deploy SevenAI"
git push

# 2. اذهب إلى vercel.com
# 3. Import من GitHub
# 4. أضف Environment Variables
# 5. Deploy!

# الرابط: https://sevenai.vercel.app
```

---

## 🎯 Checklist قبل النشر

- [ ] المشروع يعمل محلياً
- [ ] جميع Environment Variables جاهزة
- [ ] قاعدة البيانات جاهزة
- [ ] تم اختبار Build
- [ ] تم رفع الكود على GitHub
- [ ] تم إعداد .gitignore
- [ ] تم إضافة README.md

---

## 🐛 حل المشاكل الشائعة

### مشكلة: Build فشل
```bash
# الحل:
1. تحقق من package.json
2. تأكد من جميع dependencies
3. جرب محلياً: pnpm build
```

### مشكلة: Database connection
```bash
# الحل:
1. تحقق من DATABASE_URL
2. تأكد من السماح بالاتصالات الخارجية
3. جرب الاتصال محلياً
```

### مشكلة: Environment Variables
```bash
# الحل:
1. تأكد من إضافتها في لوحة التحكم
2. أعد النشر بعد الإضافة
3. تحقق من الأسماء (حساسة لحالة الأحرف)
```

---

## 📞 الدعم

إذا واجهت مشاكل:
1. راجع logs في لوحة التحكم
2. تحقق من الوثائق الرسمية
3. اسأل في Discord/GitHub

---

## 🎉 بعد النشر

### شارك مشروعك:
- Twitter
- LinkedIn
- Reddit
- Product Hunt

### راقب الأداء:
- Vercel Analytics
- Google Analytics
- Sentry

### حدّث باستمرار:
```bash
git add .
git commit -m "Update"
git push
# Vercel سينشر تلقائياً!
```

---

**مبروك! مشروعك الآن على الإنترنت! 🎉**

© 2025 SevenAI - ليث النسر - Seven_code7
