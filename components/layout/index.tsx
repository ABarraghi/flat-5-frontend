import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.svg';
import LogoHome from '@/public/images/logo-home-new.svg';
import React, { useState } from 'react';
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
    <>
      <header className={cn('fixed w-full', isHome && 'z-10')}>
        <div
          className={cn(
            'top-1 m-5 rounded-xl px-10 px-4 px-5 py-2 md:px-0',
            isHome ? 'bg-transparent text-white' : 'bg-white text-black',
          )}
        >
          <div className="m-auto grid w-full grid-cols-2 px-10">
            <div className="text-left">
              <Link href="/">
                <Image src={isHome ? LogoHome : LogoImage} alt="" />
              </Link>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Link href="/about" className="h-fit">
                About
              </Link>
              <Link href="/register" className="h-fit">
                Login
              </Link>
            </div>
            {/* {data?.userInfo ? ( */}
            {/*  <div className=""> */}
            {/*    <div className="flex justify-end gap-2 items-center relative"> */}
            {/*      <AvatarCircleIcon className="w-10 h-10 cursor-pointer" /> */}
            {/*      <span */}
            {/*        className=" cursor-pointer flex items-center hover:underline" */}
            {/*        onClick={() => setShowAccountDropdown(!isShowAccountDropdown)} */}
            {/*      > */}
            {/*        {data?.userInfo?.profile?.firstName}{' '} */}
            {/*        {data?.userInfo?.profile?.lastName} */}
            {/*        <svg */}
            {/*          className="w-4 h-4 ml-2" */}
            {/*          aria-hidden="true" */}
            {/*          fill="none" */}
            {/*          stroke="currentColor" */}
            {/*          viewBox="0 0 24 24" */}
            {/*          xmlns="http://www.w3.org/2000/svg" */}
            {/*        > */}
            {/*          <path */}
            {/*            strokeLinecap="round" */}
            {/*            strokeLinejoin="round" */}
            {/*            strokeWidth="2" */}
            {/*            d="M19 9l-7 7-7-7" */}
            {/*          ></path> */}
            {/*        </svg> */}
            {/*      </span> */}
            {/*      <div */}
            {/*        id="dropdown" */}
            {/*        className={`z-10 absolute top-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${ */}
            {/*          isShowAccountDropdown ? 'block' : 'hidden' */}
            {/*        }`} */}
            {/*        // style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(266px, 70px, 0px);" */}
            {/*        data-popper-placement="bottom" */}
            {/*      > */}
            {/*        <ul */}
            {/*          className="py-2 text-sm" */}
            {/*          aria-labelledby="dropdownDefaultButton" */}
            {/*        > */}
            {/*          <li> */}
            {/*            <Link */}
            {/*              href="/sign-out" */}
            {/*              className="block px-4 py-2 hover:bg-gray-100 " */}
            {/*            > */}
            {/*              Sign out */}
            {/*            </Link> */}
            {/*          </li> */}
            {/*        </ul> */}
            {/*      </div> */}
            {/*    </div> */}
            {/*  </div> */}
            {/* ) : ( */}
            {/*  <div className="flex justify-end gap-4 items-center"> */}
            {/*    <Link href="/sign-in" className="h-fit"> */}
            {/*      About */}
            {/*    </Link> */}
            {/*    <Link href="/register" className="h-fit"> */}
            {/*      Login */}
            {/*    </Link> */}
            {/*  </div> */}
            {/* )} */}
          </div>
        </div>
      </header>
      <div className={cn('flex h-[100vh] w-full flex-col items-center gap-5 pb-20', isHome ? '' : 'pt-20')}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
