import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email"
    })
})

export const groupSchema = z.object({
    name: z.string().min(1, {
        message: "Must be at least 1 character"
    }),
    description: z.string().optional()
})
