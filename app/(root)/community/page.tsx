import UserCard from '@/components/cards/UserCard'
import Filters from '@/components/shared/Filters'
import Pagination from '@/components/shared/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community | Dev Overflow',
  description: 'Community page of Dev Overflow'
}
const page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? Number(searchParams?.page) : 1,
    pageSize: 2
  })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-4 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClass="flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClass="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result?.users.length > 0 ? (
          result?.users?.map((user) => (
            <UserCard key={user._id} user={user}></UserCard>
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? parseInt(searchParams?.page) : 1}
          isNext={result.isNext}
          total={result.total}
          pageSize={result.pageSize}
        />
      </div>
    </>
  )
}

export default page
