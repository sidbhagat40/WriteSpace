import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify} from 'hono/jwt'
import { signupInput, signinInput } from 'sidbhagat_medium' 

export const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL: string;
    JWT_SECRET: string; 
}
}>()

const getPrismaClient = (databaseUrl: string) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  }).$extends(withAccelerate())
}

userRouter.post('/signup', async (c) => {
  try {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success } = signupInput.safeParse(body);
    if(!success){
        return c.json({
            error: "Invalid Inputs"
        })
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token },200)
  } catch (error) {
    console.error('Signup error:', error)
    return c.json({ error: 'Registration failed' }, 403)
  }
})

userRouter.post('/signin', async(c) => {

      const prisma = getPrismaClient(c.env.DATABASE_URL)
      const body = await c.req.json();

      const { success } = signinInput.safeParse(body);
      if(!success){
          return c.json({
              error: "Invalid Inputs"
          },400)
      }

      const user = await prisma.user.findUnique({
        where: {email : body.email,password: body.password},
      })

      if(!user){
        c.status(403)
        return c.json({
          msg : "User Not Found"
        })
      }

      const token = await sign({ id : user.id},c.env.JWT_SECRET);
      return c.json({
        jwt : token
      })
})