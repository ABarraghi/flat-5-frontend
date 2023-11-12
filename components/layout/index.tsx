import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.svg';
import LogoHome from '@/public/images/logo-home-new.svg';
import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

const Layout = ({
  children,
  isHome,
}: {
  children: React.ReactNode;
  data?: {
    userInfo?: Record<string, any>;
  };
  isHome?: boolean;
}) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className={cn(isHome ? 'fixed z-10 w-full' : 'border-grey w-full p-2 text-center')}>
        <div
          className={cn(
            'top-1 rounded-xl px-5 py-2 md:px-0',
            isHome ? 'bg-transparent text-white' : 'bg-white text-black',
          )}
        >
          <div className="m-auto grid w-full grid-cols-2 px-5">
            <Link href="/" className="w-fit">
              <Image src={isHome ? LogoHome : LogoImage} alt="logo" />
            </Link>
            <div className="flex items-center justify-end gap-4">
              <Link href="/about" className="h-fit">
                About
              </Link>
              <Link href="/register" className="h-fit">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className={cn('flex w-full flex-col gap-5 pb-20', isHome ? '' : 'overflow-y-auto p-2')}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
