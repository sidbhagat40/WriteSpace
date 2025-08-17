import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { postRouter } from './routes/post'
import { cors } from 'hono/cors'

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  NODE_ENV: string;
}

const app = new Hono<{
  Bindings: Bindings,
}>()

if (process.env.NODE_ENV === 'production') {
    app.use('/*', cors({
        origin: 'https://write-space-5kqw.vercel.app',
        allowHeaders: ['Authorization', 'Content-Type'],
        allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    }))
} else {
    app.use("/*", cors({
        origin: 'http://localhost:5173', // Your local frontend URL
        credentials: true,
        allowHeaders: ['Content-Type', 'Authorization'] // Good to be explicit
    }));
}
app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

export default app

