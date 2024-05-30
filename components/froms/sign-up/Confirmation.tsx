"use client"

import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import AuthError from '@/components/errors/AuthError'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { confirmEmailAction } from '@/app/actions';
import { Button } from '../../ui/button';
import { translateError } from '@/lib/utils';
import NewConfirmRequestForm from './NewConfirmRequestForm';
import SignInForm from '../sign-in/SignInForm';
import { Loader2 } from 'lucide-react';

type Props = {
  confirmationToken?: string;
};

export default function Confirmation({ confirmationToken }: Props) {
  const [confirming, setConfirming] = useState(true)
  const [error, setError] = useState<Error>()
  const [newConfirmRequest, setNewConfirmRequest] = useState(false)

  useEffect(() => {
    if (confirmationToken && confirmationToken.length > 1) {
      toast.promise(confirmEmailAction(confirmationToken), {
        loading: 'Проверяем пользователя...',
        success: () => {
          setConfirming(false)
          return `Успешно!`;
        },
        error: (err) => {
          setConfirming(false)
          setError(err as Error)
          return <AuthError data={err as Error} />
        }
      });
    }
  }, [confirmationToken])

  if (newConfirmRequest) return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Запрос на подтверждение</CardTitle>
        <CardDescription className='text-center'>
          Запросить новое электронное письмо с подтверждением
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NewConfirmRequestForm setNewConfirmRequest={setNewConfirmRequest} />
      </CardContent>
    </Card>
  )

  if (!confirmationToken || confirmationToken === '') return (
    <div className=''>
      <Card className='sm:w-5/6 w-full sm:max-w-3xl max-w-md mx-auto'>
        <CardHeader>
          <CardTitle className='text-center lg:text-2xl text-xl'>Подтвердите Ваш Email</CardTitle>
          <CardDescription className='text-center'>
            Мы отправили вам письмо с ссылкой для подтверждения.
          </CardDescription>
        </CardHeader>
        <CardContent className='w-full sm:max-w-lg max-w-md mx-auto'>
          <p>Чтобы подтвердить свою учетную запись перейдите по ссылке в письме.</p>

          <div className='text-sm text-left'>
            <h3 className='font-medium text-sm mt-6 mb-1'>Не нашли письмо?</h3>
            <p className='text-xs text-muted-foreground'>
              Если вы не получили электронное письмо со ссылкой для подтверждения, пожалуйста, проверьте
              папку со спамом или подождите пару минут.
            </p>

            <h3 className='font-medium text-sm mt-3'>
              По-прежнему нет письма?{" "}
              <Button variant="link" className='p-0 m-0' onClick={() => setNewConfirmRequest(true)}>
                Запросить новое
              </Button>
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (confirming) return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Проверяем пользователя...</CardTitle>
        <CardDescription className='text-center flex flex-col items-center justify-center gap-2'>
          Пожалуйста, подождите
          <Loader2 className=' animate-spin transition-all w-8 h-8'/>
        </CardDescription>
      </CardHeader>
    </Card>
  )

  if (error) return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Ошибка</CardTitle>
        <CardDescription className='text-center'>
          {translateError(error.name, error.message)}
        </CardDescription>
      </CardHeader>
      <CardContent>
          <Button variant="link" onClick={() => setNewConfirmRequest(true)}>
            Запросить новое письмо
          </Button>
      </CardContent>
    </Card>
  )

  return (
    <Card className='relative sm:w-5/6 w-full sm:max-w-md max-w-sm mx-auto mt-20'>
      <CardHeader>
        <CardTitle className='text-center lg:text-2xl text-xl'>Вход</CardTitle>
        <CardDescription className='text-center'>
          Войдите чтобы продолжить
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
