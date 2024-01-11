'use server'

import Answer from '@/database/answer.model'
import { connectToDatabase } from '../mongoose'
import { CreateAnswerParams, GetAnswersParams } from './shared.types'
import Question from '@/database/question.model'
import { revalidatePath } from 'next/cache'

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase()
    const { content, author, question, path } = params
    const newAnswer = await Answer.create({
      content,
      author,
      question
    })
    // 添加 answer 至 question
    const questionObj = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    })
    console.log(
      '🚀 ~ file: answer.action.ts:22 ~ createAnswer ~ questionObj:',
      questionObj
    )

    revalidatePath(path)

    console.log(
      '🚀 ~ file: answer.action.ts:30 ~ createAnswer ~ newAnswer:',
      newAnswer
    )
    return { answer: newAnswer }
  } catch (error) {
    console.log('🚀 ~ file: answer.action.ts:12 ~ createAnswer ~ error:', error)
    throw error
  }
}

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase()
    const { questionId } = params
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: 'author',
        model: 'User',
        select: '_id, clerkId, name picture'
      })
      .sort({ createdAt: -1 })
    return { answers }
  } catch (error) {}
}
