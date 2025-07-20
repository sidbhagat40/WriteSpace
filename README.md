# ✍️ WriteSpace: A Modern Blogging Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

WriteSpace is a full-stack, serverless blogging application designed for performance, scalability, and a great developer experience. It features a clean and modern user interface and a robust backend powered by Cloudflare Workers.

---

## ✨ Key Features

- **Modern Frontend**: A beautiful and responsive UI built with React, Vite, and Tailwind CSS.
- **Serverless Backend**: A highly scalable and globally distributed backend powered by Cloudflare Workers.
- **Type-Safe API**: End-to-end type safety with TypeScript across the entire stack.
- **Efficient Database**: Seamless database management with Prisma ORM and connection pooling via Prisma Accelerate.
- **Monorepo Structure**: A clean and organized codebase with shared logic using a monorepo architecture.

---

## 🛠️ Tech Stack

This project is a monorepo with three main packages:

| Package       | Description                                                                                             |
| :------------ | :------------------------------------------------------------------------------------------------------ |
| **`frontend`** | The user-facing application built with **React**, **Vite**, and **Tailwind CSS**.                       |
| **`backend`** | The serverless API built with **Cloudflare Workers**, **Hono** for routing, and **Prisma** for the ORM. |
| **`common`** | A shared package for **Zod** schemas and types used by both the frontend and backend.                 |

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Postgress](https://www.postgresql.org/)
- [Prisma Acclerate](https://www.prisma.io/docs/postgres/database/connection-pooling)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sidbhagat40/writespace.git
    cd writespace
    ```

2.  **Install root dependencies:**
    Run this command all the directories `backend`, `frontend` and `common`.
    ```bash
    npm install
    ```

3.  **Set up environment variables (Backend):**
    The backend requires a `wrangler.jsonc` and a `.env` file for local development secrets.
    ```bash
    # From the root directory
    cd backend
    ```
    Now, open `backend/wrangler.jsonc` file and add your Prisma Accelerate connection pooling string and JWT_SECRET_KEY and in the `.env` file add your Postgress database connection string.

    ```bash
    # backend/wrangler.jsonc
    "vars": {
    "DATABASE_URL": "PRISMA_ACCELERATE_CONNECTION_STRING",
    "JWT_SECRET": "YOUR_SECRET_KEY",
    },

    # backend/.env
    ORIGINAL_DATABASE_URL = "YOUR_POSTGRESS_URL"
    ```
    
4.  **Run database migrations:**
    This will set up your database schema based on the Prisma schema file.
    ```bash
    # From the backend directory
    npx prisma migrate dev --schema
    ```
    
6.  **Set up Cloudflare Server:**
    This will set up your Cloudflare server.
    ```bash
    npx wrangler login   # Login to your cloudflare workers account.

    # backend directory
    npm run deploy    # Deploy the backend using wrangler.

    Get the cloudflare server link after deploying the backend.

    In the frontend directory, create a `config.ts` file and add your cloudflare serverless link.
    
    # frontend/config.ts
    export const BACKEND_URL = "CLOUDFLARE_SERVER_LINK"
    ```
    
7.  **Run the development servers:**
    This will start the frontend server.
    ```bash
    # frontend
    npm run dev
    ```

---


