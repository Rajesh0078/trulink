import React from 'react'

const page = async ({ params }) => {
  return (
    <section className='page'>{params}</section>
  )
}

export default page