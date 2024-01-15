import { z } from 'zod'

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(10),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3)
})

export const AnswersSchema = z.object({
  answer: z.string().min(5)
})

export const profileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  portfolioWebsite: z.string().url().optional(),
  location: z.string().min(2).max(10).optional(),
  bio: z.string().min(2).max(100).optional()
})
