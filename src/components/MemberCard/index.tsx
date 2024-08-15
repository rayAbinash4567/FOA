// import Image from 'next/image';
// import React from 'react';

// interface MemberCardProps {
//   name: string;
//   companyName: string;
//   companySize: string;
//   location: string;
//   services: string[];
//   imageUrl: string;
//   rating?: number; // Optional rating property
// }

// const MemberCard: React.FC<MemberCardProps> = ({
//   name,
//   companyName,
//   companySize,
//   location,
//   services,
//   imageUrl,
//   rating,
// }) => {
//   return (
//     <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-lg bg-white p-4 pb-8 shadow-card dark:bg-boxdark">
//       <div className="relative">
//         <div className="h-[120px] overflow-hidden rounded">
//           <Image
//             src="https://cdn.tailgrids.com/2.0/image/dashboard/images/profiles/profile-04/cover.jpg"
//             alt="cover"
//             className="h-full w-full object-cover object-center"
//             width={400}
//             height={180}
//           />
//         </div>
//         <div className="relative z-10 mx-auto -mt-[68px] h-[136px] w-full max-w-[136px] overflow-hidden rounded-full bg-white/20 p-2">
//           <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-full bg-white/20 blur-[14px] backdrop-blur"></div>
//           <Image
//             src={imageUrl}
//             alt={`${name} profile`}
//             width={136}
//             height={136}
//             className="h-full w-full rounded-full object-cover object-center"
//           />
//         </div>
//       </div>
//       <div className="mt-3 text-center">
//         <h3 className="text-xl font-semibold text-dark dark:text-white">
//           {name}
//         </h3>
//         <p className="mb-5 text-sm text-body-color dark:text-dark-6">
//           {companyName}
//         </p>
//         <p className="mx-auto mb-6 max-w-[310px] text-sm text-body-color dark:text-dark-6">
//           {companySize}
//         </p>
//         <div className="mb-5 flex items-center justify-center space-x-4">
//           <a
//             href="/#"
//             className="flex h-5 w-5 items-center justify-center text-[#98A6AD] hover:text-primary"
//             aria-label="social-icon"
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//               className="fill-current"
//             >
//               <path d="M10.5 10.125H12.375L13.125 7.125H10.5V5.625C10.5 4.8525 10.5 4.125 12 4.125H13.125V1.605C12.8805 1.57275 11.9572 1.5 10.9822 1.5C8.946 1.5 7.5 2.74275 7.5 5.025V7.125H5.25V10.125H7.5V16.5H10.5V10.125Z" />
//             </svg>
//           </a>
//           <a
//             href="/#"
//             className="flex h-5 w-5 items-center justify-center text-[#98A6AD] hover:text-primary"
//             aria-label="social-icon"
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//               className="fill-current"
//             >
//               <path d="M16.6217 4.24121C16.0491 4.49448 15.4419 4.66082 14.8202 4.73471C15.4755 4.34279 15.966 3.72597 16.2002 2.99921C15.5852 3.36521 14.911 3.62171 14.2082 3.76046C13.7362 3.2554 13.1105 2.92043 12.4284 2.80765C11.7464 2.69487 11.0462 2.81058 10.4367 3.1368C9.82716 3.46302 9.34251 3.98147 9.05806 4.61156C8.7736 5.24164 8.70528 5.94805 8.86372 6.62096C7.61655 6.55845 6.39647 6.23435 5.28269 5.66971C4.1689 5.10507 3.18632 4.3125 2.39872 3.34346C2.11994 3.8223 1.97344 4.36663 1.97422 4.92071C1.97422 6.00821 2.52772 6.96896 3.36922 7.53146C2.87123 7.51578 2.3842 7.3813 1.94872 7.13921V7.17821C1.94887 7.90249 2.1995 8.60442 2.65811 9.16501C3.11672 9.72559 3.75508 10.1103 4.46497 10.254C4.00268 10.3792 3.51795 10.3977 3.04747 10.308C3.24762 10.9314 3.63773 11.4766 4.16317 11.8673C4.6886 12.258 5.32307 12.4746 5.97772 12.4867C5.32708 12.9977 4.5821 13.3754 3.78538 13.5983C2.98866 13.8212 2.15582 13.8849 1.33447 13.7857C2.76825 14.7078 4.43729 15.1973 6.14197 15.1957C11.9117 15.1957 15.067 10.416 15.067 6.27071C15.067 6.13571 15.0632 5.99921 15.0572 5.86571C15.6714 5.42184 16.2014 4.87198 16.6225 4.24196L16.6217 4.24121Z" />
//             </svg>
//           </a>
//           <a
//             href="/#"
//             className="flex h-5 w-5 items-center justify-center text-[#98A6AD] hover:text-primary"
//             aria-label="social-icon"
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//               className="fill-current"
//             >
//               <path d="M5.20508 3.75075C5.20488 4.14857 5.04665 4.53003 4.76521 4.81119C4.48376 5.09235 4.10215 5.2502 3.70433 5.25C3.3065 5.2498 2.92505 5.09157 2.64389 4.81013C2.36272 4.52868 2.20488 4.14707 2.20508 3.74925C2.20528 3.35143 2.3635 2.96997 2.64495 2.68881C2.92639 2.40765 3.308 2.2498 3.70583 2.25C4.10365 2.2502 4.48511 2.40843 4.76627 2.68987C5.04743 2.97132 5.20528 3.35293 5.20508 3.75075ZM5.25008 6.36075H2.25008V15.7507H5.25008V6.36075ZM9.99008 6.36075H7.00508V15.7507H9.96008V10.8232C9.96008 8.07825 13.5376 7.82325 13.5376 10.8232V15.7507H16.5001V9.80325C16.5001 5.17575 11.2051 5.34825 9.96008 7.62075L9.99008 6.36075Z" />
//             </svg>
//           </a>
//           <a
//             href="/#"
//             className="flex h-5 w-5 items-center justify-center text-[#98A6AD] hover:text-primary"
//             aria-label="social-icon"
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//               className="fill-current"
//             >
//               <path d="M14.9918 8.679C14.9303 7.49844 14.5197 6.3627 13.812 5.41575C13.5964 5.64797 13.3659 5.86593 13.122 6.06825C12.3727 6.69064 11.5354 7.19864 10.6373 7.57575C10.7625 7.83825 10.8773 8.0925 10.9785 8.3325V8.33475C11.0071 8.40181 11.0346 8.46932 11.061 8.53725C12.1965 8.40975 13.3935 8.45625 14.5538 8.613C14.7083 8.634 14.8538 8.6565 14.9918 8.679ZM7.953 3.0915C8.6839 4.12138 9.35791 5.19048 9.972 6.294C10.8893 5.9325 11.6475 5.4765 12.258 4.96875C12.4699 4.7941 12.6694 4.60489 12.855 4.4025C11.7757 3.49479 10.4102 2.998 9 3C8.64903 2.99976 8.2987 3.03013 7.953 3.09075V3.0915ZM3.18975 7.49775C3.70067 7.48486 4.21098 7.45409 4.71975 7.4055C5.94948 7.29551 7.16871 7.08938 8.36625 6.789C7.74039 5.70166 7.06467 4.64378 6.34125 3.61875C5.56854 4.00155 4.8872 4.54606 4.34343 5.21534C3.79967 5.88463 3.40622 6.66303 3.18975 7.49775ZM4.33725 12.7763C4.62825 12.351 5.01075 11.8725 5.5185 11.352C6.609 10.2345 7.896 9.3645 9.3855 8.8845L9.432 8.871C9.30825 8.598 9.192 8.35425 9.075 8.12475C7.698 8.526 6.2475 8.7765 4.80225 8.90625C4.09725 8.97 3.465 8.99775 3 9.00225C2.99867 10.3767 3.47122 11.7096 4.338 12.7763H4.33725ZM11.2538 14.5613C10.9645 13.1027 10.5551 11.6706 10.0298 10.2795C8.52825 10.8248 7.332 11.622 6.40725 12.573C6.03405 12.9498 5.70286 13.366 5.4195 13.8143C6.45361 14.5858 7.70976 15.0018 9 15C9.77244 15.0011 10.5378 14.8526 11.2538 14.5628V14.5613ZM12.6585 13.755C13.8295 12.8548 14.6271 11.5543 14.8988 10.1025C14.6438 10.0388 14.3205 9.975 13.965 9.9255C13.1746 9.81168 12.3726 9.80336 11.58 9.90075C12.0263 11.1599 12.3866 12.4478 12.6585 13.7558V13.755ZM9 16.5C4.85775 16.5 1.5 13.1423 1.5 9C1.5 4.85775 4.85775 1.5 9 1.5C13.1423 1.5 16.5 4.85775 16.5 9C16.5 13.1423 13.1423 16.5 9 16.5Z" />
//             </svg>
//           </a>
//         </div>
//         <div className="mb-5 -mx-4 flex items-center justify-center">
//           <div className="border-r border-stroke px-4 dark:border-dark-3">
//             <p className="text-sm text-body-color dark:text-dark-6">
//               <span className="text-base font-semibold text-dark dark:text-white">
//                 {/* {followers} */}
//                 200{' '}
//               </span>
//               Followers
//             </p>
//           </div>
//           <div className="px-4">
//             <p className="text-sm text-body-color dark:text-dark-6">
//               <span className="text-base font-semibold text-dark dark:text-white">
//                 {/* {following} */}
//                 200{' '}
//               </span>
//               Following
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center mt-4 md:mt-6 space-x-4">
//           <a
//             href="#"
//             className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Add friend
//           </a>
//           <a
//             href="#"
//             className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-bodydark2 border border-white rounded-lg hover:border-blue-700 hover:text-neutral-900 focus:ring-4 focus:outline-none dark:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
//           >
//             Message
//           </a>
//         </div>
//       </div>
//     </div>
//     // <div className="rounded-sm  border  border-stroke bg-white  pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
//     //   <div className="flex flex-col items-center pb-10">
//     //     <Image
//     //       className="w-24 h-24 mb-3 rounded-full shadow-lg"
//     //       src={imageUrl}
//     //       alt={`${name} image`}
//     //       width={100}
//     //       height={100}
//     //     />
//     //     <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
//     //       {name}
//     //     </h5>
//     //     <span className="text-sm text-gray-500 dark:text-gray-400">
//     //       {companyName}
//     //     </span>
//     //     <span className="text-sm text-gray-500 dark:text-gray-400">
//     //       {companySize}
//     //     </span>
//     //     <span className="text-sm text-gray-500 dark:text-gray-400">
//     //       {location}
//     //     </span>
//     //     <span className="text-sm text-gray-500 dark:text-gray-400">
//     //       {services.join(', ')}
//     //     </span>
//     //     {rating && (
//     //       <span className="text-sm text-gray-500 dark:text-gray-400">
//     //         {rating} Stars
//     //       </span>
//     //     )}
//     //     <div className="flex mt-4 md:mt-6">
//     //       <a
//     //         href="#"
//     //         className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//     //       >
//     //         Add friend
//     //       </a>
//     //       <a
//     //         href="#"
//     //         className=" mx-4 hover:border hover:text-neutral-900 hover:border-blue-700 items-center px-4 py-2 text-sm font-medium text-center text-bodydark2 border border-zinc-800  rounded-lg focus:ring-4 focus:outline-none  dark:text-white  dark:focus:ring-blue-800"
//     //       >
//     //         Message
//     //       </a>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default MemberCard;

import Image from 'next/image';
import React from 'react';
import { BadgesItem } from '../common/ui/badge';

interface MemberCardProps {
  name: string;
  companyName: string;
  companySize: string;
  location: string;
  services: string[];
  imageUrl: string;
  rating?: number;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  companyName,
  companySize,
  location,
  services,
  imageUrl,
  rating,
}) => {
  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-lg bg-white p-3 shadow-card dark:bg-boxdark">
      <div className="relative">
        <div className="h-[80px] overflow-hidden rounded">
          <Image
            src="https://cdn.tailgrids.com/2.0/image/dashboard/images/profiles/profile-04/cover.jpg"
            alt="cover"
            className="h-full w-full object-cover object-center"
            width={300}
            height={80}
          />
        </div>
        <div className="absolute left-1/2 top-12 z-10 -translate-x-1/2 transform">
          <Image
            src={imageUrl}
            alt={`${name} profile`}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      <div className="mt-14 text-center">
        <h3 className="text-lg font-semibold text-dark dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-body-color dark:text-dark-6">
          {companyName}
        </p>
        <p className="text-xs text-body-color dark:text-dark-6">
          {companySize} | {location}
        </p>
        <p className="mt-2 text-xs text-body-color dark:text-dark-6">
          <BadgesItem roundedFull bgOpacity>
            {services.join(', ')}{' '}
          </BadgesItem>
        </p>
        {rating && (
          <p className="mt-1 text-sm font-semibold text-yellow-500">
            {rating} Stars
          </p>
        )}
        <div className="mt-3 flex justify-center space-x-3">
          {['facebook', 'twitter', 'linkedin', 'dribbble'].map((social) => (
            <a
              key={social}
              href="/#"
              className="text-[#98A6AD] hover:text-primary"
              aria-label={`${social} icon`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                className="fill-current"
              >
                <path d={getSocialIconPath(social)} />
              </svg>
            </a>
          ))}
        </div>
        <div className="mt-3 flex justify-center text-xs">
          <span className="border-r border-stroke px-2 dark:border-dark-3">
            <strong className="text-dark dark:text-white">200</strong> Followers
          </span>
          <span className="px-2">
            <strong className="text-dark dark:text-white">200</strong> Following
          </span>
        </div>
        <div className="mt-3 flex justify-around space-x-2">
          <button className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">
            Add friend
          </button>
          <button className="rounded border border-blue-600 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:text-white dark:hover:bg-blue-900">
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

const getSocialIconPath = (social: string): string => {
  switch (social) {
    case 'facebook':
      return 'M10.5 10.125H12.375L13.125 7.125H10.5V5.625C10.5 4.8525 10.5 4.125 12 4.125H13.125V1.605C12.8805 1.57275 11.9572 1.5 10.9822 1.5C8.946 1.5 7.5 2.74275 7.5 5.025V7.125H5.25V10.125H7.5V16.5H10.5V10.125Z';
    case 'twitter':
      return 'M16.6217 4.24121C16.0491 4.49448 15.4419 4.66082 14.8202 4.73471C15.4755 4.34279 15.966 3.72597 16.2002 2.99921C15.5852 3.36521 14.911 3.62171 14.2082 3.76046C13.7362 3.2554 13.1105 2.92043 12.4284 2.80765C11.7464 2.69487 11.0462 2.81058 10.4367 3.1368C9.82716 3.46302 9.34251 3.98147 9.05806 4.61156C8.7736 5.24164 8.70528 5.94805 8.86372 6.62096C7.61655 6.55845 6.39647 6.23435 5.28269 5.66971C4.1689 5.10507 3.18632 4.3125 2.39872 3.34346C2.11994 3.8223 1.97344 4.36663 1.97422 4.92071C1.97422 6.00821 2.52772 6.96896 3.36922 7.53146C2.87123 7.51578 2.3842 7.3813 1.94872 7.13921V7.17821C1.94887 7.90249 2.1995 8.60442 2.65811 9.16501C3.11672 9.72559 3.75508 10.1103 4.46497 10.254C4.00268 10.3792 3.51795 10.3977 3.04747 10.308C3.24762 10.9314 3.63773 11.4766 4.16317 11.8673C4.6886 12.258 5.32307 12.4746 5.97772 12.4867C5.32708 12.9977 4.5821 13.3754 3.78538 13.5983C2.98866 13.8212 2.15582 13.8849 1.33447 13.7857C2.76825 14.7078 4.43729 15.1973 6.14197 15.1957C11.9117 15.1957 15.067 10.416 15.067 6.27071C15.067 6.13571 15.0632 5.99921 15.0572 5.86571C15.6714 5.42184 16.2014 4.87198 16.6225 4.24196L16.6217 4.24121Z';
    case 'linkedin':
      return 'M5.20508 3.75075C5.20488 4.14857 5.04665 4.53003 4.76521 4.81119C4.48376 5.09235 4.10215 5.2502 3.70433 5.25C3.3065 5.2498 2.92505 5.09157 2.64389 4.81013C2.36272 4.52868 2.20488 4.14707 2.20508 3.74925C2.20528 3.35143 2.3635 2.96997 2.64495 2.68881C2.92639 2.40765 3.308 2.2498 3.70583 2.25C4.10365 2.2502 4.48511 2.40843 4.76627 2.68987C5.04743 2.97132 5.20528 3.35293 5.20508 3.75075ZM5.25008 6.36075H2.25008V15.7507H5.25008V6.36075ZM9.99008 6.36075H7.00508V15.7507H9.96008V10.8232C9.96008 8.07825 13.5376 7.82325 13.5376 10.8232V15.7507H16.5001V9.80325C16.5001 5.17575 11.2051 5.34825 9.96008 7.62075L9.99008 6.36075Z';
    case 'dribbble':
      return 'M14.9918 8.679C14.9303 7.49844 14.5197 6.3627 13.812 5.41575C13.5964 5.64797 13.3659 5.86593 13.122 6.06825C12.3727 6.69064 11.5354 7.19864 10.6373 7.57575C10.7625 7.83825 10.8773 8.0925 10.9785 8.3325V8.33475C11.0071 8.40181 11.0346 8.46932 11.061 8.53725C12.1965 8.40975 13.3935 8.45625 14.5538 8.613C14.7083 8.634 14.8538 8.6565 14.9918 8.679ZM7.953 3.0915C8.6839 4.12138 9.35791 5.19048 9.972 6.294C10.8893 5.9325 11.6475 5.4765 12.258 4.96875C12.4699 4.7941 12.6694 4.60489 12.855 4.4025C11.7757 3.49479 10.4102 2.998 9 3C8.64903 2.99976 8.2987 3.03013 7.953 3.09075V3.0915ZM3.18975 7.49775C3.70067 7.48486 4.21098 7.45409 4.71975 7.4055C5.94948 7.29551 7.16871 7.08938 8.36625 6.789C7.74039 5.70166 7.06467 4.64378 6.34125 3.61875C5.56854 4.00155 4.8872 4.54606 4.34343 5.21534C3.79967 5.88463 3.40622 6.66303 3.18975 7.49775ZM4.33725 12.7763C4.62825 12.351 5.01075 11.8725 5.5185 11.352C6.609 10.2345 7.896 9.3645 9.3855 8.8845L9.432 8.871C9.30825 8.598 9.192 8.35425 9.075 8.12475C7.698 8.526 6.2475 8.7765 4.80225 8.90625C4.09725 8.97 3.465 8.99775 3 9.00225C2.99867 10.3767 3.47122 11.7096 4.338 12.7763H4.33725ZM11.2538 14.5613C10.9645 13.1027 10.5551 11.6706 10.0298 10.2795C8.52825 10.8248 7.332 11.622 6.40725 12.573C6.03405 12.9498 5.70286 13.366 5.4195 13.8143C6.45361 14.5858 7.70976 15.0018 9 15C9.77244 15.0011 10.5378 14.8526 11.2538 14.5628V14.5613ZM12.6585 13.755C13.8295 12.8548 14.6271 11.5543 14.8988 10.1025C14.6438 10.0388 14.3205 9.975 13.965 9.9255C13.1746 9.81168 12.3726 9.80336 11.58 9.90075C12.0263 11.1599 12.3866 12.4478 12.6585 13.7558V13.755ZM9 16.5C4.85775 16.5 1.5 13.1423 1.5 9C1.5 4.85775 4.85775 1.5 9 1.5C13.1423 1.5 16.5 4.85775 16.5 9C16.5 13.1423 13.1423 16.5 9 16.5Z';
    default:
      return '';
  }
};

export default MemberCard;
