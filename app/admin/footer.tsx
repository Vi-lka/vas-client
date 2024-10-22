"use client"

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Footer() {
  return (
    <Button 
        className='cursor-pointer text-center justify-center rounded-lg hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground'
      onClick={() => void signOut()}
    >
      Выход
    </Button>
  )
}
