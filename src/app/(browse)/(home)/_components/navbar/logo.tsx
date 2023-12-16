import Image from 'next/image'
import Link from 'next/link'
import { Outfit } from 'next/font/google'
const font = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export function Logo() {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-md p-1">
          <Image
            src="/foa12.jpeg"
            alt="foa-alt-image"
            height={90}
            width={120}
          />
        </div>
      </div>
    </Link>
  )
}
