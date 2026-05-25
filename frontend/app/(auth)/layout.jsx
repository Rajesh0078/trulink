import Link from 'next/link'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className='h-dvh'>
      <header className='flex-between h-16 py-0 px-[4%] md:px-[7%] backdrop-blur-sm z-50 border-b border-border-2'>
        <Link href="/" className='colored-text'>
          <h1>TruLink</h1>
        </Link>
        <div className='flex-center'>
          <Link href="/login" className='mr-2 btn-outlined'>Log in</Link>
          <Link href="/register" className='btn-primary'>
            Create Account
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}

export default layout