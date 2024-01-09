'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'

export async function getUserById(params: any) {
  try {
    console.log('params', params)
    connectToDatabase()
    const { userId } = params

    const user = await User.findOne({
      clerkId: userId
    })
    console.log('🚀 ~ file: user.action.ts:15 ~ getUserById ~ user:', user)
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
    console.log('🚀 ~ file: user.action.ts:30 ~ createUser ~ newUser:', newUser)
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
    console.log('🚀 ~ file: user.action.ts:57 ~ updateUser ~ newUser:', newUser)
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
