# CLAUDE.md — NewPoligraph / website

## Про проєкт
Сайт-лендинг для поліграфолога **Ірини Ширієвської** (Київ).
Мультисторінковий сайт з locale-based routing (`/uk/*`, `/ru/*`).

## Стек
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **UI:** React + Tailwind CSS v4
- **i18n:** кастомний `LanguageContext` + `src/lib/translations.ts`
- **Деплой:** Vercel (домен: irinapolygraph.com.ua)

## Запуск dev-сервера
```bash
export PATH="/Users/tarasrymar/.nvm/versions/node/v24.14.1/bin:$PATH"
npm run dev
```
Порт: `http://localhost:3000`

## Обов'язкові правила розробки
1. **Перед будь-яким UI/frontend кодом** — завжди запускати скіл `frontend-design`
2. **Перевіряти повний код на баги** перед тим як показувати клієнту
3. **Mobile-first** — всі компоненти спочатку для мобільних, потім десктоп
4. **Tailwind тільки** — не використовувати CSS модулі або styled-components
5. **TypeScript** обов'язково

## Структура проєкту
```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx          # Головна
│   │   ├── about/page.tsx    # Про мене
│   │   └── pricing/page.tsx  # Вартість
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Фіксований + мобільне меню + UK/RU switcher
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx          # Секція 1 — мобільний full-bleed hero
│       ├── About.tsx         # Секція — мобільний full-bleed фото
│       ├── WhenNeeded.tsx
│       ├── Services.tsx      # 11 карток + модальне вікно
│       ├── Process.tsx
│       ├── Pricing.tsx
│       ├── FAQ.tsx
│       ├── ContactForm.tsx
│       ├── Contacts.tsx      # Соцмережі + контакти
│       └── Certificates.tsx  # Дипломи з лайтбоксом
└── lib/
    ├── translations.ts       # Всі тексти UA + RU
    ├── LanguageContext.tsx
    └── seo.ts                # SEO константи
```

## Дизайн-система
| Колір | Hex | Роль |
|-------|-----|------|
| Темний фон | `#2A2A2A` | основний фон |
| Золотий | `#C9A96E` | акцент, CTA, бордери |
| Молочний | `#F5F0EB` | основний текст |
| Бежево-сірий | `#A89B8C` | вторинний текст |
| Приглушений | `#6B6057` | muted текст |

Шрифти: `var(--font-heading)` = Cormorant Garamond, `var(--font-body)` = основний шрифт тіла.

## Контактні дані клієнта
- **Телефон:** `+380632429890` / `+38 (063) 242 98 90`
- **Email:** `shyriievska.polygraph@gmail.com`
- **Instagram:** https://www.instagram.com/iryna_polygraph
- **WhatsApp:** https://wa.me/380632429890 (той самий номер)
- **Telegram:** https://t.me/+380632429890 (той самий номер)

## Зображення
| Файл | Використання | Параметри |
|------|-------------|-----------|
| `/bg-hero-n.png` | Hero + About desktop bg | `contain`, `center` |
| `/hero-mobile.png` | Hero + About mobile bg | `cover`, `center top`, ~750×1334px portrait |
| `/images/about/1–4.jpg` | Certificates | portrait, рек. 1200×1656px |

**Мобільна логіка Hero/About:** `isMobile` через `window.innerWidth < 1024` — перемикає між `hero-mobile.png` (cover) та `bg-hero-n.png` (contain). Градієнт-вуаль знизу для читабельності тексту.

## Що залишилось зробити
- [ ] `og-image.jpg` для соцмереж (1200×630px)
- [ ] Google Search Console verification token
- [ ] Фото для 11 карток послуг
- [ ] Реальне підключення форми (зараз mock `setTimeout`)
