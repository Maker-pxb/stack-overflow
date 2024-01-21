'use client'
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { viewQuestion } from '@/lib/actions/interaction.action'
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'
import { formatAndDivideNumber } from '@/lib/utils'
import { VoteActionType, VoteType } from '@/types/enum'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from '../ui/use-toast'

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

  const handleVote = async (action: VoteActionType) => {
    if (!userId) {
      return toast({
        title: 'Please log in',
        description: 'You must be logged in to vote on this question'
      })
    }
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
      } else if (type === VoteType.ANSWER) {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname
        })
      }
      return toast({
        title: `Upvote ${!hasUpVoted ? 'Successfully' : 'Removed'}`,
        variant: !hasUpVoted ? 'default' : 'destructive'
      })
    }
    if (action === VoteActionType.DOWNVOTE) {
      if (type === VoteType.QUESTION) {
        await downvoteQuestion(params)
      } else if (type === VoteType.ANSWER) {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname
        })
      }
      return toast({
        title: `Downvote ${!hasDownVoted ? 'Successful' : 'Removed'}`,
        variant: !hasDownVoted ? 'default' : 'destructive'
      })
    }
  }

  const handleSave = async () => {
    toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname
    })
    return toast({
      title: `Question ${
        !hasSaved ? 'Saved in' : 'Removed from'
      } your collection`,
      variant: !hasSaved ? 'default' : 'destructive'
    })
  }

  useEffect(() => {
    if (type === VoteType.QUESTION) {
      viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined
      })
    }
  }, [itemId, userId, pathname, router, type])

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
