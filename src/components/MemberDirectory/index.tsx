// 'use client';
// import MemberCard from '@/components/MemberCard';
// import MemberFilter from '@/components/MemberFilter';
// import Pagination from '@/components/Pagination';
// import React, { useEffect, useState } from 'react';
// import Breadcrumb from '../Breadcrumbs/Breadcrumb';

// interface MemberCardData {
//   id: string;
//   name: string;
//   vocation: string;
//   companyName: string;
//   companySize: string;
//   city: string;
//   imageUrl: string;
// }

// const MemberDirectory: React.FC = () => {
//   const [initialMembers, setInitialMembers] = useState<MemberCardData[]>([]);
//   const [filteredMembers, setFilteredMembers] = useState<MemberCardData[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [membersPerPage] = useState(8);

//   useEffect(() => {
//     // Fetch data from API or other source
//     async function fetchData() {
//       try {
//         const response = await fetch('/api/v1/member'); // Replace with your data source
//         const data = await response.json();
//         setInitialMembers(data);
//         setFilteredMembers(data);
//       } catch (error) {
//         console.error('Failed to fetch members:', error);
//       }
//     }
//     // revalidatePath('/dashboard/memberdirectory');

//     fetchData();
//   }, []);

//   const handleFilterChange = (filters: Partial<MemberCardData>) => {
//     const newFilteredMembers = initialMembers.filter((member) =>
//       Object.entries(filters).every(([key, value]) => {
//         const memberValue = member[key as keyof MemberCardData];
//         if (Array.isArray(memberValue)) {
//           return memberValue.some((v) =>
//             v.toLowerCase().includes((value as string).toLowerCase())
//           );
//         }
//         return memberValue
//           .toString()
//           .toLowerCase()
//           .includes((value as string).toLowerCase());
//       })
//     );
//     setFilteredMembers(newFilteredMembers);
//     setCurrentPage(1);
//   };

//   const indexOfLastMember = currentPage * membersPerPage;
//   const indexOfFirstMember = indexOfLastMember - membersPerPage;
//   const currentMembers =
//     filteredMembers?.slice(indexOfFirstMember, indexOfLastMember) || [];

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <div className="mx-auto max-w-7xl">
//       <Breadcrumb pageName="Directory" />
//       <MemberFilter
//         onFilterChange={handleFilterChange}
//         allMembers={initialMembers}
//       />

//       <div className="grid mt-8 grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {currentMembers.map((member) => (
//           <MemberCard
//             key={member.id}
//             name={member.name}
//             vocation={member.vocation}
//             companyName={member.companyName}
//             companySize={member.companySize}
//             city={member.city}
//             imageUrl={member.imageUrl}
//           />
//         ))}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(filteredMembers?.length / membersPerPage)}
//         onPageChange={paginate}
//       />
//     </div>
//   );
// };

// export default MemberDirectory;

// app/dashboard/memberdirectory/page.tsx

// components/MemberFilter.tsx

// app/dashboard/memberdirectory/page.tsx

// app/dashboard/memberdirectory/page.tsx
// components/MemberFilter.tsx

'use client';

import MemberCard from '@/components/MemberCard';
import MemberFilter from '@/components/MemberFilter';
import Pagination from '@/components/Pagination';
import { fetchMembers } from '@/lib/actions/member.actions'; // Adjust the import path accordingly
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Loader from '../common/Loader';

interface MemberCardData {
  id: string;
  name: string;
  vocation: string;
  companyName: string;
  companySize: string;
  city: string;
  imageUrl: string;
}

const MemberDirectory: React.FC = () => {
  const [initialMembers, setInitialMembers] = useState<MemberCardData[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberCardData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMembers();
        setInitialMembers(data);
        setFilteredMembers(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch members:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleFilterChange = (filters: Partial<MemberCardData>) => {
    const newFilteredMembers = initialMembers.filter((member) =>
      Object.entries(filters).every(([key, value]) => {
        const memberValue = member[key as keyof MemberCardData];
        if (Array.isArray(memberValue)) {
          return memberValue.some((v) =>
            v.toLowerCase().includes((value as string).toLowerCase())
          );
        }
        return memberValue
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
      })
    );
    setFilteredMembers(newFilteredMembers);
    setCurrentPage(1);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers =
    filteredMembers?.slice(indexOfFirstMember, indexOfLastMember) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Directory" />

      {loading && (
        <>
          <Loader />
        </>
      )}

      <MemberFilter
        onFilterChange={handleFilterChange}
        allMembers={initialMembers}
      />

      <div className="grid mt-8 grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentMembers.map((member) => (
          <MemberCard
            key={member.id}
            name={member.name}
            vocation={member.vocation}
            companyName={member.companyName}
            companySize={member.companySize}
            city={member.city}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredMembers?.length / membersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default MemberDirectory;
