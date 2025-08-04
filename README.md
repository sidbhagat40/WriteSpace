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
    Create the local development secrets.
    ```bash
    # From the root directory
    cd backend
    ```
    Now, open `backend/wrangler.jsonc` file and add your Prisma Accelerate connection pooling string and JWT_SECRET_KEY.

    ```bash
    # backend/wrangler.jsonc

    "vars": {
    "DATABASE_URL": "PRISMA_ACCELERATE_CONNECTION_STRING",
    "JWT_SECRET": "YOUR_SECRET_KEY",
    },
    ```
    In the backend directory, create a new .env file and enter your postgress URL.
    ```bash
    # backend/.env

    ORIGINAL_DATABASE_URL = "YOUR_POSTGRESS_URL"
    ```
    
4.  **Run prisma migrations:**
    This will set up your database schema based on the Prisma schema file and genrate the prisma client.
    ```bash
    # From the backend directory

    npx prisma migrate dev --schema

    npx prisma generate
    ```

5.  **For local development:**
    
    Start the backend using the below command in the backend directory.
    ```bash
    npm run dev
    ```
    To use this backend with the frontend, create a config.ts file in the frontend directory.

    ```bash
    #frontend/config.ts

    export const BACKEND_URL = "BACKEND_LOCAL_HOST_LINK";
    ```
    Start the frontend server locally by using the command below in frontend directory.
    ```bash
    npm run dev
    ```
    This would start both the servers and the app would become functional on the frontend local host link.

6.  **For serverless deployment (backend):**
    
    Create your cloudflare account and login using the wrangler CLI.
    ```bash
    # backend

    npx wrangler login   # Login to your cloudflare workers account.

    # backend directory
    npm run deploy    # Deploy the backend using wrangler.

    Get the cloudflare server link after deploying the backend.

    In the frontend directory, in `config.ts` file replace the BACKEND_URL link with the cloudflare serverless link.
    
    # frontend/config.ts
    export const BACKEND_URL = "CLOUDFLARE_SERVER_LINK"
    ```
    
7.  **Run the development servers (using serverless backend):**
    This will start the frontend server.
    ```bash
    # frontend
    npm run dev
    ```

---


