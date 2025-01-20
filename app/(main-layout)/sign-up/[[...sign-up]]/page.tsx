import * as React from 'react';
import SignUpForm from '../../../../components/froms/sign-up/SignUpForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Confirmation from '@/components/froms/sign-up/Confirmation';
import Steps from './Steps';
import { Check, Database, LogIn } from 'lucide-react';
import MetadataForm from '@/components/froms/MetadataForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import getRegistration from '@/lib/queries/getRegistration';
import { redirect } from 'next/navigation';

type Props = {
  params: { 'sign-up': string[] | undefined } 
  searchParams: {
    confirmation?: string,
    key?: string
  },
};


export default async function SignUpPage({ params, searchParams }: Props) {

  const currentPage = params['sign-up'] ? params['sign-up'][0] : ""

  const stepsData = [
    {title: "Регистрация", active: true, children: <LogIn className='w-5 h-5' />},
    {title: "Подтверждение", active: currentPage === "confirmation", children: <Check className='w-5 h-5' />},
    {title: "Данные", active: currentPage === "metadata", children: <Database className='w-5 h-5' />}
  ]

  const stepsValue = currentPage === "metadata"
    ? 100
    : currentPage === "confirmation"
      ? 50
      : 5

  const [ registration ] = await Promise.allSettled([ getRegistration() ]);
  const registrationEnabled = registration.status === "fulfilled" ? registration.value : true

  if (!registrationEnabled && !(searchParams.key === process.env.REG_KEY) && currentPage.length === 0) redirect("/sign-in")

  return (
    <main className="container mx-auto pt-24">
      <div className="w-full flex min-h-screen max-w-screen-xl mx-auto flex-col items-center gap-16 md:pt-12 pt-6">
        <Steps
          data={stepsData}
          value={stepsValue}
          className='w-full max-w-3xl'
        />
        
        {currentPage === "metadata" 
          ? (
            // Display the metadata form
            <Card className='sm:w-5/6 w-full sm:max-w-3xl max-w-md mx-auto'>
              <CardHeader>
                <CardTitle className='text-center lg:text-2xl text-xl'>Заполните данные</CardTitle>
                <CardDescription className='text-center'>
                  Выберите как вы хотите участвовать:
                  <br/> 
                  <span className='font-semibold'>с докладом</span> или <span className='font-semibold'>без (слушатель) </span>
                  и заполните данные
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetadataForm subscribedSwitch fileId={undefined} imageId={undefined} />
              </CardContent>
            </Card>
          )
          : currentPage === "confirmation"
            ? (
              // Display the Confirmation
              <Confirmation confirmationToken={searchParams?.confirmation} />
            ) : (<>
                {/* Display the initial sign-up form to capture the email and password */}
                <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto'>
                  <CardHeader>
                    <CardTitle className='text-center lg:text-2xl text-xl'>Регистрация</CardTitle>
                    <CardDescription className='text-center'>
                      Регистрируйтесь, чтобы принять участие в Cъезде и получать уведомления
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SignUpForm />
                  </CardContent>
                  <CardFooter className='absolute -bottom-16 w-full flex items-center justify-center gap-1'>
                    <p className='text-sm'>Уже регистрировались?</p>
                    <Link href="/sign-in" passHref className=''>
                      <Button variant="link" className='text-sm font-medium px-1'>
                        Войти
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </>
            )
        }
      </div>
    </main>
  )
}