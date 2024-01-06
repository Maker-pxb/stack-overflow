'use client'
import Image from 'next/image'
import React from 'react'
import { Input } from '../navbar/ui/input'

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
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        value=""
        onChange={() => {}}
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
