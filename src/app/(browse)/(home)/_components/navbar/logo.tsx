import useColorMode from '@/hooks/useColorMode';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const font = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export function Logo() {
  const [colorMode] = useColorMode();
  const imageUrl = colorMode === 'darkMode' ? '/fo.jpeg' : '/pp_mainlogo.png'; //
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-md p-1">
          <Image src={imageUrl} alt="foa-alt-image" height={20} width={90} />
        </div>
      </div>
    </Link>
  );
}
