'use client'
import { HomePageFilters } from '@/constants/filters'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

const HomeFilters = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [active, setActive] = useState('')

  const handleTypeClick = (value: string) => {
    if (active === value) {
      setActive('')
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null
      })
      router.push(`${newUrl}`, { scroll: false })
    } else {
      setActive(value)
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: value.toLocaleLowerCase()
      })
      router.push(`${newUrl}`, { scroll: false })
    }
  }

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {/* <p>active:{active}</p> */}
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleTypeClick(filter.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? 'bg-primary-100 text-primary-500'
              : 'bg-light-800 text-light-500  dark:bg-dark-300 dark:text-light-500 '
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilters
