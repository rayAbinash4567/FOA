// 'use client';
import { useColorMode } from '@/hooks/useColorMode';
import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
const font = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export function Logo() {
  const [colorMode] = useColorMode();
  console.log(colorMode);
  const imageUrl =
    colorMode === 'dark'
      ? '/public/images/logo/pp_black.png'
      : '/public/images/logo/pp_mainlogo.png';
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white  p-1">
        <Image src={imageUrl} alt="foa-alt-image" height={30} width={90} />
      </div>
      <div className={cn('flex flex-col items-center ', font.className)}>
        <p className="text-xl font-semibold">Pinnacle Partnerships </p>
        <p className="text-sm text-muted-foreground">
          Welcome to &quot;best in class&quot; real estate transactions and
          investment service providers
        </p>
      </div>
    </div>
  );
}
