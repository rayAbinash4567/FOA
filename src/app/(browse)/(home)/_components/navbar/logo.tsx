'use client';
import useColorMode from '@/hooks/useColorMode';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const font = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export function Logo() {
  const [colorMode] = useColorMode();
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    // Delay setting the image URL until we are client-side and have a valid color mode
    if (typeof window !== 'undefined' && colorMode) {
      setImageUrl(
        colorMode === 'dark'
          ? '/images/logo/pp_black.png'
          : '/images/logo/pp_mainlogo.png'
      );
    }
  }, [colorMode, imageUrl]);

  return (
    <Link href="/">
      <div className=" items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-md p-1">
          {imageUrl && (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt="Logo"
              width={80}
              height={30}
              priority // Helps with the loading behavior
            />
          )}
        </div>
      </div>
    </Link>
  );
}
