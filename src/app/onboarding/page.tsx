'use client';
import Form from '@/components/MemberApplication';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type UserPath = 'hire' | 'join' | null;

interface OnboardingFormProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  location: string;
  realEstateLicenseNumber: string;
  setRealEstateLicenseNumber: (licenseNumber: string) => void;
  setLocation: (location: string) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  companyName,
  setCompanyName,
  location,
  setLocation,
  realEstateLicenseNumber,
  setRealEstateLicenseNumber,
}) => {
  return (
    <div className="mt-2 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-1 text-xl font-semibold text-black dark:text-white">
        Partner Information
      </h4>

      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompanyName(e.target.value)
            }
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-black dark:text-white">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocation(e.target.value)
            }
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Real Estate License Number (Will be verified by Pinnacle
            Partnerships)
          </label>
          <input
            type="text"
            placeholder="Enter your Real Estate License Number eg. 10401234567"
            value={realEstateLicenseNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRealEstateLicenseNumber(e.target.value)
            }
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

const OnboardingPage: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<UserPath>(null);
  const [step, setStep] = useState<number>(1);
  const [companyName, setCompanyName] = useState<string>('');
  const [realEstateLicenseNumber, setRealEstateLicenseNumber] =
    useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [showMemberApplication, setShowMemberApplication] = useState<
    boolean | null
  >(null);
  const router = useRouter();
  const { user } = useUser();

  const handlePathSelection = (path: UserPath) => {
    setSelectedPath(path);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedPath === 'join') {
      setStep(3);
    } else {
      await updateUserAndRedirect();
    }
  };

  const updateUserAndRedirect = async () => {
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            userPath: selectedPath,
            wantsToBePartner: selectedPath === 'join',
            companyName: selectedPath === 'join' ? companyName : undefined,
            location: selectedPath === 'join' ? location : undefined,
            realEstateLicenseNumber:
              selectedPath === 'join' ? realEstateLicenseNumber : undefined,
          },
        });
        router.push('/dashboard');
      } catch (error) {
        console.error('Error updating user metadata:', error);
      }
    } else {
      router.push('/sign-in');
    }
  };

  const updatePartnerInquiryAndRedirect = async () => {
    const id = user?.id;
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            userPath: selectedPath,
            wantsToBePartner: selectedPath === 'join',
            companyName: selectedPath === 'join' ? companyName : undefined,
            location: selectedPath === 'join' ? location : undefined,
            realEstateLicenseNumber:
              selectedPath === 'join' ? realEstateLicenseNumber : undefined,
          },
        });
        router.push(`/dashboard/memberapplication/${id}`);
      } catch (error) {
        console.error('Error updating user metadata:', error);
      }
    } else {
      router.push(`/onboarding`);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-3">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Please select your path:
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                      fill="#637381"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                      fill="#637381"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                value={selectedPath || ''}
                onChange={(e) =>
                  handlePathSelection(e.target.value as UserPath)
                }
              >
                <option value="">Select your path</option>
                <option value="hire">I want to hire a partner</option>
                <option value="join">I want to join partnerships</option>
              </select>
              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-3">
            <div className="mb-6 rounded-sm ">
              {selectedPath === 'hire' ? (
                <>
                  <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
                    Welcome aboard ,{' '}
                    <span className="text-primary">User !</span>
                  </h4>
                  <ol className="list-disc px-4">
                    <li>
                      <p className="text-m text-body-color dark:text-gray-400">
                        Thank you for joining Pinnacle Partnerships as a client.
                        We&apos;re excited to help you find the perfect partner
                        for your real estate needs.
                      </p>
                    </li>
                    <li>
                      Click submit to continue to your personalized dashboard
                      where you can start your search for top-tier real estate
                      experts.
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <h4 className="mb-2 text-xl font-semibold text-primary dark:text-white">
                    Welcome to Pinnacle Partnerships!
                  </h4>
                  <p className="text-m text-body-color dark:text-gray-400">
                    We&apos;re thrilled to have you join our network of real
                    estate experts. Please fill out the basic information below
                    to get started.
                  </p>
                </>
              )}
            </div>

            {selectedPath === 'join' && (
              <div className="p-3">
                <OnboardingForm
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  location={location}
                  setLocation={setLocation}
                  realEstateLicenseNumber={realEstateLicenseNumber}
                  setRealEstateLicenseNumber={setRealEstateLicenseNumber}
                />
              </div>
            )}

            <div className="mt-4 flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                onClick={() => {
                  setStep(1);
                  setSelectedPath(null);
                }}
                type="button"
              >
                Back
              </button>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit"
                disabled={
                  selectedPath === 'join' && (!companyName || !location)
                }
              >
                {selectedPath === 'hire' ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        );
      case 3:
        if (showMemberApplication) {
          return (
            <div className="w-full">
              <Form />
              <div className="mt-4 flex justify-start">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={() => setShowMemberApplication(null)}
                  type="button"
                >
                  Go Back
                </button>
              </div>
            </div>
          );
        }
        return (
          <div className="p-3">
            <h4 className="mb-4 text-xl font-semibold text-primary ">
              Want to join as a partner?
            </h4>
            <p className="mb-4 text-md text-body-color dark:text-gray-400">
              Filling out the basic details doesn&apos;t make you a partner yet.
              Would you like to fill out the additional information to join as a
              partner right now?
            </p>
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                onClick={() => updateUserAndRedirect()}
                type="button"
              >
                No, continue to website
              </button>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                onClick={() => updatePartnerInquiryAndRedirect()}
                type="button"
              >
                Yes, fill out now
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        showMemberApplication ? 'w-full p-0' : 'max-w-[1080px] mx-auto'
      }`}
    >
      {!showMemberApplication && (
        <div className="mb-6 border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Welcome to Our Platform
          </h3>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={showMemberApplication ? 'w-full' : ''}
      >
        {renderStep()}
      </form>
    </div>
  );
};

export default OnboardingPage;
