import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilters from '@/components/home/HomeFilters'
import Filters from '@/components/shared/Filters'
import NoResult from '@/components/shared/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'

const questions = [
  {
    _id: '1',
    title: 'How to use Next.js with TypeScript?',
    tags: [
      {
        _id: 1,
        name: 'Next.js'
      },
      {
        _id: 2,
        name: 'TypeScript'
      }
    ],
    author: {
      _id: '1',
      name: 'Maker',
      picture: 'https://example.com/maker.jpg'
    },
    upvotes: 10000000,
    views: 10,
    answers: [{}, {}], // Fill with actual objects
    createdAt: new Date('2021-09-01T00:00:00.000Z')
  },
  {
    _id: '2',
    title: 'How to use Next.js with TypeScript?',
    tags: [
      {
        _id: '1',
        name: 'Next.js'
      },
      {
        _id: '2',
        name: 'TypeScript'
      }
    ],
    author: {
      _id: '2',
      name: 'pxb',
      picture: 'https://example.com/pxb.jpg'
    },
    upvotes: 15,
    views: 20,
    answers: [{}, {}], // Fill with actual objects
    createdAt: new Date('2023-09-01T00:00:00.000Z')
  },
  {
    _id: '3',
    title: 'How to use Next.js with TypeScript?',
    tags: [
      {
        _id: '1',
        name: 'Next.js'
      },
      {
        _id: '2',
        name: 'TypeScript'
      }
    ],
    author: {
      _id: '3',
      name: 'pxb',
      picture: 'https://example.com/pxb.jpg'
    },
    upvotes: 20,
    views: 20,
    answers: [{}, {}], // Fill with actual objects
    createdAt: new Date('2023-09-01T00:00:00.000Z')
  }
]

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Question</h1>
        <Link href="/questions/ask" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-4 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClass="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClass="min-h-[56px] sm:min-w-[170px]"
          containerClass="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  )
}
