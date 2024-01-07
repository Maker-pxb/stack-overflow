import Link from 'next/link'
import React from 'react'
import RenderTag from '../shared/RenderTag'
import Metric from '../shared/Metric'
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils'
export interface QuestionProps {
  _id: string | number
  title: string
  tags: {
    _id: string | number
    name: string
  }[]
  author: {
    _id: string | number
    name: string
    picture: string
  }
  upvotes: number
  views: number
  answers: Array<object>
  createdAt: Date
}
const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 ">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* Todo edit */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link href={`/tag/${tag._id}`} key={tag._id}>
            <RenderTag _id={tag._id} name={tag.name}></RenderTag>
          </Link>
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)} `}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="text-dark400_light700 body-medium"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatAndDivideNumber(upvotes)}
          title={' Votes'}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(answers?.length)}
          title={' Answers'}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title={' Views'}
          textStyles="text-dark400_light800 small-medium"
        />
      </div>
    </div>
  )
}

export default QuestionCard
