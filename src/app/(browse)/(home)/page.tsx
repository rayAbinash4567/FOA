// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className=" relative isolate px-6 lg:px-8">
//       <div
//         className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//         aria-hidden="true"
//       >
//         <div
//           className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] dark:bg-slate-800 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//         />
//       </div>
//       <div className=" mx-auto w-2/3 py-8">
//         <div className=" sm:mb-8 flex justify-center">
//           <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
//             Announcing our new partner.{' '}
//             <a href="#" className="font-semibold text-indigo-600">
//               <span className="absolute inset-0" aria-hidden="true" />
//               Read more <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </div>
//         <div className="text-center">
//           <h1 className="dark:text-gray md:text-5xl  text-center  font-lexend  text-gray-800 text-3xl pt-8">
//             Transactional Support & Partner Marketing Program
//           </h1>
//           <p className=" mt-6 text-lg leading-8 text-gray-600 text-center">
//             Unlock growth together: Join Pinnacle Partnerships to access
//             innovative lead generation solutions and connect with top-tier
//             professionals for optimum real estate transaction outcomes.
//           </p>
//           <div className="mt-10 flex items-center justify-center gap-x-6">
//             <Link href="/sign-up">
//               <Button className="text-white">Get started</Button>
//             </Link>

//             <a
//               href="https://pinnaclepartnerships.com/"
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               Learn more <span aria-hidden="true">→</span>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div
//         className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden dark:bg-slate-800  sm:top-[calc(100%-30rem)]"
//         aria-hidden="true"
//       >
//         <div
//           className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2  bg-gradient-to-tr dark:bg-slate-800 from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative min-h-screen isolate px-6 lg:px-8 flex flex-col">
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
      <div className="mx-auto w-2/3 py-2 mt-16 mb-auto">
        <div className="sm:mb-8 flex justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our new partner.{' '}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="dark:text-gray md:text-5xl text-center font-lexend text-gray-800 text-3xl pt-8">
            Transactional Support & Partner Marketing Program
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
            Unlock growth together: Join Pinnacle Partnerships to access
            innovative lead generation solutions and connect with top-tier
            professionals for optimum real estate transaction outcomes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="text-white">Get started</Button>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
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
  );
}
