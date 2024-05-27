'use client';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import Link from 'next/link';
import Footer from './_components/Footer';

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <>
      <div className="relative dark:bg-slate-800 min-h-screen isolate px-6 lg:px-8 flex flex-col">
        {/* Background SVG at the top */}
        <div
          className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] dark:bg-slate-800 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* Main content */}
        <div className="dark:bg-black rounded-md p-4 m-4 mx-auto w-2/3 py-2 mt-16 mb-auto">
          <div className="sm:mb-8 flex justify-center pt-6 ">
            <div className="relative rounded-full p-4 m-4 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our new partner.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="dark:text-gray p-2 m-2 md:text-5xl text-center  text-gray-800 text-3xl pt-8">
              Transactional Support & Partner Marketing Program
            </h1>
            <p className="mt-6 font-satoshi text-lg leading-8 text-gray-600 text-center">
              Unlock growth together: Join Pinnacle Partnerships to access
              innovative lead generation solutions and connect with top-tier
              professionals for optimum real estate transaction outcomes.
            </p>
            <div className="mt-10 flex p-2 m-2 items-center justify-center gap-x-6">
              <Link href="/dashboard">
                <Button className="text-white">
                  {isSignedIn ? 'Go to Dashboard' : 'Get Started'}
                </Button>
              </Link>
              <a
                href="#"
                className="text-sm font-semibold p-4 m-4 leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Background SVG at the bottom */}
        <div
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden dark:bg-slate-800"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr dark:bg-slate-800 from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
