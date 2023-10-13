import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import LogoImage from '@/public/images/logo.svg'
import LogoHome from '@/public/images/logo-home-new.svg'
import React, { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'

const Layout = ({
  data,
  children,
  isHome,
}: {
  children: React.ReactNode
  data?: {
    userInfo?: Record<string, any>
  }
  isHome?: boolean
}) => {
  const [isShowAccountDropdown, setShowAccountDropdown] = useState(false)
  return (
    <>
      <header className={cn('fixed w-full', isHome && 'z-10')}>
        <div
          className={cn(
            'px-5 py-2 m-5 top-1 md:px-0 px-4 px-10 rounded-xl',
            isHome ? 'bg-transparent text-white' : 'bg-white text-black',
          )}
        >
          <div className="w-full m-auto grid grid-cols-2 px-10">
            <div className="text-left">
              <Link href="/">
                <Image src={isHome ? LogoHome : LogoImage} alt="" />
              </Link>
            </div>
            <div className="flex justify-end gap-4 items-center">
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
      <div className={cn('flex h-[100vh] pb-20 w-full flex-col items-center gap-5', isHome ? '' : 'pt-20')}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
