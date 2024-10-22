"use client"

import { Loader2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function LogoutPage() {

    useEffect(() => {
        void signOut({
            redirect: true,
            callbackUrl: "/sign-in"
        })
    }, [])

    return (
        <div className="flex min-h-screen max-w-screen-xl mx-auto flex-col items-center justify-center">
            <Loader2 className='w-12 h-12 animate-spin transition-all' />
        </div>

    )
}
