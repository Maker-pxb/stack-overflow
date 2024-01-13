'use server'
import { FilterQuery } from 'mongoose'
import User, { IUser } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'

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
  // const { page = 1, pageSize = 20, filter, searchQuery } = params
  try {
    connectToDatabase()
    const users = await User.find<
      IUser & {
        _id: string
      }
    >({}).sort({ createdAt: -1 })
    return { users }
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
    // , filter
    const { clerkId, page = 1, pageSize = 10, searchQuery } = params

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          title: {
            $regex: searchQuery
          }
        }
      : {}
    const user = await User.findOne({
      clerkId
    }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: {
          createdAt: -1
        },
        limit: pageSize,
        skip: (page - 1) * pageSize
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
    if (!user) {
      throw new Error('User not found')
    }
    const savedQuestions = user.saved

    return {
      questions: savedQuestions
    }
  } catch (error) {}
}
