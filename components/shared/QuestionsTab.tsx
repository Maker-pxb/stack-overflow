import { getUserQuestions } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionCard'
import Pagination from './Pagination'

interface Props extends SearchParamsProps {
  userId: string
  clerkId: string | null
}
const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  console.log('🚀 ~ QuestionsTab ~ searchParams?.page:', searchParams?.page)

  const result = await getUserQuestions({
    userId,
    page: searchParams?.page ? Number(searchParams?.page) : 1,
    pageSize: 10
  })

  return (
    <>
      {result?.questions?.map((question) => {
        return (
          <QuestionCard
            key={question._id}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        )
      })}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? parseInt(searchParams?.page) : 1}
          isNext={result.isNext}
          total={result.totalQuestions}
          pageSize={result.pageSize}
          scroll={false}
        />
      </div>
    </>
  )
}

export default QuestionsTab
