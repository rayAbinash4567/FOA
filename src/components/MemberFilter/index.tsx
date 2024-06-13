import { members } from '@/db/temp'; // Ensure the import path is correct
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface FilterComponentProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const MemberFilter: React.FC<FilterComponentProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [servicesList, setServicesList] = useState<string[]>([]);
  const [industryList, setIndustryList] = useState<string[]>([]);

  useEffect(() => {
    const allServices = new Set<string>();
    const allIndustries = new Set<string>();

    members.forEach((member) => {
      member.services.forEach((service) => allServices.add(service));
      if (member.industry) {
        allIndustries.add(member.industry);
      }
    });

    setServicesList(Array.from(allServices).sort());
    setIndustryList(Array.from(allIndustries).sort());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const normalizedValue = value.toLowerCase();
    // const normalizedValue =
    // name === 'services' || name === 'industry' ? value.toLowerCase() : value;
    const updatedFilters = { ...filters, [name]: normalizedValue };
    // const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Immediate update to parent component
  };

  const resetFilters = () => {
    const resetState = {};
    setFilters(resetState);
    onFilterChange(resetState); // Notifying the parent component to clear filters
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
            className="block w-full border-stroke px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark"
          >
            <option value="">All</option>
            <option value="10-50 employees">10-50 employees</option>
            <option value="50-200 employees">50-200 employees</option>
            <option value="5-10 employees">5-10 employees</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Location
          </label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            className="block w-full px-3 py-2 border-stroke border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark"
            placeholder="Enter location"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Services
          </label>
          <select
            name="services"
            onChange={handleChange}
            className="block w-full border-stroke px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark"
          >
            <option value="">All Services</option>
            {servicesList.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Rating
          </label>
          <select
            name="rating"
            onChange={handleChange}
            className="block w-full border-stroke px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark"
          >
            <option value="">All</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Industry
          </label>
          <select
            name="industry"
            onChange={handleChange}
            className="block w-full border-stroke px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-strokedark"
          >
            <option value="">All Industries</option>
            {industryList.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        {areFiltersSet() && (
          <>
            <Button
              onClick={resetFilters}
              variant={'default'}
              className="text-m text-white md:mt-6 "
            >
              Reset All Filters
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MemberFilter;
