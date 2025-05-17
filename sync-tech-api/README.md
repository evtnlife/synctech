# 🚀 SyncTech-Test · NestJS Backend

A monolithic API built with **NestJS**, **MikroORM v6**, and **PostgreSQL** — serving as the backend for the SyncTech construction project management system.

All entities are shared and located under `src/database`. Migrations and seed scripts are also maintained under the same folder for easy versioning and database setup.

---

## 📦 Tech Stack

- **NestJS** (modular architecture, dependency injection)
- **MikroORM v6** (PostgreSQL driver, strongly typed entities)
- **PostgreSQL** (local dev DB)
- **TypeScript**, **dotenv**, **class-validator**, **Swagger**

---

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) `>= 16`
- [PostgreSQL](https://www.postgresql.org/) running on `localhost:5432`
- `npm` or `yarn` installed

---

## ⚙️ Environment Setup

1. **Create a `.env` file** in the root of `sync-tech-api`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=synctech_test
DB_USER=postgres
DB_PASSWORD=postgres
MIKRO_DEBUG=true
NODE_ENV=development
```

## 🚀 Getting Started

```bash
# Clone the repository
git clone <repo-url> SyncTech-Test
cd SyncTech-Test/sync-tech-api

# Install dependencies
npm install

# Generate initial migration
npm run mikro:create -- --initial

# Apply migrations to the DB
npm run mikro:up

# Seed default asset types
npm run seed:asset-types

# Start development server
npm run start:dev
```

---

## 🗂 Project Structure

```
sync-tech-api/
├── src/
│   ├── common/          # DTOs, filters, decorators
│   ├── database/        # MikroORM entities, migrations, config
│   ├── modules/         # Project, Asset, CustomField modules
│   ├── main.ts          # Entry point
│   └── app.module.ts    # Root module
├── .env.example         # Example environment config
├── package.json
└── README.md
```

---

## 🧠 Design Notes

- All data-modifying operations use **transactions** for consistency.
- **Entities** are colocated with migrations for a self-contained data layer.
- Swagger documentation is auto-generated and accessible at `/api`.

---

## ✅ Available Scripts

| Script             | Description                                |
| ------------------ | ------------------------------------------ |
| `start:dev`        | Starts the API in watch mode               |
| `start:prod`       | Builds and runs in production mode         |
| `mikro:create`     | Generates a new migration                  |
| `mikro:up`         | Applies pending migrations to the database |
| `mikro:down`       | Reverts the last migration                 |
| `seed:asset-types` | Seeds the default asset types              |

---

## 📬 Contact

Made with ❤️ by **Everton**
[github.com/evtnlife](https://github.com/evtnlife)
