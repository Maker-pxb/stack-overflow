import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilters from '@/components/home/HomeFilters'
import NoResult from '@/components/shared/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { getQuestionsByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'
import React from 'react'

const page = async ({ params: { id: tagId }, searchParams }: URLProps) => {
  const { questions, tagTitle } = await getQuestionsByTagId({
    tagId,
    page: 1,
    searchQuery: searchParams.q
  })
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>
      <div className="mt-11 flex justify-between gap-4 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClass="flex-1"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  )
}

export default page
