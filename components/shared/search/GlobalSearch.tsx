'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

const GlobalSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('global')
  const [search, setSearch] = useState(query || '')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        console.log('🚀 ~ delayDebounceFn ~ search:', search)
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search
        })
        router.push(`${newUrl}`, { scroll: false })
      } else {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['global']
        })
        router.push(newUrl, { scroll: false })
      }
      return () => clearTimeout(delayDebounceFn)
    }, 300)
  }, [search, router, pathname, searchParams, query])
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={'/assets/icons/search.svg'}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          className="no-focus placeholder text-dark400_light700 paragraph-regular background-light800_darkgradient border-none shadow-none"
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (!isOpen) {
              setIsOpen(true)
            }
            if (e.target.value === '' && isOpen) {
              setIsOpen(false)
            }
          }}
        />
      </div>
    </div>
  )
}

export default GlobalSearch
