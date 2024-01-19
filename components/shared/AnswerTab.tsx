import { getUserAnswers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import React from 'react'
import AnswerCard from '../cards/AnswerCard'
import Pagination from './Pagination'

interface Props extends SearchParamsProps {
  userId: string
  clerkId: string | null
}
const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams?.page ? Number(searchParams?.page) : 1,
    pageSize: 10
  })
  return (
    <>
      {result?.answers?.map((answer) => {
        return (
          <AnswerCard
            key={answer._id}
            _id={answer._id}
            clerkId={clerkId}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes?.length}
            createdAt={answer.createdAt}
          />
        )
      })}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? parseInt(searchParams?.page) : 1}
          isNext={result.isNext}
          total={result.totalAnswers}
          pageSize={result.pageSize}
          scroll={false}
        />
      </div>
    </>
  )
}

export default AnswersTab
