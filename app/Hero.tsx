import Ripple from '@/components/magic/ripple'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
        <div className="mx-auto max-w-3xl text-center z-10">
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tighter">
            VII (XXIII) Всероссийский
            <strong className="font-extrabold text-primary block">Aрхеологический Cъезд</strong>
          </h1>
        
          <p className="mt-6 text-sm sm:text-lg/relaxed z-10">
            Примите участие во Всероссийском археологическом съезде, который состоится
            <br/>
            <span className='font-medium'>в июне 2025 года</span>.
            <br/>
            Регистрируйтесь уже сейчас!
          </p>
        
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/reg" passHref className=''>
              <Button className='font-medium shadow text-base px-12 py-6'>
                Регистрация
              </Button>
            </Link>

            <Link href="/info" passHref className=''>
              <Button variant="outline" className='font-medium shadow text-base px-12 py-6 border-none'>
                Узнать больше
              </Button>
            </Link>
          </div>
        </div>
        <Ripple className='mt-[7.5rem]' />
      </div>
    </section>
  )
}
