import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput,updateBlog } from 'sidbhagat_medium'

type JwtPayload = {
  id: string;
  [key: string]: any; 
}

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string
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

// Middleware
postRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("Authorization") || ""
  const token = authHeader.split(' ')[1] // Extract token from "Bearer <token>"
  
  if (!token) {
    return c.json({ error: "Authorization token missing" }, 401)
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET) as JwtPayload
    
    if (!payload?.id) {
      return c.json({ error: "Invalid token payload" }, 401)
    }

    c.set("userId", payload.id)
    await next()
  } catch (error) {
    return c.json({ error: "Invalid or expired token" }, 401)
  }
})

// New Post Route

postRouter.post('/', async (c) => {
  try {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const body = await c.req.json()
    const userId = c.get("userId");

    const { success } = createBlogInput.safeParse(body);
    if(!success){
        return c.json({
            error: "Invalid Inputs"
        })
    }

    if (!body.title || !body.content) {
      return c.json({ error: "Title and content are required" }, 400)
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        published: body.published || false // Default to unpublished
      }
    })

    return c.json({
      id: post.id,
      title: post.title,
      content: post.content
    }, 201) // 201 Created status

  } catch (error) {
    return c.json({ error: "Failed to create post" }, 500)
  }
})

// Update Post Route

postRouter.put('/', async(c) => {
    try{
        const prisma = getPrismaClient(c.env.DATABASE_URL);
        const body = await c.req.json();

        const { success } = updateBlog.safeParse(body);
        if(!success){
            return c.json({
                error: "Invalid Inputs"
            })
        }
        const post = await prisma.post.update({
            where:{id: body.id},
            data:{
                title: body.title,
                content: body.content
            }
        })
        if(post){
            return c.json({
                post
        })}
        else{
            return c.json({
                error: "Post not found"
            })
        }
      
    } catch(error){
        c.json({
            error:"Could not find the post"
        },500);
    }

})

// Get all posts


postRouter.get('/bulk', async (c) => {

    try{
        const prisma = getPrismaClient(c.env.DATABASE_URL);

        const posts = await prisma.post.findMany({
            select:{
                id: true,
                title: true,
                content: true,
                author:{
                  select:{
                    name:true
                  }
                }
            },
        })

        return c.json({
            posts
        });
    } catch(error){
        console.log("Error while fetching posts");
        return c.json({error: "Failed to fetch posts"},500);
    }
})


// Get a particular post using postID

postRouter.get('/:id', async (c) => {

    try{
        const postId = c.req.param("id");
        const prisma = getPrismaClient(c.env.DATABASE_URL);

        const post = await prisma.post.findFirst({
            where:{
                id: postId 
            },
            select: {
                title: true,
                content: true,
                id:true,
                author:{
                  select:{
                    name:true
                  }
                }
            }
        })

        return c.json({
            post
        })
    }
    catch{
        c.status(404);
        return c.json({
            error: "Cannot get the required Post"
        })
    }
})

