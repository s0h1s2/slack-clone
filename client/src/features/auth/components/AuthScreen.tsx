"use client";
import React, { useState } from 'react'
import { AuthFlow } from '../types'
import SignInCard from './SignInCard'
import SignUpCard from './SignUpCard'

const AuthScreen = () => {
  const [authState, setAuthState] = useState<AuthFlow>("signin")

  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        {authState === "signin" ? <SignInCard setAuthState={setAuthState} /> : <SignUpCard setAuthState={setAuthState} />}
      </div>
    </div>
  )
}

export default AuthScreen
