import Question from '@/components/forms/Question'
import { getUserById } from '@/lib/actions/user.action'
// import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import React from 'react'

const AskQuestion = async () => {
  // const { userId } = auth()
  const userId = '12345'
  console.log('userId', userId)
  if (!userId) {
    redirect('/sign-in')
  }
  const mongoUser = await getUserById({ userId })

  console.log('mongoUser', mongoUser)
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Aks a Question</h1>
      <div>
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  )
}

export default AskQuestion
