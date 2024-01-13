'use client'
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'
import { formatAndDivideNumber } from '@/lib/utils'
import { VoteActionType, VoteType } from '@/types/enum'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  type: VoteType
  itemId: string
  userId: string
  upvotes: number
  downvotes: number
  hasUpVoted: boolean
  hasDownVoted: boolean
  hasSaved?: boolean
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved = false
}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  console.log('🚀 ~ router:', router)
  const handleVote = async (action: VoteActionType) => {
    if (!userId) return
    const params = {
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      hasUpVoted,
      hasDownVoted,
      path: pathname
    }
    console.log('🚀 ~ handleVote ~ params:', params)
    if (action === VoteActionType.UPVOTE) {
      if (type === VoteType.QUESTION) {
        await upvoteQuestion(params)
        console.log('upvote question')
      } else if (type === VoteType.ANSWER) {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname
        })
      }
    }
    if (action === VoteActionType.DOWNVOTE) {
      if (type === VoteType.QUESTION) {
        await downvoteQuestion(params)
        console.log('upvote question')
      } else if (type === VoteType.ANSWER) {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname
        })
      }
    }
  }
  const handleSave = async () => {
    toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname
    })
  }
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote(VoteActionType.UPVOTE)}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote(VoteActionType.DOWNVOTE)}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === VoteType.QUESTION && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  )
}

export default Votes
