import React from 'react'
import Logo from './header/Logo'
import Contacts from './Contacts';
import FormFooter from './FormFooter';

export default function Footer() {
    return (
        <footer className="flex lg:flex-row flex-col justify-between items-center sm:gap-12 gap-6 p-10 bg-background border-t mt-12">
            <aside className='flex flex-col justify-center items-center gap-3'>
                <Logo className='w-20 h-20' />

                <h1 className="font-bold text-lg leading-5 tracking-tighter text-center">
                    VII (XXIII) Всероссийский
                    <strong className="font-bold text-primary block">Aрхеологический Cъезд</strong>
                </h1>
            </aside> 
            <FormFooter />
            <Contacts />
        </footer>
    )
}
