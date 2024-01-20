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
import Interaction, {
  ActionScore,
  ReputationAction
} from '@/database/interaction.model'
import { AnswerFiltersEnum } from '@/constants/filters'
import User from '@/database/user.model'

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

    await Interaction.create({
      user: author,
      action: ReputationAction.ANSWER,
      question,
      answer: newAnswer._id,
      tags: questionObj.tags
    })

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: ActionScore.ANSWER }
    })

    revalidatePath(path)

    return { answer: newAnswer }
  } catch (error) {
    console.log('🚀 ~ file: answer.action.ts:12 ~ createAnswer ~ error:', error)
    throw error
  }
}

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase()
    const { questionId, sortBy, page = 1, pageSize = 10 } = params
    let sortOptions = {}
    const skipAmount = (page - 1) * pageSize
    switch (sortBy) {
      case AnswerFiltersEnum.HIGHEST_UPVOTES:
        sortOptions = {
          upvotes: -1
        }
        break
      case AnswerFiltersEnum.LOWEST_UPVOTES:
        sortOptions = {
          upvotes: 1
        }
        break
      case AnswerFiltersEnum.RECENT:
        sortOptions = {
          createdAt: -1
        }
        break
      case AnswerFiltersEnum.OLD:
        sortOptions = {
          createdAt: 1
        }
        break
      default:
        break
    }
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: 'author',
        model: 'User',
        select: '_id, clerkId, name picture'
      })
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
    const totalAnswers = await Answer.countDocuments({ question: questionId })
    const isNext = totalAnswers > skipAmount + answers.length
    return { answers, total: totalAnswers, isNext, pageSize, page }
  } catch (error) {}
}

export async function upvoteAnswer(params: AnswerVoteParams) {
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
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    if (!answer) {
      throw new Error('answer not found')
    }

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasUpVoted
          ? ActionScore.DOWNVOTE_ANSWER_FOR_USER
          : ActionScore.UPVOTE_ANSWER_FOR_USER
      }
    })

    await User.findByIdAndUpdate(answer.author, {
      $inc: {
        reputation: hasUpVoted
          ? ActionScore.DOWNVOTE_ANSWER_FOR_AUTHOR
          : ActionScore.UPVOTE_ANSWER_FOR_AUTHOR
      }
    })

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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasDownVoted
          ? ActionScore.UPVOTE_ANSWER_FOR_USER
          : ActionScore.DOWNVOTE_ANSWER_FOR_USER
      }
    })

    await User.findByIdAndUpdate(answer.author, {
      $inc: {
        reputation: hasDownVoted
          ? ActionScore.UPVOTE_ANSWER_FOR_AUTHOR
          : ActionScore.DOWNVOTE_ANSWER_FOR_AUTHOR
      }
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
