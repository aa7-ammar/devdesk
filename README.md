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


## 🛠️ Setup Instructions
1. Clone repo
2. Add .env.local
3. npm install
4. npm run dev

