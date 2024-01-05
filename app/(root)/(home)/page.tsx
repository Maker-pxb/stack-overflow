import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main>
      <h1 className="h1-bold">next.js Home</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  )
}
