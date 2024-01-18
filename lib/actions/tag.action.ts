'use server'

import { connectToDatabase } from '../mongoose'
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams
} from './shared.types'
import User from '@/database/user.model'
import Tag, { ITag } from '@/database/tag.model'
import { FilterQuery } from 'mongoose'
import Question from '@/database/question.model'
import { TagFiltersEnum } from '@/constants/filters'

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
  const { page = 1, pageSize = 20, filter, searchQuery } = params
  try {
    connectToDatabase()
    const query: FilterQuery<typeof Tag> = {}
    if (searchQuery) {
      query.$or = [
        {
          name: {
            $regex: new RegExp(searchQuery, 'i')
          }
        }
      ]
    }

    let sortOptions = {}
    switch (filter) {
      case TagFiltersEnum.POPULAR:
        sortOptions = {
          questions: -1
        }
        break
      case TagFiltersEnum.RECENT:
        sortOptions = {
          createdAt: -1
        }
        break
      case TagFiltersEnum.NAME:
        sortOptions = {
          name: 1
        }
        break
      case TagFiltersEnum.OLD:
        sortOptions = {
          createdAt: 1
        }
        break
      default:
        break
    }
    const tags = await Tag.find(query).sort(sortOptions)
    return { tags }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  const { tagId, page = 1, pageSize = 10, searchQuery = '' } = params
  try {
    connectToDatabase()

    const tagFilter: FilterQuery<ITag> = {
      _id: tagId
    }
    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? {
            title: {
              $regex: searchQuery,
              $options: 'i'
            }
          }
        : {},
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

    if (!tag) {
      throw new Error('Tag not found')
    }
    const questions = tag.questions

    return { tagTitle: tag.name, questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase()

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: '$questions' } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 }
    ])
    return popularTags
  } catch (error) {
    console.log(error)
    throw error
  }
}
