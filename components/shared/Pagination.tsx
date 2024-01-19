'use client'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  pageNumber: number
  isNext: boolean
  total?: number
  pageSize?: number
  scroll?: boolean
}
const Pagination = ({
  pageNumber = 1,
  pageSize = 10,
  isNext,
  total = 0,
  scroll = true
}: Props) => {
  console.log('🚀 ~ isNext:', isNext)
  console.log('🚀 ~ pageSize:', pageSize)
  console.log('🚀 ~ total:', total)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Math.ceil(total / pageSize) || 0
  console.log('🚀 ~ pageCount:', pageCount)
  const handleNavigation = (direction: string, page?: number) => {
    let nextPage
    if (direction === 'page') {
      nextPage = page
    } else if (direction === 'prev') {
      nextPage = pageNumber - 1
    } else if (direction === 'next') {
      nextPage = pageNumber + 1
    }
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPage!.toString()
    })
    router.push(newUrl, {
      scroll
    })
  }
  return (
    <>
      {total > pageSize ? (
        <div className="flex w-full items-center justify-center gap-2">
          {total && (
            <p className="body-medium text-dark200_light800">Total: {total}</p>
          )}
          <Button
            disabled={pageNumber === 1}
            onClick={() => handleNavigation('prev')}
            className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
          >
            <p className="body-medium text-dark200_light800">Pre</p>
          </Button>
          {pageCount > 0 ? (
            Array.from({
              length: pageCount
            }).map((page, index: number) => (
              <div
                key={index}
                className={`flex cursor-pointer items-center justify-center  rounded-md px-3.5 py-2 ${
                  index + 1 === pageNumber
                    ? 'bg-primary-500'
                    : 'btn bg-light-900'
                }`}
                onClick={() => handleNavigation('page', index + 1)}
              >
                <p
                  className={`body-semibold ${
                    index + 1 === pageNumber ? 'text-light-900' : ''
                  }`}
                >
                  {index + 1}
                </p>
              </div>
            ))
          ) : (
            <></>
          )}
          {/* <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
            <p className="body-semibold text-light-900">{pageNumber}</p>
          </div> */}
          <Button
            disabled={!isNext}
            onClick={() => handleNavigation('next')}
            className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
          >
            <p className="body-medium text-dark200_light800">Next</p>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Pagination
