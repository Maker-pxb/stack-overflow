'use server'
import { FilterQuery } from 'mongoose'
import User, { IUser } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import Answer from '@/database/answer.model'
import { QuestionFilterEnum, UserFiltersEnum } from '@/constants/filters'

export async function getUserById(params: any) {
  try {
    connectToDatabase()
    const { userId } = params

    const user = await User.findOne({
      clerkId: userId
    })
    return user
    // connect to database
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createUser(userParams: CreateUserParams) {
  try {
    connectToDatabase()
    // const { clerkId, email, firstName, lastName, username, imageUrl:picture } = userParams
    const newUser = await User.create(userParams)
    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(userParams: UpdateUserParams) {
  try {
    connectToDatabase()
    const { clerkId, updateData, path } = userParams
    const newUser = await User.findOneAndUpdate(
      {
        clerkId
      },
      updateData,
      {
        new: true
      }
    )
    path && revalidatePath(path)
    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteUser(userParams: DeleteUserParams) {
  try {
    connectToDatabase()
    const { clerkId } = userParams
    const user = await User.findOneAndDelete({
      clerkId
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Delete all questions and answers by the user
    const userQuestionIds = await Question.find({
      author: user._id
    }).distinct('_id')
    console.log(
      '🚀 ~ file: user.action.ts:82 ~ deleteUser ~ userQuestionIds:',
      userQuestionIds
    )

    // TODO delete all answers by the user

    const deletedUser = await User.findByIdAndDelete(user._id)
    return deletedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  const { page = 1, pageSize = 20, filter, searchQuery } = params

  const query: FilterQuery<typeof User> = {}
  const skipAmount = (page - 1) * pageSize
  if (searchQuery) {
    query.$or = [
      { name: { $regex: new RegExp(searchQuery, 'i') } },
      { username: { $regex: new RegExp(searchQuery, 'i') } }
    ]
  }

  let sortOptions = {}
  switch (filter) {
    case UserFiltersEnum.NEW_USERS:
      sortOptions = { joinAt: -1 }
      break
    case UserFiltersEnum.TOP_CONTRIBUTORS:
      sortOptions = { reputation: -1 }
      break
    case UserFiltersEnum.OLD_USERS:
      sortOptions = { joinAt: 1 }
      break
    default:
      break
  }

  try {
    connectToDatabase()
    const users = await User.find<
      IUser & {
        _id: string
      }
    >(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions)
    const total = await User.countDocuments(query)
    const isNext = total > skipAmount + users.length
    return { users, isNext, total, pageSize, page }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase()
    const { userId, questionId, path } = params
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const isQuestionSaved = user.saved.includes(questionId)
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            saved: questionId
          }
        },
        {
          new: true
        }
      )
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            saved: questionId
          }
        },
        {
          new: true
        }
      )
    }
    path && revalidatePath(path)
    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase()
    const { clerkId, page = 1, pageSize = 10, searchQuery, filter } = params

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          title: {
            $regex: searchQuery
          }
        }
      : {}
    const skipAmount = (page - 1) * pageSize
    let sortOptions = {}
    switch (filter) {
      case QuestionFilterEnum.MOST_RECENT:
        sortOptions = {
          createdAt: -1
        }
        break
      case QuestionFilterEnum.OLDEST:
        sortOptions = {
          createdAt: 1
        }
        break
      case QuestionFilterEnum.MOST_ANSWERED:
        sortOptions = {
          answers: -1
        }
        break
      case QuestionFilterEnum.MOST_VIEWED:
        sortOptions = {
          views: -1
        }
        break
      case QuestionFilterEnum.MOST_VOTED:
        sortOptions = {
          upvotes: -1
        }
        break
      default:
        break
    }

    const user = await User.findOne({
      clerkId
    }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: sortOptions,
        limit: pageSize,
        skip: skipAmount
      },
      populate: [
        {
          path: 'tags',
          model: Tag,
          select: '_id name'
        },
        {
          path: 'author',
          model: User,
          select: '_id clerkId name picture'
        }
      ]
    })

    const userAllSaved = await User.findOne({
      clerkId
    })
    if (!user || !userAllSaved) {
      throw new Error('User not found')
    }
    const savedQuestions = user.saved || []
    const total = userAllSaved.saved.length
    const isNext = total > skipAmount + user.saved.length
    return {
      questions: savedQuestions,
      total,
      isNext,
      pageSize
    }
  } catch (error) {}
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase()
    const { userId } = params
    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error('User not found')
    }

    const totalQuestions = await Question.countDocuments({
      author: user._id
    })

    const totalAnswers = await Answer.countDocuments({
      author: user._id
    })

    return {
      user,
      totalQuestions,
      totalAnswers
    }
  } catch (error) {
    console.log('🚀 ~ getUserInfo ~ error:', error)
    throw error
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  const { userId, page = 1, pageSize = 10 } = params
  try {
    connectToDatabase()
    const totalQuestions = await Question.countDocuments({
      author: userId
    })
    const skipAmount = (page - 1) * pageSize
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture')
    const isNext = totalQuestions > skipAmount + userQuestions.length
    return {
      questions: userQuestions,
      isNext,
      totalQuestions,
      pageSize,
      page
    }
  } catch (error) {
    console.log('🚀 ~ getUserQuestions ~ error:', error)
    throw error
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  const { userId, page = 1, pageSize = 10 } = params
  try {
    connectToDatabase()
    const totalAnswers = await Answer.countDocuments({
      author: userId
    })
    const skipAmount = (page - 1) * pageSize
    console.log('🚀 ~ getUserAnswers ~ pageSize:', pageSize)
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture')
    const isNext = totalAnswers > skipAmount + userAnswers.length
    return {
      answers: userAnswers,
      totalAnswers,
      isNext,
      pageSize,
      page
    }
  } catch (error) {
    console.log('🚀 ~ getUserQuestions ~ error:', error)
    throw error
  }
}
