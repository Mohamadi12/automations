import { onBoardUser } from '@/actions/user'
import React from 'react'

const Page = async() => {
    //Server Action Onboard the user
    const user = await onBoardUser()
  return (
    <div>Page</div>
  )
}

export default Page