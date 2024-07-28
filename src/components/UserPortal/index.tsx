'use client';
import { transactions } from '@/db/transactions';
import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import TrackStop from './TrackStop/TrackStop';
// import Breadcrumb from '@components/Breadcrumbs/Breadcrumb';

const UserPortal: React.FC = () => {
  const [filteredStages, setFilteredStages] = useState(transactions);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb pageName="My Transactions" />
      <h1 className="text-2xl font-bold text-center mb-6">
        Real Estate Transaction Tracker
      </h1>

      <div className="space-y-4">
        {filteredStages.map((stage) => (
          <TrackStop key={stage.id} name={stage.name} icon={stage.iconUrl} />
        ))}
      </div>
    </div>
  );
};

export default UserPortal;
