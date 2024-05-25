import React from 'react'
import Contacts from '../Contacts';
import FormFooter from './FormFooter';

export default function Footer() {
    return (
        <footer className="flex flex-col justify-between items-center gap-12 p-10 bg-background border-t mt-16">
            {/* <aside className='flex flex-col justify-center items-center gap-3'>
                <Logo className='sm:w-28 w-24 aspect-square' />

                <h1 className="font-bold sm:text-2xl text-xl leading-5 tracking-tighter text-center">
                    VII (XXIII) Всероссийский
                    <strong className="font-bold text-primary block">Aрхеологический Cъезд</strong>
                </h1>
            </aside>  */}
            <div className='w-full flex lg:flex-row flex-col justify-between gap-12'>
                <FormFooter className="flex-1"/>
                <Contacts />
            </div>
        </footer>
    )
}
