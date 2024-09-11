'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from '../common/Loader';

interface ApplicationData {
  [key: string]: any; // Define your expected structure here if possible
}

const MemberApplicationVieworUpdate = () => {
  const id = useUser().user?.id;
  const [applicationData, setApplicationData] =
    useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/v1/partner?id=${id}`);
          if (response.ok) {
            const data = await response.json();
            setApplicationData(data);
          } else {
            console.error('Failed to fetch application data');
          }
        } catch (error) {
          console.error('Error fetching application data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplicationData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!applicationData) {
    return <div>No application data found.</div>;
  }

  const renderField = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return value
        .filter((item) => item.selected)
        .map((item, i) => (
          <div key={i} className="mb-2">
            <p className="text-black dark:text-white">
              <strong>{item.text}</strong>{' '}
              {item.additionalInfo ? `: ${item.additionalInfo}` : ''}
            </p>
          </div>
        ));
    } else if (typeof value === 'object') {
      return (
        <pre className="text-black dark:text-white">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    } else {
      return <p className="text-black dark:text-white">{String(value)}</p>;
    }
  };

  const formatFieldName = (key: string) => {
    switch (key) {
      case 'agreeToTerms':
        return 'Do you agree to the terms and conditions?';
      default:
        return key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Your Application Details
      </h4>

      <h2 className="text-m py-4 font-semibold text-black dark:text-white">
        Once you are approved, you will be able to access the Partner Central
        which will give you access to create your own transaction and manage
        your own leads.
      </h2>

      <h3 className="py-4 text-black">
        {' '}
        For any correction to form or any other inquiry please contact{' '}
        <span className="text-primary">
          <Link href="mailto:engage@pinnaclepartnerships.com">
            engage@pinnaclepartnerships.com
          </Link>
        </span>{' '}
      </h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Field
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Value
            </h5>
          </div>
        </div>

        {Object.entries(applicationData)
          .filter(
            ([key]) =>
              key !== 'id' &&
              key !== 'userId' &&
              key !== 'createdAt' &&
              key !== 'updatedAt'
          )
          .map(([key, value], index) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                index === Object.entries(applicationData).length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={index}
            >
              <div className="p-2.5 xl:p-5 col-span-1">
                <p className="text-black dark:text-white">
                  {formatFieldName(key)}
                </p>
              </div>
              <div className="p-2.5 xl:p-5 col-span-4">
                {renderField(key, value)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MemberApplicationVieworUpdate;
