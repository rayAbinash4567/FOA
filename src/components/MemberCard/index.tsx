import Image from 'next/image';
import React from 'react';

interface MemberCardProps {
  name: string;
  companyName: string;
  companySize: string;
  location: string;
  services: string[];
  imageUrl: string;
  rating?: number; // Optional rating property
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
    <div className="rounded-sm  border  border-stroke bg-white  pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
      <div className="flex flex-col items-center pb-10">
        <Image
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={imageUrl}
          alt={`${name} image`}
          width={100}
          height={100}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {companyName}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {companySize}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {location}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {services.join(', ')}
        </span>
        {rating && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {rating} Stars
          </span>
        )}
        <div className="flex mt-4 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </a>
          <a
            href="#"
            className=" mx-4 hover:border hover:text-neutral-900 hover:border-blue-700 items-center px-4 py-2 text-sm font-medium text-center text-bodydark2 border border-zinc-800  rounded-lg focus:ring-4 focus:outline-none  dark:text-white  dark:focus:ring-blue-800"
          >
            Message
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
