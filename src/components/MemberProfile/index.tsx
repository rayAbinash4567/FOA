'use client';
import { getMemberProfile } from '@/lib/actions/member.actions';
import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { BadgesItem } from '../common/ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';
import { toast } from '../ui/use-toast';
import { TabContent } from './_components/TabContent';
interface SocialMedia {
  platform: string;
  link: string;
  iconPath: string;
}

interface MarketingOption {
  option: string;
  isSelected: boolean;
}
interface Transaction {
  id: string;
  leader: string;
  customer: string;
  partner: string;
  property: string;
  achievements: string;
  notes: string;
  lastConnectionAt: string;
  metadata: {
    title: string;
  };
}
interface NetworkingOption {
  option: string;
  isSelected: boolean;
}
interface AnimatedExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}
interface Partner {
  id: string;
  userId: string;
  companyName: string;
  companySize: string;
  vocation: string;
  subVocation: string;
  otherVocation: string | null;
  speciality: string;
  brandAffiliation: string;
  webAddress: string;
  street: string;
  city: string;
  state: string;
  jobTitle: string;
  zip: string;
  country: string;
  coldCallingSelfOrPaid: string;
  socialMediaSelfOrPaid: string;
  advertisingSpend: number;
  agreeToTerms: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  socialMediaOptions: SocialMedia[];
  marketingOptions: MarketingOption[];
  networkingOptions: NetworkingOption[];
  additionalInfoFields: Record<string, any>;
  additionalMarketingInfoFields: Record<string, any>;
  additionalsocialMediaInfoFields: Record<string, any>;
  strategicLeadershipType: string;
  realtorAttacheRole: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  partner?: Partner;
}

type TabCategory = 'tc-history' | 'pc-history' | 'statistics' | 'reviews';

const MemberProfile: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<TabCategory>('tc-history');
  const [partner, setPartner] = useState<Partner | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch profile function
  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const result = await getMemberProfile({ userId: user.id });
      if (result.success) {
        setPartner(result.data);
        toast({
          title: 'Profile Loaded',
          description: 'Your profile has been successfully loaded.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Failed to Load Profile',
          description:
            result.message || 'An error occurred while loading your profile.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Memoize the TabContent component to avoid unnecessary re-renders
  const memoizedTabContent = useMemo(() => {
    return <TabContent open={open} />;
  }, [open]);

  const handleTabOpen = (tabCategory: TabCategory) => {
    setOpen(tabCategory);
  };
  const memberCode = `${partner?.createdAt.split('T')[0]} - ${partner?.id.slice(
    0,
    4
  )}`;

  return (
    <div className="mx-auto max-w-242.5">
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">
                  {user?.firstName && user?.lastName}
                </h2>
                <p className="text-lg">Member Code: {memberCode}</p>
              </div>
              <div className="text-right">
                <p>
                  <strong>Join Date:</strong> {partner?.createdAt.split('T')[0]}
                </p>
                <p>
                  <strong>Industry Discipline:</strong>{' '}
                  <BadgesItem roundedFull bgOpacity>
                    {partner?.vocation}
                  </BadgesItem>
                </p>
                <p>
                  <strong>Strategic Leadership Type:</strong>{' '}
                  {partner?.strategicLeadershipType || 'N/A'}
                </p>
                <p>
                  <strong>Realtor Attache Role:</strong>{' '}
                  {partner?.realtorAttacheRole || 'N/A'}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Image
                src={
                  isSignedIn ? user.imageUrl : '/images/avatars/avatar-01.png'
                }
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <p>
                  <strong>Company:</strong> {partner?.companyName}
                </p>
                <p>
                  <strong>Job Title:</strong> {partner?.jobTitle}
                </p>
                <p>
                  <strong>Specialization:</strong> {partner?.speciality}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6.5">
        <div className="flex flex-col flex-wrap bg-gray-1 dark:bg-dark-2 md:flex-row">
          {(['tc-history', 'pc-history', 'statistics', 'reviews'] as const).map(
            (tab, index) => (
              <button
                key={tab}
                onClick={() => handleTabOpen(tab)}
                className={`group flex items-center border-b-2 px-6 py-3 text-sm font-medium md:text-base lg:px-12 lg:py-4 ${
                  open === tab
                    ? 'border-primary bg-primary/10 text-primary dark:border-primary'
                    : 'border-gray-1 text-body-color hover:border-primary hover:bg-primary/10 hover:text-primary dark:border-dark-2 dark:hover:border-primary'
                }`}
              >
                <span
                  className={`mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border text-sm ${
                    open === tab
                      ? 'border-primary bg-primary text-white'
                      : 'border-stroke bg-transparent group-hover:border-primary group-hover:bg-primary group-hover:text-white dark:border-primary dark:text-primary'
                  }`}
                >
                  0{index + 1}
                </span>
                {tab
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </button>
            )
          )}
        </div>

        <div className="mt-4">{memoizedTabContent}</div>
      </div>

      <div className="mt-6.5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Partner Member Specialization
          </h4>
          <p className="text-sm leading-relaxed">
            {partner?.speciality || 'No specialization information available'}
          </p>
        </div>

        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Media
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 h-40 flex items-center justify-center">
              Partner Member Video Placeholder
            </div>
            <div className="bg-gray-200 h-40 flex items-center justify-center">
              Partner Member Images Placeholder
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Additional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold">Company Information</h5>
              <p>
                <strong>Name:</strong> {partner?.companyName}
              </p>
              <p>
                <strong>Size:</strong> {partner?.companySize}
              </p>
              <p>
                <strong>Website:</strong> {partner?.webAddress || 'N/A'}
              </p>
            </div>
            <div>
              <h5 className="font-semibold">Location</h5>
              <p>{partner?.street}</p>
              <p>
                {partner?.city}, {partner?.state} {partner?.zip}
              </p>
              <p>{partner?.country}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Social Media
          </h4>
          <div className="flex items-center justify-center gap-3.5">
            {partner?.socialMediaOptions?.map(
              (socialMedia, index) =>
                socialMedia.link && (
                  <Link
                    key={index}
                    href={socialMedia.link}
                    className="hover:text-primary"
                    aria-label={`${socialMedia.platform} profile`}
                  >
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_30_966)">
                        <path d={socialMedia.iconPath} fill="" />
                      </g>
                      <defs>
                        <clipPath id="clip0_30_966">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>

      {/* Marketing Options */}
      {/* <div className="mt-6.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Marketing Options
          </h4>
          <ul className="list-disc list-inside">
            {partner?.marketingOptions.map((option, index) => (
              <li
                key={index}
                className={option.isSelected ? 'text-primary' : ''}
              >
                {option.option}
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Networking Options */}
      {/* <div className="mt-6.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Networking Options
          </h4>
          <ul className="list-disc list-inside">
            {partner?.networkingOptions.map((option, index) => (
              <li
                key={index}
                className={option.isSelected ? 'text-primary' : ''}
              >
                {option.option}
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Additional Info Fields */}
      {/* <div className="mt-6.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Additional Information
          </h4>
          {Object.entries(partner?.additionalInfoFields || {}).map(
            ([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            )
          )}
        </div>
      </div> */}

      {/* Additional Marketing Info Fields */}
      {/* <div className="mt-6.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Additional Marketing Information
          </h4>
          {Object.entries(partner?.additionalMarketingInfoFields || {}).map(
            ([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            )
          )}
        </div>
      </div> */}

      {/* Additional Social Media Info Fields */}
      <div className="mt-6.5">
        {/* <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-3 font-semibold text-black dark:text-white">
            Additional Social Media Information
          </h4>
          {Object.entries(partner?.additionalsocialMediaInfoFields || {}).map(
            ([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            )
          )}
        </div> */}
      </div>
    </div>
  );
};

export default MemberProfile;
