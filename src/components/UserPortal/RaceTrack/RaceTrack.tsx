import React from 'react';
import TrackCheckpoint from '../TrackStop/TrackStop';
import { transactions } from '@db/transactions';

const RaceTrackContainer = () => {
  return (
    <div className="relative p-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <svg
        viewBox="0 0 800 100"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-auto"
      >
        <path
          d="M 10,50 C 150,-30 650,130 790,50"
          stroke="#0077b6"
          strokeWidth="3"
          fill="none"
        />
      </svg>
      <div className="flex justify-between items-center relative z-10 w-full">
        {transactions.map((item, index) => (
          <TrackCheckpoint
            key={item.id}
            id={item.id}
            name={item.name}
            iconUrl={item.iconUrl}
            description={item.description}
            isLast={index === transactions.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RaceTrackContainer;
