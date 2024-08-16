import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface MemberCardDatas {
  id: string;
  name: string;
  vocation: string[] | string;
  companyName: string;
  companySize: string;
  city: string;
  imageUrl: string;
}

interface FilterComponentProps {
  onFilterChange: (filters: Partial<MemberCardDatas>) => void;
  allMembers: MemberCardDatas[];
}

const MemberFilter: React.FC<FilterComponentProps> = ({
  onFilterChange,
  allMembers,
}) => {
  const [filters, setFilters] = useState<Partial<MemberCardDatas>>({});
  const [vocationList, setVocationList] = useState<string[]>([]);
  const [companySizes, setCompanySizes] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const allVocations = new Set<string>();
    const allCompanySizes = new Set<string>();
    const allCities = new Set<string>();

    allMembers.forEach((member) => {
      if (Array.isArray(member.vocation)) {
        member.vocation.forEach((voc) => allVocations.add(voc));
      } else {
        allVocations.add(member.vocation);
      }
      allCompanySizes.add(member.companySize);
      allCities.add(member.city);
    });

    setVocationList(Array.from(allVocations).sort());
    setCompanySizes(Array.from(allCompanySizes).sort());
    setCities(Array.from(allCities).sort());
  }, [allMembers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetState = {};
    setFilters(resetState);
    onFilterChange(resetState);
  };

  const areFiltersSet = () => {
    return Object.values(filters).some((value) => value !== '');
  };

  return (
    <div className="p-4 my-2 rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Company Size
          </label>
          <select
            name="companySize"
            onChange={handleChange}
            className="block w-full border-stroke px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark dark:bg-boxdark"
          >
            <option value="">All</option>
            {companySizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            City
          </label>
          <select
            name="city"
            onChange={handleChange}
            className="block w-full border-stroke px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark dark:bg-boxdark"
          >
            <option value="">All</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Vocation
          </label>
          <select
            name="vocation"
            onChange={handleChange}
            className="block w-full border-stroke dark:bg-boxdark px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark"
          >
            <option value="">All Vocations</option>
            {vocationList.map((vocation, index) => (
              <option key={index} value={vocation}>
                {vocation}
              </option>
            ))}
          </select>
        </div>
        {areFiltersSet() && (
          <Button
            onClick={resetFilters}
            variant={'default'}
            className="text-m text-white md:mt-6"
          >
            Reset All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemberFilter;
