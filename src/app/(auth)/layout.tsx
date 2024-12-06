import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex justify-center items-center h-screen'>
        {children}
    </div>
  )
}

export default Layout