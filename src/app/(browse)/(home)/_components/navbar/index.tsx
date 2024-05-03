'use client';
import { useUser } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../../../../../components/ui/button';
import { Logo } from './logo';
import { NavMenu } from './menu';
const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }
  return (
    <nav className="fixed top-0 w-full h-24 z-[49] px-2 lg:px-4 flex items-center shadow-sm">
      <div className="flex flex-grow items-center justify-start w-1/5">
        {' '}
        {/* 20% width */}
        <Logo />
      </div>
      <div className="flex flex-grow items-center justify-center w-3/5">
        {' '}
        {/* 60% width */}
        <NavMenu />
      </div>
      <div className="flex flex-grow items-center justify-end w-1/5">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
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
      </div>
    </nav>
  );
};

export default Navbar;
