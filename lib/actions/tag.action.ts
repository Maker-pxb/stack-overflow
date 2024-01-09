'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { GetTopInteractedTagsParams } from './shared.types'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  // const { page = 1, pageSize = 20, filter, searchQuery } = params
  try {
    connectToDatabase()
    // , limit = 3
    const { userId } = params
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return ['tag1', 'tag2', 'tag3'].map((tag, index) => ({
      _id: 'id' + index,
      name: tag
    }))
  } catch (error) {
    console.log(error)
    throw error
  }
}
