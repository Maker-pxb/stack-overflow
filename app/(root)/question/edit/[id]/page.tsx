import Question from '@/components/forms/Question'
import { getQuestionById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { URLProps } from '@/types'
import { EditType } from '@/types/enum'
import { auth } from '@clerk/nextjs'
import React from 'react'

const page = async ({ params: { id } }: URLProps) => {
  const { userId } = auth()
  if (!userId) return null

  const mongoUserId = await getUserById({ userId })
  const questionDetails = await getQuestionById({ questionId: id })
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type={EditType.EDIT}
          mongoUserId={JSON.stringify(mongoUserId?._id)}
          questionDetails={JSON.stringify(questionDetails)}
        />
      </div>
    </>
  )
}

export default page
