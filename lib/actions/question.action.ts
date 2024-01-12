'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams
} from './shared.types'
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

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase()
    const question: any = await Question.findById(params.questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture'
      })
    return question
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  console.log('upvoteQuestion', params)
  try {
    connectToDatabase()
    const { questionId, userId, hasUpVoted, hasDownVoted, path } = params

    let updateQuery = {}
    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId }
      }
    }
    console.log('🚀 ~ upvoteQuestion ~ updateQuery:', updateQuery)
    console.log('🚀 ~ upvoteQuestion ~ questionId:', questionId)
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true
    })
    console.log('🚀 ~ upvoteQuestion ~ question:', question)

    if (!question) {
      throw new Error('question not found')
    }
    revalidatePath(path)
  } catch (error) {}
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase()
    const { questionId, userId, hasUpVoted, hasDownVoted, path } = params

    let updateQuery = {}
    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId }
      }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true
    })

    if (!question) {
      throw new Error('question not found')
    }
    revalidatePath(path)
  } catch (error) {}
}
