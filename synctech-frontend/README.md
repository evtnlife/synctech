# 🎨 SyncTech Frontend · React + Vite

This is the frontend for the **SyncTech** technical assessment project. It's a simple but scalable **React SPA**, styled with **TailwindCSS**, and built using **Vite** for blazing-fast development.

The application allows users to create and update construction projects, add assets (of type _link_), and manage custom metadata fields.

---

## ⚡ Tech Stack

- **React 18**
- **Vite** (dev server & build tool)
- **TypeScript**
- **TailwindCSS**
- **React Router DOM**
- **Axios** (for API calls)

---

## 🔧 Prerequisites

- Node.js `>= 16`
- Backend API running on `http://localhost:3000` (by default)

---

## 🚀 Getting Started

```bash
# Navigate into the frontend folder
cd synctech-frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app should now be running at [http://localhost:5173](http://localhost:5173)

---

## 🗂 Project Structure

```
synctech-frontend/
├── src/
│   ├── hooks/            # Custom React hooks (e.g., useProjectForm)
│   ├── pages/            # Main page views
│   ├── types/            # TypeScript interfaces
│   └── main.tsx          # App entry point
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🧠 Notes

- This project uses **React Router** for routing between pages.
- API requests are made with **Axios**, using RESTful endpoints served by the NestJS backend.
- Basic HTML5 validation is in place; for production use, you'd typically integrate a validation library like `react-hook-form` + `zod`.

---

## 🔮 Next Improvements

- Form validation with better UX (e.g., real-time feedback)
- Error boundaries
- Global toast system (e.g., for success/failure messages)
- Dark mode toggle (because... why not?)

---

## 📬 Contact

Made with ❤️ by **Everton**
[github.com/evtnlife](https://github.com/evtnlife)
