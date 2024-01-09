'use server'

import { connectToDatabase } from '../mongoose'
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types'
import User from '@/database/user.model'
import Tag from '@/database/tag.model'

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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase()
    const tags = await Tag.find({})
    return { tags }
  } catch (error) {
    console.log(error)
    throw error
  }
}
