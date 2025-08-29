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

app.use('/*', cors({
  origin: (origin) => {
    if (origin === 'https://write-space-omega.vercel.app') {
      return origin;
    }
    if (origin === 'http://localhost:5173') {
      return origin;
    }
    if (origin.endsWith('.vercel.app')) {
      return origin;
    }
    return 'https://write-space-omega.vercel.app';
  },
  allowHeaders: ['Authorization', 'Content-Type'],
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

export default app

