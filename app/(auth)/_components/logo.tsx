import { Poppins } from 'next/font/google';
import Image from 'next/image';
const font = Poppins({
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
      <div>Funding Opportunites America</div>
    </div>
  );
}
