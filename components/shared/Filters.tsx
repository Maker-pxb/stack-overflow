'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SelectGroup } from '@radix-ui/react-select'
import { formUrlQuery } from '@/lib/utils'
import { useSearchParams, useRouter } from 'next/navigation'
interface Props {
  filters: {
    name: string
    value: string
  }[]
  otherClass?: string
  containerClass?: string
}
const Filters = ({ filters, otherClass, containerClass }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const paramsFilter = searchParams.get('filter') || ''

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value
    })
    router.push(`${newUrl}`, { scroll: false })
  }
  return (
    <div className={`relative ${containerClass}`}>
      <Select defaultValue={paramsFilter} onValueChange={handleUpdateParams}>
        <SelectTrigger
          className={`${otherClass} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Theme" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filters
