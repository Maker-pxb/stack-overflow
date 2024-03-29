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
  QuestionVoteParams,
  RecommendedParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Answer from '@/database/answer.model'
import Interaction, {
  ActionScore,
  ReputationAction
} from '@/database/interaction.model'
import { FilterQuery } from 'mongoose'
import { HomeFilterEnum } from '@/constants/filters'

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase()
    const { page = 1, pageSize = 10, searchQuery = '', filter = '' } = params
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

    await Interaction.create({
      user: params.author,
      action: ReputationAction.ASK_QUESTION,
      question: question._id,
      tags: tagDocuments
    })

    await User.findByIdAndUpdate(params.author, {
      $inc: { reputation: ActionScore.ASK_QUESTION }
    })
    params.path && revalidatePath(params.path)
  } catch (error) {
    console.log(error)
    throw error
  }
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
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true
    })

    if (!question) {
      throw new Error('question not found')
    }

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasUpVoted
          ? ActionScore.DOWNVOTE_QUESTION_FOR_USER
          : ActionScore.UPVOTE_QUESTION_FOR_USER
      }
    })

    await User.findByIdAndUpdate(question.author, {
      $inc: {
        reputation: hasUpVoted
          ? ActionScore.DOWNVOTE_QUESTION_FOR_AUTHOR
          : ActionScore.UPVOTE_QUESTION_FOR_AUTHOR
      }
    })
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

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasDownVoted
          ? ActionScore.UPVOTE_QUESTION_FOR_USER
          : ActionScore.DOWNVOTE_QUESTION_FOR_USER
      }
    })

    await User.findByIdAndUpdate(question.author, {
      $inc: {
        reputation: hasDownVoted
          ? ActionScore.UPVOTE_QUESTION_FOR_AUTHOR
          : ActionScore.DOWNVOTE_QUESTION_FOR_AUTHOR
      }
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

export async function getRecommendedQuestions(params: RecommendedParams) {
  try {
    await connectToDatabase()

    const { userId, page = 1, pageSize = 20, searchQuery } = params

    // find user
    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error('user not found')
    }

    const skipAmount = (page - 1) * pageSize

    // Find the user's interactions
    const userInteractions = await Interaction.find({ user: user._id })
      .populate('tags')
      .exec()

    // Extract tags from user's interactions
    const userTags = userInteractions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags)
      }
      return tags
    }, [])

    // Get distinct tag IDs from user's interactions
    const distinctUserTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag._id))
    ]

    const query: FilterQuery<typeof Question> = {
      $and: [
        { tags: { $in: distinctUserTagIds } }, // Questions with user's tags
        { author: { $ne: user._id } } // Exclude user's own questions
      ]
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } }
      ]
    }

    const totalQuestions = await Question.countDocuments(query)

    const recommendedQuestions = await Question.find(query)
      .populate({
        path: 'tags',
        model: Tag
      })
      .populate({
        path: 'author',
        model: User
      })
      .skip(skipAmount)
      .limit(pageSize)

    const isNext = totalQuestions > skipAmount + recommendedQuestions.length

    return {
      questions: recommendedQuestions,
      isNext,
      total: totalQuestions,
      pageSize
    }
  } catch (error) {
    console.error('Error getting recommended questions:', error)
    throw error
  }
}
