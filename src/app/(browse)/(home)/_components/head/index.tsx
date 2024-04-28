'use client';
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher';
import DropdownMessage from '@/components/Header/DropdownMessage';
import DropdownNotification from '@/components/Header/DropdownNotification';
import DropdownUser from '@/components/Header/DropdownUser';
import { useUser } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../../../../../components/ui/button';
import { Logo } from '../navbar/logo';
import { NavMenu } from '../navbar/menu';
const Head = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Logo always visible */}
        <Logo />
        {/* Search form */}
        {/* <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button
                type="submit"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 3C4.91 3 2 5.91 2 9.5S4.91 16 8.5 16C10.43 16 12.13 15.1 13.25 13.75L18.59 19.09L20 17.67L14.66 12.33C15.9 10.75 16.5 8.78 16.5 6.5C16.5 3.57 13.93 1 11 1C9.28 1 7.76 1.81 6.75 3.09C6.5 2.83 6.28 2.58 6 2.42V2C6 1.45 5.55 1 5 1S4 1.45 4 2V2.42C3.72 2.58 3.5 2.83 3.25 3.09C3.75 2.38 4.5 2 5.5 2H6C6.55 2 7 2.45 7 3V3.08C7.16 3.04 7.33 3 7.5 3H8.5ZM8.5 5H7.5C7.22 5 7 5.22 7 5.5V7.5H5C4.72 7.5 4.5 7.72 4.5 8V8.5C4.5 8.78 4.72 9 5 9H7V11C7 11.28 7.22 11.5 7.5 11.5H8C8.28 11.5 8.5 11.28 8.5 11V9H11C11.28 9 11.5 8.78 11.5 8.5V8C11.5 7.72 11.28 7.5 11 7.5H8.5V5.5C8.5 5.22 8.28 5 8 5H8.5Z"
                    fill=""
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div> */}
        <NavMenu />
        {/* Right-aligned actions */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownMessage />
          </ul>
          {isSignedIn ? (
            <div className="w-2/4 h-2/4">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex justify-center items-center p-4 m-2">
              <div className="px-4">
                <Link href="/sign-in">Login</Link>
              </div>
              <div>
                <Link href="/sign-up">
                  <Button variant="secondary">Sign Up</Button>
                </Link>
              </div>
            </div>
          )}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Head;
