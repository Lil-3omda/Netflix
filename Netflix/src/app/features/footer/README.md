# Netflix Privacy & Speed Test Pages

هذا المجلد يحتوي على نسخ مطابقة لصفحات Netflix الشهيرة مع تصميم احترافي وتفاعلي.

## 📁 الملفات المتوفرة

### 🔧 Angular Components (TypeScript)
- `privacy.component.ts` - مكون Angular لصفحة Privacy
- `speed-test.component.ts` - مكون Angular لاختبار السرعة  
- `index.ts` - ملف التصدير

### 🌐 صفحات HTML مستقلة
- `privacy-demo.html` - صفحة Privacy للعرض المباشر
- `speed-test-demo.html` - صفحة Speed Test للعرض المباشر
- `demo.html` - صفحة رئيسية للتنقل بين الصفحات

## 🚀 كيفية الاستخدام

### في Angular Application
```typescript
// استيراد المكونات في routes
{
  path: 'privacy',
  loadComponent: () => import('./features/footer/privacy.component').then(m => m.PrivacyComponent)
},
{
  path: 'speed-test', 
  loadComponent: () => import('./features/footer/speed-test.component').then(m => m.SpeedTestComponent)
}
```

### للعرض المباشر (Standalone)
يمكنك فتح الملفات التالية مباشرة في المتصفح:
- `demo.html` - الصفحة الرئيسية
- `privacy-demo.html` - صفحة Privacy
- `speed-test-demo.html` - صفحة Speed Test

## ✨ المميزات

### 🔒 Privacy Page
- ✅ تصميم مطابق تماماً لصفحة Netflix الرسمية
- ✅ Sidebar تفاعلي مع قوائم التنقل
- ✅ محتوى كامل لسياسة الخصوصية
- ✅ تصميم متجاوب (Responsive)
- ✅ انيميشن وانتقالات سلسة
- ✅ دعم للغة العربية والإنجليزية

### ⚡ Speed Test Page  
- ✅ تصميم مشابه لموقع fast.com
- ✅ اختبار سرعة تفاعلي مع محاكاة واقعية
- ✅ مؤشر السرعة المتحرك (Animated Gauge)
- ✅ شريط التقدم أثناء الاختبار
- ✅ تقييم جودة الاتصال
- ✅ إمكانية إعادة الاختبار
- ✅ تصميم متجاوب لجميع الأجهزة

## 🎨 التصميم

### الألوان المستخدمة
- **أسود Netflix**: `#000000`
- **أحمر Netflix**: `#e50914` 
- **خلفية داكنة**: `#111111`
- **نص ثانوي**: `#cccccc`
- **حدود**: `#333333`

### الخطوط
- **العائلة**: `'Helvetica Neue', Helvetica, Arial, sans-serif`
- **الأحجام**: متدرجة من 12px إلى 96px حسب العنصر

## 📱 الاستجابة (Responsive)

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: 481px - 768px  
- **Mobile**: ≤ 480px

### التكيف
- الـ Sidebar يصبح عمودي في الشاشات الصغيرة
- أحجام الخطوط تقل تدريجياً
- المسافات والحشو يتكيف مع حجم الشاشة
- الأزرار تصبح أكثر سهولة للمس

## 🔧 التخصيص

### تغيير الألوان
```css
:root {
  --netflix-red: #e50914;
  --netflix-black: #000000;
  --netflix-dark: #111111;
  --netflix-gray: #333333;
}
```

### تخصيص السرعة في Speed Test
```javascript
// في speed-test-demo.html أو speed-test.component.ts
const testDuration = 8000; // مدة الاختبار بالملي ثانية
const targetSpeed = Math.random() * 95 + 5; // نطاق السرعة
```

## 🚀 التطوير المستقبلي

### إضافات مقترحة
- [ ] حفظ نتائج اختبار السرعة
- [ ] إضافة اختبار ping وUpload speed  
- [ ] دعم المزيد من اللغات
- [ ] إضافة وضع Dark/Light mode
- [ ] تتبع Analytics للاستخدام

## 📄 الترخيص

هذا المشروع مخصص للأغراض التعليمية والتطوير الشخصي.
Netflix وشعاراتها هي علامات تجارية مسجلة لشركة Netflix, Inc.

---

تم إنشاؤه بـ ❤️ لتعلم تطوير الويب
