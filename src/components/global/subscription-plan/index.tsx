import React from 'react'

type Props = {
    type: 'FREE' | 'PRO'
    children: React.ReactNode
}

const SubscriptionPlan = ({children, type}: Props) => {
  return (
    <div>{children}n</div>
  )
}

export default SubscriptionPlan