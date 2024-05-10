"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import NavMenu from './NavMenu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Logo from './Logo'
import NavSheet from './NavSheet'

export default function Header() {

    const [sticky, setSticky] = useState(true)
    const [shadow, setShadow] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);

    const stickyHeader = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])


    useLayoutEffect(() => {
        const fixedHeader = () => {
            if (scrollPosition > 22) {
              setShadow(true)
            } else {
              setShadow(false)
            }
        }

        window.addEventListener('scroll', fixedHeader)

        return () => {
            window.removeEventListener('scroll', fixedHeader);
        };
    }, [sticky, scrollPosition])

    const handleScrollToTop = () => {
        setSticky(false)
    }

    return (
        <header className='container md:w-5/6 mx-auto'>
            <div 
                ref={stickyHeader} 
                className={cn(
                    " bg-background z-50 py-6 duration-300",
                    sticky ? "fixed w-full top-0 left-1/2 -translate-x-1/2" : "relative -mb-[112px]",
                    shadow ? "py-2 shadow-sm transition-all" : " transition-[padding]"
                )}
            >
                <div className={cn(
                    "relative",
                    sticky ? "container md:w-5/6 w-full" : ""
                )}>
                    {/* Desktop */}
                    <div className='relative lg:flex hidden justify-between'>
                        <Link 
                          href="/#top" 
                          className='' 
                          onClick={handleScrollToTop}
                        >
                            <Logo className='w-12 h-12' />
                        </Link>

                        <NavMenu className='flex-1' />

                        <div className='flex items-center'>
                          MoreMenu
                        </div>
                    </div>
                    {/* Desktop */}

                    {/* Mobile */}
                    <div className='lg:hidden flex items-center justify-between w-full'>
                        <Link href="/#top" onClick={handleScrollToTop}>
                            <Logo className='w-12 h-12' />
                        </Link>

                        <div className='flex items-center gap-3'>
                            MoreMenu
                            <NavSheet className="text-primary" />
                        </div>
                    </div>
                    {/* Mobile */}
                </div>
            </div>
        </header>
    )
}
