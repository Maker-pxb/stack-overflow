import React from 'react'

interface Props {
  questionId: string
  userId: string
  totalAnswers: number
  page: number
  filter: string
}
const AllAnswers = ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter
}: Props) => {
  return <div>AllAnswers</div>
}

export default AllAnswers
