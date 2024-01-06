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

interface Props {
  filters: {
    name: string
    value: string
  }[]
  otherClass?: string
  containerClass?: string
}
const Filters = ({ filters, otherClass, containerClass }: Props) => {
  return (
    <div className={`relative ${containerClass}`}>
      <Select>
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
              <SelectItem key={filter.value} value={filter.value}>
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
