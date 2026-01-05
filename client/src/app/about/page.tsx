import { setData } from '@/src/lib/store/slices/exampleSlice'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const name = "hello"
  const selector = useSelector(setData(name))

  return (
    <div>page</div>
  )
}

export default page