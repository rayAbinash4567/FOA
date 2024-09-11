'use client';
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher';
import DropdownMessage from '@/components/Header/DropdownMessage';
import DropdownNotification from '@/components/Header/DropdownNotification';
import DropdownUser from '@/components/Header/DropdownUser';
import Loader from '@/components/common/Loader';
import { useColorMode } from '@/hooks/useColorMode';
import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import darkthemeImage from '../../../../../../public/images/logo/pp_black.png';
import lightthemeImage from '../../../../../../public/images/logo/pp_mainlogo.png';
import { Button } from '../../../../../components/ui/button';
import { NavMenu } from './menu';

const Head = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [colorMode] = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  if (!isLoaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <header
      className={`sticky top-0 z-999 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-sm dark:bg-boxdark/80'
          : 'bg-transparent dark:bg-boxdark dark:border-0'
      }`}
    >
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-6 2xl:px-11">
        <div className="flex items-center">
          <Image
            src={colorMode === 'light' ? lightthemeImage : darkthemeImage}
            height={30}
            width={80}
            className="object-cover"
            alt="Pinnacle Partnerships Logo"
          />
        </div>

        {/* Hamburger menu for mobile and medium devices */}
        <button className="lg:hidden" onClick={toggleMobileMenu}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={
                mobileMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M3 12H21M3 6H21M3 18H21'
              }
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Navigation menu for large devices */}
        <div className="hidden lg:block">
          <NavMenu />
        </div>

        {/* Right-aligned actions */}
        <ul className="flex items-center list-none gap-3  2xsm:gap-7">
          <DarkModeSwitcher />
          {isSignedIn ? (
            <ul className="flex items-center list-none space-x-4">
              <DropdownNotification />
              <DropdownMessage />
              <DropdownUser />
            </ul>
          ) : (
            <div className="flex justify-center items-center font-satoshi">
              <Link
                href="/sign-in"
                className="px-4 hover:text-primary dark:text-white "
              >
                Login
              </Link>
              <Link href="/sign-up">
                <Button variant="default" className="text-white px-4">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-boxdark p-4">
          <nav>
            <ul className="space-y-4 list-none">
              <li>
                <Link href="/" className="block hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="block hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/hire-partner" className="block hover:text-primary">
                  Hire Partner
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Head;
