"use client"
import React from 'react'

import { useSession, signOut,signIn } from "next-auth/react"
 
export  default function Dashboard() {
  const { data: session } = useSession()
 
  if (session?.user) {
    return <p>
      {JSON.stringify(session.user)}

      <button onClick={() => signOut()}>Sign Out</button>
      
    </p>
  } else{
    return <div>
    
    <SignIn />
  </div>
  }
 
 
}





 
export function SignIn() {
  return <button onClick={() => signIn('github')}>Sign In</button>
}