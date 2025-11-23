# LASER components — Frontend

Фронтенд-приложение интернет-каталога лазерных и опто-электронных компонентов на Next.js (App Router).

## Технологии

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Zustand** (state management)
- **React Query** (data fetching)
- **Sonner** (toast notifications)

## Установка

```bash
npm install
# или
yarn install
# или
pnpm install
```

## Разработка

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка

```bash
npm run build
npm start
```

## Структура проекта

```
src/
├── app/              # App Router страницы
│   ├── page.tsx      # Главная страница
│   ├── catalog/      # Каталог
│   ├── products/     # Страницы товаров
│   ├── cart/         # Корзина
│   ├── checkout/     # Оформление заказа
│   └── categories/   # Карта каталога
├── components/       # React компоненты
├── lib/              # Утилиты и API клиент
├── store/            # Zustand stores
└── i18n/             # Переводы
```

## API

Приложение использует API по адресу: `https://tamasaya.ru/api/laserio`

### Основные эндпоинты:

- `GET /categories/tree` — дерево категорий
- `GET /categories/:slug` — категория по slug
- `GET /products/:slug` — товар по slug
- `POST /orders` — создание заказа (с fallback на mailto)

## Функциональность

- ✅ Каталог с категориями и подкатегориями
- ✅ Карта каталога
- ✅ Страницы товаров
- ✅ Корзина (localStorage)
- ✅ Оформление заказа
- ✅ i18n (RU/EN)
- ✅ SEO оптимизация
- ✅ Адаптивный дизайн

## Лицензия

MIT
