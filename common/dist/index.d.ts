import z from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodObject<{
        time: z.ZodNumber;
        blocks: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            data: z.ZodRecord<z.ZodString, z.ZodAny>;
        }, z.core.$strip>>;
        version: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateBlog: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlog = z.infer<typeof updateBlog>;
