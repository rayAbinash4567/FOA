// 'use client';
// import MemberCard from '@/components/MemberCard';
// import MemberFilter from '@/components/MemberFilter';
// import { members } from '@/db/temp';
// import React, { useState } from 'react';
// import Breadcrumb from '../Breadcrumbs/Breadcrumb';

// const MemberDirectory: React.FC = () => {
//   const [filteredMembers, setFilteredMembers] = useState(members);
//   console.log('Members:', filteredMembers);

//   const handleFilterChange = (filters: any) => {
//     setFilteredMembers(
//       members.filter((member) =>
//         Object.keys(filters).every(
//           (key) =>
//             member[key as keyof typeof member]
//               ?.toString()
//               .toLowerCase()
//               .includes(filters[key])
//         )
//       )
//     );
//   };

//   return (
//     <div className="mx-auto max-w-7xl">
//       <Breadcrumb pageName="Directory" />
//       <MemberFilter onFilterChange={handleFilterChange} />

//       <div className="grid  mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {filteredMembers.map((member) => (
//           <MemberCard
//             key={member.id}
//             name={member.name}
//             companyName={member.companyName}
//             companySize={member.companySize}
//             location={member.location}
//             services={member.services}
//             imageUrl={member.imageUrl}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MemberDirectory;

'use client';
import MemberCard from '@/components/MemberCard';
import MemberFilter from '@/components/MemberFilter';
import Pagination from '@/components/Pagination';
import { members } from '@/db/temp';
import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const MemberDirectory: React.FC = () => {
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(8);

  const handleFilterChange = (filters: any) => {
    const newFilteredMembers = members.filter((member) =>
      Object.keys(filters).every(
        (key) =>
          member[key as keyof typeof member]
            ?.toString()
            .toLowerCase()
            .includes(filters[key])
      )
    );
    setFilteredMembers(newFilteredMembers);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Get current members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Directory" />
      <MemberFilter onFilterChange={handleFilterChange} />

      <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentMembers.map((member) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredMembers.length / membersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default MemberDirectory;
