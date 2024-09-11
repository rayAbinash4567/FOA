'use client';
import '@/css/satoshi.css';
import '@/css/style.css';
import { useColorMode } from '@/hooks/useColorMode';
import Image from 'next/image';
import Link from 'next/link';
import darkthemeImage from '../../../public/images/logo/pp_black.png';
import lightthemeImage from '../../../public/images/logo/pp_mainlogo.png';

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
  isFullWidth?: boolean | null;
}) {
  const [colorMode] = useColorMode();

  return (
    <div className="min-h-screen flex justify-center items-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-center items-center w-full">
        <div className="hidden w-full xl:block md:w-1/3 px-2">
          <div className="px-26 py-17.5 text-center">
            <Link href="/" className="mb-5.5 flex justify-center items-center">
              <Image
                src={colorMode === 'light' ? lightthemeImage : darkthemeImage}
                alt="My image"
                width={180}
                height={30}
              />
            </Link>
            <p className="2xl:px-10 font-satoshi dark:text-white">
              Unlock growth together: Join Pinnacle Partnerships, the &quot;best
              in class&quot; real estate transactions and investment service
              providers.
            </p>
            <span className="mt-15 inline-block">{/* SVG content */}</span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark md:w-2/3 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">{children}</div>
        </div>
      </div>
    </div>
  );
}
