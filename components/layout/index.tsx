import { type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import Footer from '@/components/layout/Footer';

const Layout = ({ children, isHome = false }: { children: ReactNode; isHome?: boolean }) => {
  return (
    <div className={cn('flex h-screen flex-col', !isHome && 'overflow-hidden')}>
      <header className={cn(isHome ? 'fixed z-10 w-full' : 'border-grey w-full p-2 text-center')}>
        <div
          className={cn(
            'top-1 rounded-xl px-2 py-2 md:px-8 md:py-[14px]',
            isHome ? 'bg-transparent text-white' : 'bg-white text-black',
          )}
        >
          <div className="m-auto grid w-full grid-cols-2 px-2 md:px-5">
            <Link href="/" className="w-fit">
              <Image
                src={isHome ? '/images/logo-home-new.svg' : '/images/logo.svg'}
                width={134}
                height={40}
                alt="logo"
              />
            </Link>
            <div className="flex items-center justify-end gap-14 text-[12px] md:text-base">
              <Link href="#" className="h-fit">
                About
              </Link>
              <Link href="/bookings" className="h-fit">
                My bookings
              </Link>
              <Link href="/login" className="h-fit">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className={cn('flex w-full flex-col gap-5 overflow-scroll pb-20', !isHome && 'p-2')}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
