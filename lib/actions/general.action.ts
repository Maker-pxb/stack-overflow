'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import Question from '@/database/question.model'
import Answer from '@/database/answer.model'
import { SearchParams } from './shared.types'
import Tag from '@/database/tag.model'

const SearchableTypes = ['question', 'user', 'answer', 'tag']
export async function globalSearch(params: SearchParams) {
  try {
    connectToDatabase()
    const { query, type } = params
    const regexQuery = { $regex: query, $options: 'i' }

    let results: {
      title: string
      type?: string | null
      id: string
    }[]

    const modelsAndTypes = [
      {
        model: Question,
        searchField: 'title',
        type: 'question'
      },
      {
        model: User,
        searchField: 'name',
        type: 'user'
      },
      {
        model: Answer,
        searchField: 'content',
        type: 'answer'
      },
      {
        model: Tag,
        searchField: 'name',
        type: 'tag'
      }
    ]
    const typeLower = type?.toLowerCase()

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // Search all types
      const queryResults = await Promise.all(
        modelsAndTypes.map(async (modelAndType) => {
          const result = await modelAndType.model
            .find({
              [modelAndType.searchField]: regexQuery
            })
            .limit(2)
          return result.map((item) => ({
            title:
              modelAndType.type === 'answer'
                ? `Answer containing ${query}`
                : item[modelAndType.searchField],
            type: modelAndType.type,
            id:
              modelAndType.type === 'user'
                ? item.clerkId
                : modelAndType.type === 'answer'
                  ? item.question
                  : item._id
          }))
        })
      )
      results = queryResults.flat()
      return JSON.stringify(results)
    } else {
      // Search specific type
      const modelInfo = modelsAndTypes.find(
        (modelAndType) => modelAndType.type === type
      )
      if (!modelInfo) {
        throw new Error('Invalid type')
      }

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery
        })
        .limit(8)
      results = queryResults.map((item) => ({
        title:
          type === 'answer'
            ? `Answer containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === 'user'
            ? item.clerkId
            : type === 'answer'
              ? item.question
              : item._id
      }))
      return JSON.stringify(results)
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
