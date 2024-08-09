'use client';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Loader from '@/components/common/Loader';
import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SocialMedia {
  platform: string;
  link: string;
  iconPath: string;
}

interface MarketingOption {
  option: string;
  isSelected: boolean;
}

interface NetworkingOption {
  option: string;
  isSelected: boolean;
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
}

interface ProfileData {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  partner?: Partner;
}

const Profile = () => {
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/v1/user-partner')
        .then((response) => response.json())
        .then((data: ProfileData) => {
          console.log(data);
          setProfileData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          setLoading(false);
        });
    }
  }, [isSignedIn]);

  if (loading) {
    return <Loader />;
  }

  if (!profileData) {
    return (
      <DefaultLayout>
        <div>No profile data found.</div>
      </DefaultLayout>
    );
  }

  const renderProfileField = (label: string, value: string | undefined) => {
    if (!value) return null;
    return (
      <div className="mt-2">
        <h5 className="font-semibold text-black dark:text-white">{label}</h5>
        <p className="mt-1">{value}</p>
      </div>
    );
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={'/images/cover/cover-01.png'}
              alt="profile cover"
              className="h-full rounded-tl-sm rounded-tr-sm object-cover"
              width={970}
              height={260}
              style={{ height: 'auto' }}
            />

            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                />
                <span>
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span>Edit</span>
              </label>
            </div>
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={
                    isSignedIn ? user.imageUrl : '/images/avatars/avatar-01.png'
                  }
                  className="rounded-full object-cover object-center"
                  width={160}
                  height={160}
                  style={{ width: 'auto', height: 'auto' }}
                  alt="profile"
                />
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill="white"
                    />
                  </svg>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {isSignedIn
                  ? profileData?.firstName + ' ' + profileData?.lastName
                  : 'John Doe'}
              </h3>
              <p className="font-medium">
                {profileData?.jobTitle || 'Ui/Ux Designer'}
              </p>
              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    259
                  </span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    129K
                  </span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    2K
                  </span>
                  <span className="text-sm">Following</span>
                </div>
              </div>
              <div className="mt-6.5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                  {profileData?.partner?.vocation ? (
                    <h4 className="mb-3 font-semibold text-black dark:text-white">
                      I am a
                    </h4>
                  ) : (
                    <>
                      <h4 className="mb-3 font-semibold text-black dark:text-white">
                        No Vocation Specified
                      </h4>
                    </>
                  )}
                  <p className="text-sm leading-relaxed">
                    {profileData?.partner?.vocation ||
                      'No information available'}
                  </p>
                </div>

                <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <h4 className="mb-3 font-semibold text-black dark:text-white">
                    Speciality
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {profileData?.partner?.speciality ||
                      'No speciality information available'}
                  </p>
                </div>

                <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:col-span-2">
                  <h4 className="mb-3 font-semibold text-black dark:text-white">
                    Experience
                  </h4>
                  <div className="text-sm leading-relaxed">
                    <p className="font-medium">
                      {profileData?.partner?.companyName || 'Company Name'}
                    </p>
                    <p>{profileData?.jobTitle || 'Job Title'}</p>
                    <p className="text-xs text-body dark:text-bodydark">
                      {profileData?.partner?.companySize || 'Company Size'} ·
                      Full-time
                    </p>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-180">
                {/* <h4 className="font-semibold text-black dark:text-white">
                  About Me
                </h4>
                <p className="mt-4.5">
                  {profileData?.partner
                    ? `${profileData.partner.companyName}, ${profileData.partner.companySize}, ${profileData.partner.vocation}, ${profileData.partner.speciality}`
                    : 'No additional information available'}
                </p> */}

                <div className=" mt-4 py-4 my-4 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <h4 className="mb-3 font-semibold text-black dark:text-white">
                    Company Information
                  </h4>
                  <ul className="text-sm leading-relaxed">
                    <li>
                      <strong>Name:</strong> {profileData?.partner?.companyName}
                    </li>
                    <li>
                      <strong>Size:</strong> {profileData?.partner?.companySize}
                    </li>
                    <li>
                      <strong>Website:</strong>{' '}
                      {profileData?.partner?.webAddress || 'N/A'}
                    </li>
                  </ul>
                </div>

                <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <h4 className="mb-3 font-semibold text-black dark:text-white">
                    Location
                  </h4>
                  <ul className="text-sm leading-relaxed">
                    <li>{profileData?.partner?.street}</li>
                    <li>
                      {profileData?.partner?.city},{' '}
                      {profileData?.partner?.state} {profileData?.partner?.zip}
                    </li>
                    <li>{profileData?.partner?.country}</li>
                  </ul>
                </div>

                <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <h4 className="mb-3 font-semibold text-black dark:text-white">
                    Expertise
                  </h4>
                  <ul className="text-sm leading-relaxed">
                    <li>
                      <strong>Vocation:</strong>{' '}
                      {profileData?.partner?.vocation}
                    </li>
                    <li>
                      <strong>Sub-vocation:</strong>{' '}
                      {profileData?.partner?.subVocation}
                    </li>
                    <li>
                      <strong>Brand Affiliation:</strong>{' '}
                      {profileData?.partner?.brandAffiliation}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Follow me on
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  {profileData?.partner?.socialMediaOptions?.map(
                    (socialMedia, index) =>
                      socialMedia.link && (
                        <Link
                          key={index}
                          href={socialMedia.link}
                          className="hover:text-primary"
                          aria-label="social-icon"
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
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
