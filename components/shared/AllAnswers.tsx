import { AnswerFilters } from '@/constants/filters'
import React from 'react'
import Filters from './Filters'
import { getAnswers } from '@/lib/actions/answer.action'
import Link from 'next/link'
import Image from 'next/image'
import { getTimestamp } from '@/lib/utils'
import ParseHTML from './ParseHTML'
import Votes from './Votes'
import { VoteType } from '@/types/enum'
import Pagination from './Pagination'
interface Props {
  questionId: string
  userId: string
  totalAnswers: number
  page?: number
  filter?: string
}
const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page = 1,
  filter
}: Props) => {
  const result = await getAnswers({
    questionId: JSON.parse(questionId),
    page,
    sortBy: filter
  })

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient ">{totalAnswers} Answer</h3>
        <Filters
          filters={AnswerFilters}
          otherClass="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div>
        {result?.answers?.map((answer) => (
          <article className="light-border border-b py-10" key={answer._id}>
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                    alt="profile"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 ml-0.5 line-clamp-1">
                      <span className="max-sm:hidden"> -</span>
                      <span>answered {getTimestamp(answer.createdAt)}</span>
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type={VoteType.ANSWER}
                    itemId={JSON.stringify(answer._id)}
                    userId={userId}
                    upvotes={answer.upvotes?.length}
                    hasUpVoted={answer.upvotes?.includes(JSON.parse(userId))}
                    downvotes={answer.downvotes?.length}
                    hasDownVoted={answer.downvotes?.includes(
                      JSON.parse(userId)
                    )}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={page}
          isNext={result?.isNext || false}
          total={result?.total}
          pageSize={result?.pageSize}
        />
      </div>
    </div>
  )
}

export default AllAnswers
