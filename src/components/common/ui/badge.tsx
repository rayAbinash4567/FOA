import React from 'react';

// Types for BadgesItem props
interface BadgesItemProps {
  children: React.ReactNode;
  outline?: boolean;
  roundedFull?: boolean;
  roundedLg?: boolean;
  roundedNone?: boolean;
  roundedSm?: boolean;
  roundedMd?: boolean;
  bgOpacity?: boolean;
}

// BadgesItem component
export const BadgesItem: React.FC<BadgesItemProps> = ({
  children,
  outline = false,
  roundedFull = false,
  roundedLg = false,
  roundedNone = false,
  roundedSm = false,
  roundedMd = false,
  bgOpacity = false,
}) => {
  const baseClasses =
    'inline-block dark:text-white text-primary rounded py-1 px-2.5 text-xs font-medium';
  const outlineClasses = outline
    ? 'border border-primary dark:text-white text-primary'
    : 'bg-primary text-white';
  const roundedClasses =
    (roundedFull && 'rounded-full') ||
    (roundedLg && 'rounded-lg') ||
    (roundedNone && 'rounded-none') ||
    (roundedSm && 'rounded-sm') ||
    (roundedMd && 'rounded-md') ||
    '';
  const opacityClasses = bgOpacity ? 'bg-primary/10 !text-primary' : '';

  return (
    <span
      className={`${baseClasses} ${outlineClasses} ${roundedClasses} ${opacityClasses}`}
    >
      {children}
    </span>
  );
};

// PrimaryBadge component
const PrimaryBadge: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <BadgesItem roundedMd>Primary</BadgesItem>
      <BadgesItem outline roundedMd>
        Primary
      </BadgesItem>
      <BadgesItem roundedFull>Primary</BadgesItem>
      <BadgesItem outline roundedFull>
        Primary
      </BadgesItem>
      <BadgesItem roundedFull bgOpacity>
        Primary
      </BadgesItem>
      <BadgesItem bgOpacity>Primary</BadgesItem>
    </div>
  );
};

export default PrimaryBadge;
