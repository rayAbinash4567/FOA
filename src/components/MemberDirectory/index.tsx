'use client';
import MemberCard from '@/components/MemberCard';
import MemberFilter from '@/components/MemberFilter';
import { members } from '@/db/temp';
import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const MemberDirectory: React.FC = () => {
  const [filteredMembers, setFilteredMembers] = useState(members);
  console.log('Members:', filteredMembers);

  const handleFilterChange = (filters: any) => {
    setFilteredMembers(
      members.filter((member) =>
        Object.keys(filters).every(
          (key) =>
            member[key as keyof typeof member]
              ?.toString()
              .toLowerCase()
              .includes(filters[key])
        )
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Directory" />
      <MemberFilter onFilterChange={handleFilterChange} />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              name={member.name}
              companyName={member.companyName}
              companySize={member.companySize}
              location={member.location}
              services={member.services}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDirectory;
