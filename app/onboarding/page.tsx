import MetadataForm from '@/components/froms/MetadataForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Database, LogIn } from 'lucide-react'
import React from 'react'
import Steps from '../sign-up/[[...sign-up]]/Steps'

export default function OnBoarding() {

    const stepsData = [
        {title: "Регистрация", active: true, children: <LogIn className='w-5 h-5' />},
        {title: "Верификация", active: true, children: <Check className='w-5 h-5' />},
        {title: "Данные", active: true, children: <Database className='w-5 h-5' />}
    ]

    return (
        <div className="w-full flex min-h-screen max-w-screen-xl mx-auto flex-col items-center gap-16 md:pt-12 pt-6">
            <Steps
                data={stepsData}
                value={100}
                className='w-full max-w-3xl'
            />

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
        </div>
    )
}
