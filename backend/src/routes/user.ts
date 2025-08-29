import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify} from 'hono/jwt'
import { signupInput, signinInput } from 'sidbhagat_medium' 
import bcrypt from 'bcryptjs';
import { deleteCookie, setCookie } from 'hono/cookie'
import { CookieOptions } from 'hono/utils/cookie'
import { email } from 'zod'

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

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  path: '/',
  partitioned: true,
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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password,saltRounds);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword
      }
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    
    setCookie(c, 'authToken', token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24,
 
    });

    return c.json({
      msg:"User created successfully.",
      user: {
        id : user.id,
        email : user.email,
        name : user.name,
      }
    }); 

  } catch (error) {
    console.error('Signup error:', error)
    return c.json({ error: 'Registration failed' }, 403)
  }
})

userRouter.post('/signin', async(c) => {

  try{
      
      const prisma = getPrismaClient(c.env.DATABASE_URL)
      const body = await c.req.json();

      const { success } = signinInput.safeParse(body);
      if(!success){
          return c.json({
              error: "Invalid Inputs"
          },400)
      }

      const user = await prisma.user.findUnique({
        where: {email : body.email}
      })

      if(!user){
        c.status(403)
        return c.json({
          msg : "User Not Found"
        })
      }
      
      const result = await bcrypt.compare(body.password,user.password)
      
      if(!result){
        c.status(403);
        return c.json({
          msg: "Invalid password"
        })
      }

      const token = await sign({ id : user.id},c.env.JWT_SECRET);

      setCookie(c, 'authToken', token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24,
        });
      
        return c.json({
        msg : "User signed in successfully.",
        
        user: {
          id : user.id,
          email : user.email,
          name : user.name,
      }
      });
  }
  catch(error){
    console.log("Signin failed : ", error);
    return c.json({error : 'Signin failed'},403);
  }

})

userRouter.post('/logout', async(c) => {

  try{
    deleteCookie(c,'authToken',cookieOptions);
    return c.json({
      msg : "Logged out succesfully."
    });
  } catch(error){
    return c.json({
      error: "Log out operation failed"
    });
  }

})