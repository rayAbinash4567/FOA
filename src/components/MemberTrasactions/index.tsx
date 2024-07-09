'use client';
import React from 'react';
import DropdownDefault from '../Dropdowns/DropdownDefault';

interface Transaction {
  id: string;
  leader: string;
  customer: string;
  partner: string;
  property: string;
  achievements: string;
  notes: string;
}

const transactionData: Transaction[] = [
  {
    id: 'TRX12345',
    leader: 'John Doe',
    customer: 'Jane Smith',
    partner: 'ABC Realty',
    property: '123 Maple St, Springfield',
    achievements: 'Closed in 30 days',
    notes: 'Smooth transaction with no issues',
  },
  {
    id: 'TRX67890',
    leader: 'Alice Johnson',
    customer: 'Mike Brown',
    partner: 'XYZ Mortgages',
    property: '456 Oak St, Springfield',
    achievements: 'Negotiated a lower interest rate',
    notes: 'Customer was very satisfied',
  },
  {
    id: 'TRX11223',
    leader: 'David Lee',
    customer: 'Nancy Wilson',
    partner: 'Home Brokers Inc.',
    property: '789 Pine St, Springfield',
    achievements: 'Secured financing in 2 weeks',
    notes: 'Customer had excellent credit',
  },
  {
    id: 'TRX44556',
    leader: 'Emily Davis',
    customer: 'Chris Evans',
    partner: 'Mortgage Experts LLC',
    property: '101 Birch St, Springfield',
    achievements: 'Found a property under budget',
    notes: 'Had to negotiate multiple offers',
  },
  {
    id: 'TRX77889',
    leader: 'Michael Scott',
    customer: 'Dwight Schrute',
    partner: 'Beet Farms Realty',
    property: '202 Cedar St, Springfield',
    achievements: 'Completed sale in record time',
    notes: 'Customer was a repeat client',
  },
];

const MemberTransactionsDetails: React.FC = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Real Estate Transactions
            </h4>
          </div>
          <DropdownDefault />
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Transaction ID
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Leader
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Customer
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Partner
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Property
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Achievements
              </h5>
            </div>
          </div>

          {transactionData.map((transaction, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${
                key === transactionData.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {transaction.id}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {transaction.leader}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {transaction.customer}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {transaction.partner}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {transaction.property}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {transaction.achievements}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberTransactionsDetails;
