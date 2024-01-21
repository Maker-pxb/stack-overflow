'use client'
import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

interface Props {
  route: string
  iconPosition: 'left' | 'right'
  imgSrc: string
  placeholder: string
  otherClass?: string
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClass
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')
  const [search, setSearch] = React.useState(query || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search
        })
        router.push(`${newUrl}`, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q']
          })
          router.push(newUrl, { scroll: false })
        }
      }
      return () => clearTimeout(delayDebounceFn)
    }, 300)
  }, [search, router, route, pathname, searchParams, query])

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClass}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="Search icon"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        className="paragraph-regular no-focus placeholder text-dark400_light700  border-none bg-transparent shadow-none outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="Search icon"
        />
      )}
    </div>
  )
}

export default LocalSearchBar
