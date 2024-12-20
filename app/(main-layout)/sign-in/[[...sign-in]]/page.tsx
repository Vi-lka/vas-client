import React from 'react'
import SignInForm from '@/components/froms/sign-in/SignInForm'
import ForgotPassForm from '@/components/froms/sign-in/ForgotPassForm'
import ResetPassForm from '@/components/froms/sign-in/ResetPassForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import getRegistration from '@/lib/queries/getRegistration'

type Props = {
  params: { 'sign-in': string[] | undefined } 
  searchParams: {
    code?: string,
  },
};


export default async function SignInPage({ params, searchParams }: Props) {

  const currentPage = params['sign-in'] ? params['sign-in'][0] : ""

  const [ registration ] = await Promise.allSettled([ getRegistration() ]);
  const registrationEnabled = registration.status === "fulfilled" ? registration.value : true

  return (
    <main className="container mx-auto pt-24">
      {currentPage === "reset"
        ? (
          <div className="w-full flex min-h-screen max-w-screen-xl mx-auto flex-col items-center gap-16 md:pt-12 pt-6">
            <ResetPassForm searchParams={searchParams} />
          </div>
        )
        : currentPage === "forgot"
          ? (
            <div className="w-full flex min-h-screen max-w-screen-xl mx-auto flex-col items-center gap-16 md:pt-12 pt-6">
              <ForgotPassForm />
            </div>
          )
          : (
            <div className="w-full flex min-h-screen max-w-screen-xl mx-auto flex-col items-center gap-16 md:pt-12 pt-6">
              <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto mt-20'>
                <CardHeader>
                  <CardTitle className='text-center lg:text-2xl text-xl'>Вход</CardTitle>
                </CardHeader>
                <CardContent>
                  <SignInForm />
                </CardContent>
                {registrationEnabled && (
                  <CardFooter className='absolute -bottom-16 w-full flex items-center justify-center gap-1'>
                    <p className='text-sm'>Нет аккаунта?</p>
                    <Link href="/sign-up" passHref className=''>
                      <Button variant="link" className='text-sm font-medium px-1'>
                        Регистрация
                      </Button>
                    </Link>
                  </CardFooter>
                )}
              </Card>
            </div>
          )
      }
    </main>
  )
}
