

# SyncTech Technical Assessment

This is a full-stack technical assessment project built with **React**, **NestJS**, and **PostgreSQL**, designed for managing construction projects and related assets.

## ✨ Features

- ✅ Create and update Projects
- ✅ Add assets of type "link"
- ✅ Create and manage custom fields
- 🔜 Basic validations and UI polish (pending)
- 🚫 Authentication intentionally skipped for simplicity

## 📦 Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: NestJS + MikroORM + PostgreSQL
- **Tooling**: TypeScript, Axios, ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Setup Instructions

1. Clone the repository:

  ````bash
   git clone https://github.com/evtnlife/synctech.git
   cd synctech
````

2. Install dependencies for both frontend and backend:

   ```bash
   cd sync-tech-api
   npm install

   cd ../synctech-frontend
   npm install
   ```

3. Configure the file mikro-orm.config.ts in `sync-tech-api/src/database`):

   ```
   const mikroOrmConfig: Options<PostgreSqlDriver> = {
      driver: PostgreSqlDriver,
      dbName: 'synctech_test',
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      entities: ['./dist/database/entities/*.entity.js'],
      entitiesTs: ['./src/database/entities/*.entity.ts'],
      debug: true,
      forceEntityConstructor: true,
      migrations: {
        path: './src/database/migrations',
        pathTs: './src/database/migrations',
        glob: '!(*.d).{js,ts}',
      },
    };
   ```

4. Run the backend:

   ```bash
   cd sync-tech-api
    # generate initial migration
    npm run mikro:create -- --initial
    
    # apply migrations
    npm run mikro:up
    
    # seed the asset types
    npm run seed:asset-types
    
    # start in dev mode
    npm run start:dev
   ```

5. Run the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

## 🛠 Project Structure

```bash
├── sync-tech-api         # NestJS + MikroORM API
│   ├── src
│   │   ├── database # Entities and database logic
│   │   └── modules  # App modules
│   └── .env.example
├── synctech-frontend         # React + TailwindCSS SPA
│   ├── src
└── README.md
```

## 🧠 Design Decisions

* **MikroORM** was used for simplicity with PostgreSQL and to keep entities clean and strongly typed.
* **React Router** is used for client-side navigation.

* The UI is kept minimal to focus on core features.
* Transactions are used on the backend to maintain data consistency.

## 🧪 Future Improvements

* Add authentication (e.g., JWT or OAuth)
* Implement caching for GET endpoints
* Add role-based access
* Add file uploads for asset types
* Include env file.

## 👨‍💻 Author
Made with ❤️ by Everton
