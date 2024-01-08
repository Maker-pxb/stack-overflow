'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import Tag from '@/database/tag.model'
import { CreateQuestionParams, GetQuestionsParams } from './shared.types'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase()
    console.log(params)
    // const { page = 1, pageSize = 10, searchQuery = '', filter = '' } = params
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function createQuestion(params: CreateQuestionParams) {
  console.log('🚀 ~ file: question.action.ts:8 ~ params:', params)

  try {
    connectToDatabase()
    const question = await Question.create({
      title: params.title,
      content: params.content,
      author: params.author
    })

    const tagDocuments = []
    for (const tag of params.tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, 'i')
          }
        },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      )
      tagDocuments.push(existingTag._id)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: {
          $each: tagDocuments
        }
      }
    })
    params.path && revalidatePath(params.path)
  } catch (error) {}
}
