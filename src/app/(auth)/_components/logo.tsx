import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
const font = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white  p-1">
        <Image
          src="/foa-logo.jpeg"
          alt="foa-alt-image"
          height={150}
          width={150}
        />
      </div>
      <div className={cn('flex flex-col items-center ', font.className)}>
        <p className="text-xl font-semibold">Funding Opportunities America </p>
        <p className="text-sm text-muted-foreground">
          FINDING OPTIONS FOR YOUR OPTIMUM MORTGAGE !
        </p>
      </div>
    </div>
  );
}
