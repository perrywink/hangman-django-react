import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <nav className='border-b w-full'>
        <div className='mx-auto max-w-screen-lg px-2 py-4'>
          <h1 className='text-3xl font-bold'>
            Hangman
          </h1>
        </div>
      </nav>
      <main className='mx-auto max-w-screen-lg px-2 py-8'>
        <Outlet />
      </main>
    </React.Fragment>
  ),
})
