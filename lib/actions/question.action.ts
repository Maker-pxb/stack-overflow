'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Answer from '@/database/answer.model'
import Interaction from '@/database/interaction.model'
import { FilterQuery } from 'mongoose'
import { HomeFilterEnum } from '@/constants/filters'

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase()
    console.log(params)
    const { page = 1, pageSize = 10, searchQuery = '', filter = '' } = params
    console.log('🚀 ~ getQuestions ~ pageSize:', pageSize)

    const skipAmount = (page - 1) * pageSize
    const query: FilterQuery<typeof Question> = {}
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { content: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    }

    let sortOptions = {}
    switch (filter) {
      case HomeFilterEnum.NEWEST:
        sortOptions = { createdAt: -1 }
        break
      case HomeFilterEnum.RECOMMENDED:
        sortOptions = { upvotes: -1 }
        break
      case HomeFilterEnum.FREQUENT:
        sortOptions = { views: -1 }
        break
      case HomeFilterEnum.UNANSWERED:
        query.answer = { $size: 0 }
        break
      default:
        break
    }
    const questions = await Question.find(query)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions)
    const totalQuestions = await Question.countDocuments(query)
    const isNext = totalQuestions > skipAmount + questions.length
    console.log('🚀 ~ getQuestions ~ totalQuestions:', totalQuestions)
    console.log('🚀 ~ getQuestions ~ questions.length:', questions.length)
    console.log('🚀 ~ getQuestions ~ skipAmount:', skipAmount)
    console.log(
      '🚀 ~ getQuestions ~ skipAmount + questions.length:',
      skipAmount + questions.length
    )

    return { questions, isNext, total: totalQuestions, page, pageSize }
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

export async function deleteQuestion(params: DeleteQuestionParams) {
  const { questionId, path } = params
  try {
    connectToDatabase()
    await Question.deleteOne({ _id: questionId })
    await Answer.deleteMany({ question: questionId })
    await Interaction.deleteMany({ question: questionId })
    await Tag.updateMany(
      {
        questions: questionId
      },
      {
        $pull: {
          questions: questionId
        }
      }
    )

    revalidatePath(path)
  } catch (error) {
    console.log('🚀 ~ deleteQuestion ~ error:', error)
    throw error
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase()
    const { questionId, title, content, path } = params
    const question = await Question.findById(questionId).populate({
      path: 'tags',
      model: Tag
    })

    if (!question) {
      throw new Error('Question not found')
    }

    question.title = title
    question.content = content
    question.tags = []

    await question.save()
    params.path && revalidatePath(path)
  } catch (error) {}
}

export async function getHotQuestions() {
  try {
    connectToDatabase()
    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5)
    return hotQuestions
  } catch (error) {
    console.log(error)
    throw error
  }
}
