import React from 'react';

interface AnimatedExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const AnimatedExpandButton: React.FC<AnimatedExpandButtonProps> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 ease-in-out group-hover:translate-y-0.5"
      >
        <g
          className={`transition-opacity duration-300 ${
            isExpanded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <path
            d="M7 13L12 18L17 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-staggered-1"
          />
          <path
            d="M7 8L12 13L17 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-staggered-2"
          />
          <path
            d="M7 3L12 8L17 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-staggered-3"
          />
        </g>
        <g
          className={`transition-opacity duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <path
            d="M17 11L12 6L7 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-staggered-1"
          />
          <path
            d="M17 16L12 11L7 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-staggered-2"
          />
          <path
            d="M17 21L12 16L7 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-staggered-3"
          />
        </g>
      </svg>
      <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Click to {isExpanded ? 'collapse' : 'expand'}
      </span>
    </button>
  );
};

export default AnimatedExpandButton;
