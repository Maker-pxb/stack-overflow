'use server'

import Answer from '@/database/answer.model'
import { connectToDatabase } from '../mongoose'
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams
} from './shared.types'
import Question from '@/database/question.model'
import { revalidatePath } from 'next/cache'
import Interaction from '@/database/interaction.model'

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

export async function upvoteAnswer(params: AnswerVoteParams) {
  console.log('upvoteQuestion', params)
  try {
    connectToDatabase()
    const { answerId, userId, hasUpVoted, hasDownVoted, path } = params

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
    console.log('🚀 ~ upvoteQuestion ~ answerId:', answerId)
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    if (!answer) {
      throw new Error('answer not found')
    }
    revalidatePath(path)
  } catch (error) {}
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase()
    const { answerId, userId, hasUpVoted, hasDownVoted, path } = params

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

    console.log('🚀 ~ upvoteQuestion ~ answerId:', answerId)
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    if (!answer) {
      throw new Error('answer not found')
    }
    revalidatePath(path)
  } catch (error) {}
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  const { answerId, path } = params
  try {
    connectToDatabase()
    const answer = await Answer.findById(answerId)
    if (!answer) {
      throw new Error('answer not found')
    } else {
      await answer.deleteOne({ _id: answerId })
      await Question.updateMany(
        {
          _id: answer.question
        },
        {
          $pull: { answers: answerId }
        }
      )
      await Interaction.deleteMany({ answer: answerId })
    }

    revalidatePath(path)
  } catch (error) {
    console.log('🚀 ~ deleteQuestion ~ error:', error)
    throw error
  }
}
