# SyncTech-Test

A NestJS monolith using MikroORM v6 + PostgreSQL, with shared entities under `src/database`. Migrations and seeds live in `src/database/migrations`.

---

## 🔧 Prerequisites

- Node.js ≥ 16
- PostgreSQL on `127.0.0.1:5432`
- npm (or yarn)

---

## 1. Clone & Install

```bash
git clone <repo-url> SyncTech-Test
cd SyncTech-Test
npm install

# generate initial migration
npm run mikro:create -- --initial

# apply migrations
npm run mikro:up

# seed the asset types
npm run seed:asset-types

# start in dev mode
npm run start:dev

```
