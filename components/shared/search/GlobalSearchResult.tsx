'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import GlobalFilters from './GlobalFilters'
import { globalSearch } from '@/lib/actions/general.action'

const GlobalSearchResult = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState([])
  const global = searchParams.get('global')
  const type = searchParams.get('type')
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const fetchResult = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await globalSearch({ query: global, type })
      setResult(JSON.parse(res || ''))
    } catch (error) {
      console.log('🚀 ~ fetchResult ~ error:', error)
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)
  }, [global, type])

  useEffect(() => {
    if (global) {
      fetchResult()
    }
  }, [global, fetchResult])

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case 'question':
        return `/question/${id}`
      case 'answer':
        return `/question/${id}`
      case 'user':
        return `/profile/${id}`
      case 'tag':
        return `/tags/${id}`
      default:
        return '/'
    }
  }

  return (
    <div
      className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400"
      ref={searchContainerRef}
    >
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalFilters />
      </p>
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50"></div>
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">loading...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {result?.length > 0 ? (
                <>
                  {result?.map((item: any, index: number) => (
                    <Link
                      href={renderLink(item.type, item.id)}
                      key={item.id + item.type + index}
                      className="flex w-full items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                    >
                      <Image
                        src="/assets/icons/tag.svg"
                        alt="tags"
                        width={18}
                        height={18}
                        className="invert-colors mt-1 object-contain"
                      />
                      <div className="flex flex-col">
                        <p className="body-medium text-dark200_light800 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-light400_light500 small-medium">
                          {item.type}
                        </p>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="flex-center flex-col px-5">
                  <p className="text-dark200_light800 body-regular px-5 py-2.5">
                    Oops, no results found
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GlobalSearchResult
