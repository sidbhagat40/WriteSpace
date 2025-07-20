import z from 'zod';

export const signupInput = z.object({
    email : z.email(),
    password: z.string(),
    name : z.string().optional()
})

export const signinInput = z.object({
    email : z.email(),
    password: z.string(),
})

export const createBlogInput = z.object({
    title : z.string(),
    content: z.string(),
})

export const updateBlog = z.object({
    id : z.string(),
    title: z.string(),
    content : z.string()
})


export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput> 
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlog = z.infer<typeof updateBlog>
