'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import SignUpForm from '../../../components/froms/SignUpForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import VerifyForm from '@/components/froms/VerifyForm';
import Steps from './Steps';
import { Check, Database, LogIn } from 'lucide-react';
import MetadataForm from '@/components/froms/MetadataForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignUpContent() {
  const { isLoaded, signUp } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [metadata, setMetadata] = React.useState(false);

  const stepsData = [
    {title: "Регистрация", active: true, children: <LogIn className='w-5 h-5' />},
    {title: "Верификация", active: verifying, children: <Check className='w-5 h-5' />},
    {title: "Данные", active: metadata, children: <Database className='w-5 h-5' />}
  ]

  const stepsValue = metadata 
    ? 100
    : verifying
      ? 50
      : 5

  return (
    <div className="w-full flex min-h-screen max-w-screen-xl mx-auto flex-col items-center gap-16 md:pt-12 pt-6">
      <Steps
        data={stepsData}
        value={stepsValue}
        className='w-full max-w-3xl'
      />
      
      {metadata 
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
              <MetadataForm />
            </CardContent>
          </Card>
        )
        : verifying
          ? (
            // Display the verification form to capture the OTP code
            <Card className='sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto'>
              <CardHeader>
                <CardTitle className='text-center lg:text-2xl text-xl'>Подтвердите Ваш Email</CardTitle>
                <CardDescription className='text-center'>
                  Введите код верификации, отправленный на Вашу почту 
                  {(isLoaded && signUp.emailAddress) && (
                    <span className='font-medium'>{`(${signUp.emailAddress})`}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VerifyForm setMetadata={setMetadata} />
              </CardContent>
            </Card>
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
                  <SignUpForm setVerifying={setVerifying} />
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
  )
}
