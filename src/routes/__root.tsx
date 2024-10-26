import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <nav className='border-b w-full'>
        <div className='mx-auto max-w-screen-lg px-2 py-4'>
          <Link href="/">
            <h1 className='text-2xl font-bold'>
              hangman
            </h1>
          </Link>
        </div>
      </nav>
      <main className='mx-auto max-w-screen-lg px-2 py-8'>
        <Outlet />
      </main>
    </React.Fragment>
  ),
})
