// import Link from 'next/link';

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
// const Details = (transactions: Transaction) => {
//   return (
//     <div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-stroke dark:divide-strokedark">
//           <thead className="bg-gray-2 dark:bg-meta-4">
//             <tr>
//               <th className="p-2.5 xl:p-4 text-left text-sm font-medium uppercase xsm:text-base">
//                 Transaction ID
//               </th>
//               <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                 Property
//               </th>
//               <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                 Leader
//               </th>
//               <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                 Customer
//               </th>
//               <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                 Partner
//               </th>

//               <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                 Achievements
//               </th>
//               <th className="p-2.5 xl:p-4 text-center text-sm font-medium uppercase xsm:text-base">
//                 Last Accessed
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white dark:bg-boxdark divide-y divide-stroke dark:divide-strokedark">
//             {transactions.data.length > 0 &&
//               transactions.data.map((transaction: Transaction, key: number) => (
//                 <tr key={transaction.id}>
//                   <td className="p-2.5 xl:p-5 text-left text-sm font-medium text-black dark:text-white">
//                     <Link
//                       href={`/dashboard/transactions/${transaction.id}`}
//                       className="hover:text-primary"
//                     >
//                       {transaction.id || '-'}
//                     </Link>
//                   </td>
//                   <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                     {transaction.metadata.title || '-'}
//                   </td>
//                   <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                     {transaction.leader || '-'}
//                   </td>
//                   <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                     {transaction.customer || '-'}
//                   </td>
//                   <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                     {transaction.partner || '-'}
//                   </td>

//                   <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                     {transaction.achievements || '-'}
//                   </td>
//                   <td className="p-2.5 xl:p-5 text-center text-sm font-medium text-black dark:text-white">
//                     {transaction.lastConnectionAt || '-'}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Details;
