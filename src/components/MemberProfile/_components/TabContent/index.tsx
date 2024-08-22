'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUser } from '@clerk/clerk-react';
import React, { Suspense, useMemo, useState } from 'react';
import AnimatedExpandButton from '../AnimatedButton';
import PartnerStatistics from '../PartnerStatistics';
import CustomerReview3 from '../Reviews';
import RoomTable from '../RoomTable';

type TabCategory = 'tc-history' | 'pc-history' | 'statistics' | 'reviews';

interface TabContentProps {
  open: TabCategory;
}

export const TabContent: React.FC<TabContentProps> = ({ open }) => {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);

  const clerkUser = user?.emailAddresses[0]?.emailAddress;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderExpandButton = () => (
    <div className="relative w-full flex justify-center">
      <div className="absolute -bottom-6">
        <AnimatedExpandButton isExpanded={isExpanded} onClick={toggleExpand} />
      </div>
    </div>
  );

  const renderScrollArea = (content: React.ReactNode) => (
    <div className="relative pb-8">
      <ScrollArea
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'h-[calc(100vh-200px)]' : 'h-[300px]'
        }`}
      >
        {content}
      </ScrollArea>
      {renderExpandButton()}
    </div>
  );

  const renderTableContent = useMemo(() => {
    switch (open) {
      case 'tc-history':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Last Accessed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Suspense
                fallback={
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading rooms...
                    </TableCell>
                  </TableRow>
                }
              >
                {clerkUser && <RoomTable userEmail={clerkUser} />}
              </Suspense>
            </TableBody>
          </Table>
        );
      case 'pc-history':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PC Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Reason For Participation</TableHead>
                <TableHead>Impact On Industry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PC1</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Market Trends</TableCell>
                <TableCell>Industry Expert</TableCell>
                <TableCell>High</TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        );
      case 'statistics':
        return <PartnerStatistics />;
      case 'reviews':
        return <CustomerReview3 />;
      default:
        return null;
    }
  }, [open, clerkUser]);

  if (!user) return null;

  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h3 className="text-xl font-semibold mb-4">
        {open === 'tc-history'
          ? 'Transaction Committee (TC) History'
          : open === 'pc-history'
            ? 'Program Committee (PC) History'
            : open === 'statistics'
              ? 'Partner Statistics'
              : open === 'reviews'
                ? 'Customer Reviews'
                : ''}
      </h3>
      {renderScrollArea(renderTableContent)}
    </div>
  );
};
