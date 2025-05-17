# 🏗️ SyncTech · Full-Stack Technical Assessment

This repository contains a full-stack application built for a technical assessment, focused on managing construction projects and their associated assets and custom metadata.

The project is divided into two main parts:

- **Backend**: NestJS + MikroORM + PostgreSQL
- **Frontend**: React + Vite + TailwindCSS

---

## 🧩 Monorepo Structure

```

.
├── sync-tech-api/         # NestJS backend
│   └── README.md
├── synctech-frontend/     # React + Vite frontend
│   └── README.md
└── README.md              # You're here

```

---

## 🛠 Tech Overview

| Layer    | Tech Stack                                  |
| -------- | ------------------------------------------- |
| Frontend | React, Vite, TypeScript, TailwindCSS, Axios |
| Backend  | NestJS, MikroORM v6, PostgreSQL, TypeScript |
| Tooling  | ESLint, Prettier, dotenv, Swagger (OpenAPI) |

---

## ⚙️ Prerequisites

- Node.js `>= 16`
- PostgreSQL running locally (`localhost:5432`)
- `npm` or `yarn`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/evtnlife/synctech.git
cd synctech
```

---

### 2. Setup the backend (NestJS)

```bash
cd sync-tech-api
cp .env.example .env     # Or configure manually

npm install

# Create and run migrations
npm run mikro:create -- --initial
npm run mikro:up

# Seed asset types
npm run seed:asset-types

# Start dev server
npm run start:dev
```

---

### 3. Setup the frontend (React)

```bash
cd ../synctech-frontend
npm install
npm run dev
```

By default, the frontend runs at `http://localhost:5173` and connects to the backend at `http://localhost:3000`.

---

## 🧠 Design Considerations

- Entities are colocated with database logic for clarity and maintainability.
- Backend uses transactional logic to ensure consistency across related data (projects, assets, custom fields).
- API follows REST principles and is self-documented via Swagger (`/api`).
- Frontend uses React hooks and native HTML5 validation to keep things simple.

---

## 🚧 Next Steps

Planned improvements (not yet implemented):

- ✅ **\[ ]** Advanced validation (e.g., react-hook-form + Zod)
- ✅ **\[ ]** Centralized toast/notification system
- ✅ **\[ ]** Environment switcher (dev/staging/prod)
- ✅ **\[ ]** User authentication (JWT or OAuth)
- ✅ **\[ ]** Role-based access control (RBAC)
- ✅ **\[ ]** Asset file upload (instead of just links)
- ✅ **\[ ]** **Unit tests** and integration tests (currently missing)

> 🧪 No unit tests were implemented in this version. Adding test coverage would be a high-priority next step.

---

## 📬 Author

Made with ❤️ by **Everton**
[github.com/evtnlife](https://github.com/evtnlife)
