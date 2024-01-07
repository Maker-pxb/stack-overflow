'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import Tag from '@/database/tag.model'

export async function createQuestion(params: {
  title: string
  explanation: string
  tags: string[]
}) {
  const question = await Question.create({
    title: params.title,
    explanation: params.explanation,
    tags: params.tags
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
    $set: {
      tags: {
        $each: tagDocuments
      }
    }
  })
  try {
    connectToDatabase()
    // connect to database
    console.log(params)
  } catch (error) {}
}
