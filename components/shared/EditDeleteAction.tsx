'use client'
import { deleteAnswer } from '@/lib/actions/answer.action'
import { deleteQuestion } from '@/lib/actions/question.action'
import { VoteType } from '@/types/enum'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  type: VoteType
  itemId: string
}
const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`)
  }
  const handleDelete = () => {
    if (type === VoteType.QUESTION) {
      deleteQuestion({ questionId: JSON.parse(itemId), path: pathname })
    } else if (type === VoteType.ANSWER) {
      deleteAnswer({ answerId: JSON.parse(itemId), path: pathname })
    }
  }
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === VoteType.QUESTION && (
        <>
          <Image
            src="/assets/icons/edit.svg"
            alt="Edit"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
            onClick={handleEdit}
          />
        </>
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  )
}

export default EditDeleteAction
