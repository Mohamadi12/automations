import Sidebar from '@/components/global/sidebar';
import React from 'react'

type Props = {
    children: React.ReactNode;
    params: {slug: string}
}

const Layout = ({children, params}: Props) => {
    //Query
    //query client fetch data
  return (
    <div className='p-3'>
        {/* Sidebar */}
        <Sidebar slug={params.slug}/>
        
        {/* Navbar */}
    </div>
  )
}

export default Layout