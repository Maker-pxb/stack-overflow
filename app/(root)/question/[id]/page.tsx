import Answer from '@/components/forms/Answer'
import AllAnswers from '@/components/shared/AllAnswers'
import Metric from '@/components/shared/Metric'
import ParseHTML from '@/components/shared/ParseHTML'
import RenderTag from '@/components/shared/RenderTag'
import Votes from '@/components/shared/Votes'
import { ITag } from '@/database/tag.model'
import { getQuestionById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils'
import { VoteType } from '@/types/enum'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({
  params,
  searchParams
}: {
  params: {
    id: string
  }
  searchParams: {
    [key: string]: string
  }
}) => {
  const { id } = params
  const result = await getQuestionById({ questionId: id })
  const { userId: clerkId } = auth()
  const { author, tags } = result

  let mongoUser
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${author?.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={author?.picture}
              width={24}
              height={24}
              alt="avatar"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {author?.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type={VoteType.QUESTION}
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes?.length}
              hasUpVoted={result.upvotes?.includes(mongoUser._id)}
              downvotes={result.downvotes?.length}
              hasDownVoted={result.downvotes?.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked  ${getTimestamp(result.createdAt)}`}
          title={' Asked'}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers?.length)}
          title={' Answers'}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title={' Views'}
          textStyles="text-dark400_light800 small-medium"
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {tags?.map((tag: ITag) => (
          <RenderTag key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>
      <AllAnswers
        questionId={JSON.stringify(result._id)}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result.answers?.length}
        page={Number(searchParams?.page || 1)}
        filter={searchParams?.filter}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  )
}

export default page
