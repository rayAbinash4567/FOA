// // 'use client';

// import { getDocuments } from '@/lib/actions/room.actions';
// import { dateConverter } from '@/lib/utils';
// import { currentUser } from '@clerk/nextjs/server';
// import Link from 'next/link';
// import { redirect } from 'next/navigation';
// import React from 'react';
// import TransactionButton from '../ui/transactionbutton';

// interface Transaction {
//   id: string;
//   leader: string;
//   customer: string;
//   partner: string;
//   property: string;
//   achievements: string;
//   notes: string;
//   lastConnectionAt: string;
//   metadata: {
//     title: string;
//   };
// }

// const MemberTransactionsDetails: React.FC = async () => {
//   const clerkUser = await currentUser();
//   if (!clerkUser) {
//     return redirect('/sign-in');
//   }

//   // const user = await db.user.findUnique({
//   //   where: { externalUserId: clerkUser.id },
//   // });

//   const partner = clerkUser.publicMetadata.role;
//   const transactions = await getDocuments(
//     clerkUser.emailAddresses[0].emailAddress
//   );

//   return (
//     <div className="col-span-12 xl:col-span-8">
//       <div className="rounded-sm border border-stroke bg-white px-3 pb-1.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//         <div className="mb-6 flex justify-between">
//           <div>
//             <h4 className="text-title-sm2 font-bold text-black dark:text-white">
//               Real Estate Transactions
//             </h4>
//           </div>
//           {clerkUser && (
//             <TransactionButton
//               userId={clerkUser.id}
//               email={clerkUser.emailAddresses[0].emailAddress}
//             />
//           )}
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-stroke dark:divide-strokedark">
//             <thead className="bg-gray-2 dark:bg-meta-4">
//               <tr>
//                 <th className="p-2.5 xl:p-4 text-left text-sm font-medium uppercase xsm:text-base">
//                   Transaction ID
//                 </th>
//                 <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                   Property
//                 </th>
//                 <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                   Leader
//                 </th>
//                 <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                   Customer
//                 </th>
//                 <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                   Partner
//                 </th>

//                 <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                   Achievements
//                 </th>
//                 <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                   Last Accessed
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-boxdark divide-y divide-stroke dark:divide-strokedark">
//               {transactions.data.length > 0 &&
//                 transactions.data.map(
//                   (transaction: Transaction, key: number) => (
//                     <tr key={transaction.id}>
//                       <td className="p-2.5 xl:p-5 text-left text-sm font-medium text-black dark:text-white">
//                         <Link
//                           href={`/dashboard/transactions/${transaction.id}`}
//                           className="hover:text-primary"
//                         >
//                           {transaction.id || '-'}
//                         </Link>
//                       </td>
//                       <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                         {transaction.metadata.title || '-'}
//                       </td>
//                       <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                         {transaction.leader || '-'}
//                       </td>
//                       <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                         {transaction.customer || '-'}
//                       </td>
//                       <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                         {transaction.partner || '-'}
//                       </td>

//                       <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                         {transaction.achievements || '-'}
//                       </td>
//                       <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                         {dateConverter(transaction.lastConnectionAt) || '-'}
//                       </td>
//                     </tr>
//                   )
//                 )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberTransactionsDetails;

// 'use client';

import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { BadgesItem } from '../common/ui/badge';
import { DeleteModal } from '../ui/DeleteModal';
import TransactionButton from '../ui/transactionbutton';

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

const MemberTransactionsDetails: React.FC = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return redirect('/sign-in');
  }

  // const user = await db.user.findUnique({
  //   where: { externalUserId: clerkUser.id },
  // });

  const role = clerkUser?.publicMetadata?.role as string;
  const transactions = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  console.log(transactions.data[0] + 'transactions');
  console.log('here');
  return (
    <div className="col-span-12 xl:col-span-8">
      <div className="rounded-sm border border-stroke bg-white px-3 pb-1.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Real Estate Transactions
            </h4>
          </div>
          {clerkUser && role === 'partner' && (
            <TransactionButton
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stroke dark:divide-strokedark">
            <thead className="bg-gray-2 dark:bg-meta-4">
              <tr>
                <th className="p-2 xl:p-3 text-left text-xs font-medium uppercase xsm:text-sm">
                  Transaction ID
                </th>
                <th className="p-2 xl:p-3 text-center text-xs font-medium uppercase xsm:text-sm">
                  Property
                </th>
                <th className="p-2 xl:p-3 text-center text-xs font-medium uppercase xsm:text-sm">
                  Leader
                </th>
                <th className="p-2 xl:p-3 text-center text-xs font-medium uppercase xsm:text-sm">
                  Customer
                </th>
                <th className="p-2 xl:p-3 text-center text-xs font-medium uppercase xsm:text-sm">
                  Partner
                </th>
                <th className="p-2 xl:p-3 text-center text-xs font-medium uppercase xsm:text-sm">
                  Achievements
                </th>
                <th className="p-2 xl:p-3 text-center text-xs font-medium uppercase xsm:text-sm">
                  Last Accessed
                </th>
                <th className="p-2 xl:p-3 text-center text-xs font-medium uppercase xsm:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-boxdark divide-y divide-stroke dark:divide-strokedark">
              {transactions.data.length === 0 && (
                <tr>
                  <td className="p-2 xl:p-3 text-center text-md font-medium text-black dark:text-white">
                    No transactions found
                  </td>
                </tr>
              )}

              {transactions.data.length > 0 &&
                transactions.data.map(
                  (transaction: Transaction, key: number) => (
                    <tr key={transaction.id}>
                      <td className="p-2 xl:p-3 text-left text-xs font-medium text-black dark:text-white">
                        <Link
                          href={`/dashboard/transactions/${transaction.id}`}
                          className="hover:text-primary"
                        >
                          {transaction.id || '-'}
                        </Link>
                      </td>
                      <td className="p-2 xl:p-3 text-center text-xs font-medium text-black dark:text-white">
                        {transaction.metadata.title || '-'}
                      </td>
                      <td className="p-2 xl:p-3 text-center text-xs font-medium text-black dark:text-white">
                        {transaction.leader || '-'}
                      </td>
                      <td className="p-2 xl:p-3 text-center text-xs font-medium text-black dark:text-white">
                        {transaction.customer || '-'}
                      </td>
                      <td className="p-2 xl:p-3 text-center text-xs font-medium text-black dark:text-white">
                        {transaction.partner || '-'}
                      </td>
                      <td className="p-2 xl:p-3 text-center text-xs font-medium text-black dark:text-white">
                        {transaction.achievements || '-'}
                      </td>
                      <td className="p-2 xl:p-3 text-center text-xs font-medium text-black dark:text-white">
                        {dateConverter(transaction.lastConnectionAt) || '-'}
                      </td>
                      <td className="p-2 xl:p-3 text-center text-xs font-medium text-black dark:text-white">
                        <div className="flex px-1 ">
                          {role === 'partner' && (
                            <DeleteModal
                              roomId={transaction.id}
                              currentUserId={clerkUser.id}
                            />
                          )}
                          <Link
                            href={`/dashboard/transactions/${transaction.id}`}
                            className="hover:text-primary"
                          >
                            <BadgesItem roundedMd>View</BadgesItem>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberTransactionsDetails;
