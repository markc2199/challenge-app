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

export const inviteSchema = z.object({
    email: z.string().email({
        message: "Invalid Email"
    })
})

export const challengeSchema = z.object({
    title: z.string().min(1, {
        message: "Challenge title is required"
    }),
    description: z.string().optional(),
    item: z.string().min(1, {
        message: "Challenge item is required"
    }),
    start: z.string().date("Must provide a start date"),
    end: z.string().date("Must provide an end date"),
})

export const scoreSchema = z.object({
    score: z.coerce.number()
})