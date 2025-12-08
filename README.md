# DevDesk – Developer Productivity Suite

## 🚀 Overview
DevDesk is a full-stack productivity platform built for developers to manage tasks, notes, code snippets, and AI-assisted workflows securely.

## 🧱 Tech Stack
- Next.js 14 (App Router)
- TypeScript
- MongoDB + Mongoose
- JWT Authentication (Access + Refresh Tokens)
- shadcn/ui + Tailwind CSS
- Rate Limiting + Secure APIs

## 🔐 Key Features
- Authentication with HttpOnly cookies
- Task, Notes & Code Snippets CRUD
- Pagination & Search
- AI-assisted code improvement
- Protected routes & RBAC checks
- Analytics dashboard
- User settings & profile management

## 🧠 Architecture Decisions
- Server Components for auth-protected pages
- Client Components only where interactivity is needed
- Centralized auth utilities
- Stateless JWT + Refresh Token rotation

## 📸 Screenshots
<img width="1899" height="922" alt="image" src="https://github.com/user-attachments/assets/f575dca3-e9f0-4631-a540-6a1167497cda" />
<img width="1892" height="916" alt="image" src="https://github.com/user-attachments/assets/55c6a4dc-8c49-489a-b987-fb78e8a316fa" />
<img width="1903" height="920" alt="image" src="https://github.com/user-attachments/assets/22d711cd-067e-4a0c-a696-596b7db88bd7" />





## 🛠️ Setup Instructions
1. Clone repo
2. Add .env.local
3. npm install
4. npm run dev

