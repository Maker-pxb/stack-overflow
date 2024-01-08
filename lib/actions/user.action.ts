'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'

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
