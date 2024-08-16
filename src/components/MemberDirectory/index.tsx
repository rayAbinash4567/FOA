'use client';

import MemberCard from '@/components/MemberCard';
import MemberFilter from '@/components/MemberFilter';
import Pagination from '@/components/Pagination';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Loader from '../common/Loader';

interface MemberCardData {
  id: string;
  name: string;
  vocation: string[] | string;
  companyName: string;
  companySize: string;
  city: string;
  imageUrl: string;
}

const MemberDirectory: React.FC = () => {
  const [allMembers, setAllMembers] = useState<MemberCardData[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberCardData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/v1/member');

        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setAllMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleFilterChange = (filters: Partial<MemberCardData>) => {
    const newFilteredMembers = allMembers.filter((member) =>
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
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Directory" />
      <MemberFilter
        onFilterChange={handleFilterChange}
        allMembers={allMembers}
      />

      <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        totalPages={Math.ceil(filteredMembers.length / membersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default MemberDirectory;
