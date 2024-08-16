'use client';
import MemberCard from '@/components/MemberCard';
import { myClients } from '@/db/temp';
import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const MyClients: React.FC = () => {
  const [filteredMembers, setFilteredMembers] = useState(myClients);
  console.log('Members:', filteredMembers);

  const handleFilterChange = (filters: any) => {
    setFilteredMembers(
      myClients.filter((member) =>
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
      <Breadcrumb pageName="My Clients" />
      <h2 className=" ">Clients you have worked with before.</h2>
      {/* <MemberFilter onFilterChange={handleFilterChange} /> */}

      <div className="grid  mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            name={member.name}
            companyName={member.companyName}
            companySize={member.companySize}
            city={member.location}
            vocation={member.services}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default MyClients;
