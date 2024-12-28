import React from 'react'
import { Button } from "@/components/ui/button"
import HeroSection from '@/components/base/HeroSection'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/options'

export default async function App () {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <HeroSection></HeroSection>
    </div>
  )
}


