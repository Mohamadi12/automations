import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async() => {
    const user = await onBoardUser() //Connecter
    if (user.status === 200 || user.status === 201) {
      return redirect(`dashboard/${user.data?.firstname}${user.data?.lastname}`)
    } //Si c'est vrai
  
    return redirect('/sign-in') //Si c'est faux
}

export default Page