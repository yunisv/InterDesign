# InterDesign — Interior Design Studio

Корпоративный сайт студии дизайна интерьеров с публичной витриной и закрытой админ-панелью.

## О сайте

Публичная часть — многостраничный сайт на трёх языках (RU / EN / AZ) с переключателем языка в хедере:

- **Главная** — hero-секция, статистика, категории портфолио, слайдер проектов, CTA
- **Портфолио** — сетка проектов с фильтрацией по категориям (Кухня, Спальня, Гостиная, Ванная) и модальным окном с галереей фотографий
- **О нас** — история студии, ценности, команда
- **FAQ** — часто задаваемые вопросы
- **Контакты** — форма заявки и контактная информация из настроек

## Что умеет бекенд

FastAPI-сервер с JWT-авторизацией и PostgreSQL. Основные возможности:

**Портфолио**
- Хранение проектов с названием и описанием на трёх языках
- Загрузка и хранение нескольких фотографий на проект
- Сортировка проектов по полю `order`
- Фильтрация по категории на стороне клиента

**Заявки**
- Приём заявок с формы на сайте (имя, email, телефон, тип проекта, сообщение)
- Хранение в БД с флагом прочитано / не прочитано
- Просмотр, отметка прочитанным и удаление через админку

**Настройки сайта**
- Хранение пар ключ-значение (телефон, email, адрес, часы работы, соцсети и т.д.)
- Любые изменения в админке мгновенно отражаются в футере и на странице контактов

**Безопасность**
- JWT-токены (HS256), bcrypt-хэширование паролей
- Все write-операции доступны только авторизованному администратору
- Первый администратор создаётся автоматически при старте из переменных окружения

## Структура

```
InterDesign/
├── frontend/          # Next.js 15 (App Router, Tailwind CSS)
├── backend/           # FastAPI + SQLAlchemy + PostgreSQL
├── docker-compose.yml
└── .env.example
```

---

## Быстрый старт (Docker)

```bash
# 1. Скопируй переменные окружения
cp .env.example .env

# 2. Собери и запусти все сервисы
docker compose up --build

# Остановить
docker compose down

# Остановить и удалить данные БД
docker compose down -v
```

| Сервис   | URL                          |
|----------|------------------------------|
| Фронтенд | http://localhost:3000        |
| Админка  | http://localhost:3000/admin  |
| API      | http://localhost:8000        |
| API docs | http://localhost:8000/docs   |

---

## Локальная разработка

### Backend

```bash
cd backend

# Создай виртуальное окружение
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac

# Установи зависимости
pip install -r requirements.txt

# Скопируй .env
cp .env.example .env
# Отредактируй DATABASE_URL под локальную БД

# Запусти сервер
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend

# Установи зависимости
pnpm install

# Запусти dev-сервер
pnpm dev

# Сборка
pnpm build
pnpm start
```

---

## Переменные окружения

Скопируй `.env.example` → `.env` и заполни:

| Переменная            | Описание                          | По умолчанию                                          |
|-----------------------|-----------------------------------|-------------------------------------------------------|
| `DATABASE_URL`        | Строка подключения к PostgreSQL   | `postgresql://interdesign:interdesign@db:5432/interdesign` |
| `SECRET_KEY`          | Секрет для JWT-токенов            | —                                                     |
| `ADMIN_USERNAME`      | Логин администратора              | `admin`                                               |
| `ADMIN_PASSWORD`      | Пароль администратора             | `admin123`                                            |
| `NEXT_PUBLIC_API_URL` | URL бекенда для фронтенда         | `http://localhost:8000`                               |

---

## API

Swagger UI доступен по адресу **http://localhost:8000/docs** после запуска бекенда.

### Основные эндпоинты

| Метод    | Путь                          | Доступ | Описание                  |
|----------|-------------------------------|--------|---------------------------|
| `POST`   | `/api/auth/login`             | Публ.  | Получить JWT-токен        |
| `GET`    | `/api/portfolio`              | Публ.  | Список проектов           |
| `POST`   | `/api/portfolio`              | Админ  | Создать проект            |
| `PUT`    | `/api/portfolio/{id}`         | Админ  | Обновить проект           |
| `DELETE` | `/api/portfolio/{id}`         | Админ  | Удалить проект            |
| `POST`   | `/api/portfolio/upload`       | Админ  | Загрузить фото            |
| `POST`   | `/api/contacts`               | Публ.  | Отправить заявку          |
| `GET`    | `/api/contacts`               | Админ  | Список заявок             |
| `PATCH`  | `/api/contacts/{id}/read`     | Админ  | Отметить как прочитанное  |
| `DELETE` | `/api/contacts/{id}`          | Админ  | Удалить заявку            |
| `GET`    | `/api/settings`               | Публ.  | Настройки сайта           |
| `PUT`    | `/api/settings`               | Админ  | Обновить настройки        |

---

## Полезные команды Docker

```bash
# Пересобрать только один сервис
docker compose build frontend
docker compose build backend

# Посмотреть логи
docker compose logs -f
docker compose logs -f backend

# Зайти в контейнер
docker compose exec backend bash
docker compose exec db psql -U interdesign

# Перезапустить сервис без пересборки
docker compose restart frontend
```
