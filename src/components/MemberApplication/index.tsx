'use client';
import { useEffect } from 'react';
// import useColorMode from '@/hooks/useColorMode';
import { useColorMode } from '@/hooks/useColorMode';
import { FormDataSchema } from '@/lib/schema';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select, { SingleValue } from 'react-select';
import { z } from 'zod';
import '../../.../../app/globals.css';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import MultiSelect from '../FormElements/MultiSelect';
import Loader from '../common/Loader';
type Inputs = z.infer<typeof FormDataSchema> & { phone: string };
interface OptionType {
  value: string;
  label: string;
}
const customStyles = (colorMode: string | void) => ({
  control: (provided: any) => ({
    ...provided,
    backgroundColor: colorMode === 'dark' ? 'body-dark2' : '#fff',
    color: colorMode === 'dark' ? '#fff' : '#000',
    borderColor: colorMode === 'dark' ? '#555' : '#ddd',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: colorMode === 'dark' ? '#333' : '#fff',
    color: colorMode === 'dark' ? '#fff' : '#000',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: colorMode === 'dark' ? '#fff' : '#000',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? colorMode === 'dark'
        ? '#444'
        : '#ddd'
      : 'transparent',
    color: colorMode === 'dark' ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: colorMode === 'dark' ? '#555' : '#eee',
    },
  }),
});
const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'firstName',
      'lastName',
      'pronouns',
      'email',
      'cellPhone',
      'cellProvider',
      'otherCellProvider',
      'acceptTexts',
      'acceptMMS',
      'officePhone',
    ],
  },
  {
    id: 'Step 2',
    name: "Company's Information",
    fields: [
      'companyName',
      'companySize',
      'brandAffiliation',
      'webAddress',
      'country',
      'state',
      'city',
      'street',
      'zip',
    ],
  },
  {
    id: 'Step 3',
    name: 'Vocation Information',
    fields: [
      'vocation',
      'otherVocation',
      'subVocation',
      'speciality',
      'networkingOptions',
      'otherNetworkingOptions',
      'additionalInfo',
    ],
  },

  {
    id: 'Step 4',
    name: 'Marketing Information',
    fields: [
      'socialMediaOptions',
      'otherSocialMediaOptions',
      'additionalSocialMediaInfo',
      'socialMediaSelfOrPaid',
      'coldCallingSelfOrPaid',
      'marketingOptions',
      'otherMarketingOptions',
      'additionalMarketingInfo',
      'advertisingSpend',

      'agreeToTerms',
    ],
  },

  {
    id: 'Step 5',
    name: 'Complete',
  },
];

const vocationOptions = [
  { value: 'Realtor', label: 'Realtor' },
  { value: 'Lawyer', label: 'Lawyer' },
  { value: 'Home Inspector', label: 'Home Inspector' },
  { value: 'Insurance Agent/Company', label: 'Insurance Agent/Company' },
  { value: 'Lender/Bank', label: 'Lender/Bank' },
  { value: 'Mortgage Broker', label: 'Mortgage Broker' },
  { value: 'Settlement Company', label: 'Settlement Company' },
  { value: 'Title Company', label: 'Title Company' },
  { value: 'Renovation Specialist', label: 'Renovation Specialist' },
  { value: 'Architect', label: 'Architect' },
  { value: 'Engineer', label: 'Engineer' },
  { value: 'Contractor', label: 'Contractor' },
  { value: 'Energy Efficiency Expert', label: 'Energy Efficiency Expert' },
  { value: 'Other', label: 'Other' },
];
const networkingOptions = [
  {
    value: 'Chamber of Commerce',
    text: 'Chamber of Commerce',
    selected: false,
  },
  { value: 'Rotary', text: 'Rotary', selected: false },
  {
    value: 'LeTip or other Lead Generation Networking Group',
    text: 'LeTip or other Lead Generation Networking Group',
    selected: false,
  },
  {
    value: 'Industry Referral Programs',
    text: 'Industry Referral Programs',
    selected: false,
  },
  {
    value: 'Other Regional/National Networks',
    text: 'Other Regional/National Networks',
    selected: false,
  },
  {
    value: 'Other Local Networks',
    text: 'Other Local Networks',
    selected: false,
  },
];

const socialMediaOptions = [
  { value: 'Alignable', text: 'Alignable', selected: false },
  { value: 'Facebook', text: 'Facebook', selected: false },
  { value: 'Instagram', text: 'Instagram', selected: false },
  { value: 'LinkedIn', text: 'LinkedIn', selected: false },
  { value: 'NextDoor', text: 'NextDoor', selected: false },
  { value: 'Pinterest', text: 'Pinterest', selected: false },
  { value: 'Threads', text: 'Threads', selected: false },
  { value: 'X', text: 'X', selected: false },
  { value: 'Other', text: 'Other', selected: false },
];
const marketingOptions = [
  { value: 'Media', text: 'Media', selected: false },
  { value: 'Print', text: 'Print', selected: false },
  { value: 'Radio', text: 'Radio', selected: false },
  { value: 'TV', text: 'TV', selected: false },
  { value: 'Internet', text: 'Internet', selected: false },
  { value: 'Other', text: 'Other', selected: false },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOtherVocation, setShowOtherVocation] = useState(false);
  const [showOtherProvider, setShowOtherProvider] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const delta = currentStep - previousStep;
  const partnerId = useUser().user?.id;
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const ispartner = user?.publicMetadata?.role;
  const [colorMode] = useColorMode();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      cellPhone: '',
      officePhone: '',
      networkingOptions: networkingOptions,
      additionalInfoFields: {}, // Initialize additionalInfoFields
      socialMediaOptions: socialMediaOptions,
      additionalsocialMediaInfoFields: {},
      marketingOptions: marketingOptions,
      additionalMarketingInfoFields: {},
      advertisingSpend: 0,
      agreeToTerms: false,
    },
  });

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      try {
        const response = await fetch(`/api/v1/partner`);
        if (response.ok) {
          const result = await response.json();
          setIsSubmitted(!!result); // Set isSubmitted based on whether a record was found
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
      }
    };

    if (partnerId) {
      checkSubmissionStatus();
    }
  }, [partnerId]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const finalData = { ...data, partnerId };

    console.log(finalData);
    try {
      const response = await fetch('/api/v1/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        setLoading(false);
        console.log('Error here only Not okay response');
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      setLoading(false);
      // Handle success (e.g., redirect to another page)
      setIsSubmitted(true);
    } catch (error: unknown) {
      setLoading(false);
      console.log('Error on catch');
      console.error('Error submitting form:');
      // Handle error
    }
    reset();
  };

  const selectedOptions = watch('networkingOptions');
  const selectedSocialMediaOptions = watch('socialMediaOptions');
  const selectedMarketingOptions = watch('marketingOptions');
  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  const handleVocationChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption?.value === 'Other') {
      setShowOtherVocation(true);
    } else {
      setShowOtherVocation(false);
    }
    setValue('vocation', selectedOption?.value ?? '');
  };

  // Handle changes in the MultiSelect options
  const handleOptionsChange = (options: any[]) => {
    setValue('networkingOptions', options);
  };

  const handleSocialMediaOptionsChange = (options: any[]) => {
    setValue('socialMediaOptions', options);
  };
  const handleMarketingaOptionsChange = (options: any[]) => {
    setValue('marketingOptions', options);
  };

  // ! Fix: Fix Submit button manually added

  if (ispartner === 'partner') {
    return redirect('/dashboard/');
  }

  if (partnerId && isSubmitted) {
    return (
      <div className="mx-auto max-w-5xl ">
        <Breadcrumb pageName="Member Application Form" />
        <section className="py-8 inset-0 flex flex-col justify-between p-24 m-2 w-full px-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-xl font-bold pt-4">
            Application Submitted for review
          </h2>
          <h2 className="font-medium py-8">
            You have already submitted your application. You can view your
            submitted application below.
          </h2>
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5">
            <Link
              href={`/dashboard/membersapplication/submitted/${partnerId}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.0758 0.849976H16.0695C15.819 0.851233 15.5774 0.942521 15.3886 1.10717C15.1999 1.27183 15.0766 1.49887 15.0414 1.74685L14.4789 5.80935H13.3976V3.4031C13.3952 3.1654 13.3002 2.93802 13.1327 2.76935C12.9652 2.60068 12.7384 2.50403 12.5008 2.49998H10.082C10.0553 2.27763 9.94981 2.07221 9.78472 1.92089C9.61964 1.76956 9.40584 1.68233 9.18202 1.67498H6.45389C6.32885 1.67815 6.20571 1.70632 6.09172 1.75782C5.97773 1.80932 5.8752 1.8831 5.79017 1.97484C5.70513 2.06657 5.63932 2.17439 5.59659 2.29195C5.55387 2.40951 5.5351 2.53443 5.54139 2.65935V3.32498H3.15077C2.91396 3.32162 2.68544 3.41207 2.51507 3.57659C2.3447 3.7411 2.24632 3.96632 2.24139 4.2031V5.81248C2.0999 5.81539 1.96078 5.84937 1.83387 5.91201C1.70697 5.97466 1.59538 6.06443 1.50702 6.17498C1.41616 6.29094 1.35267 6.42593 1.32128 6.56986C1.2899 6.7138 1.29143 6.86297 1.32577 7.00623C1.32443 7.02182 1.32443 7.0375 1.32577 7.0531L3.23827 12.9375C3.29323 13.1432 3.4153 13.3247 3.58513 13.4532C3.75496 13.5818 3.96282 13.6499 4.17577 13.6468H13.3883C13.7379 13.6464 14.0756 13.5197 14.3391 13.29C14.6027 13.0603 14.7744 12.7431 14.8226 12.3968L16.2508 2.09998H18.0726C18.2384 2.09998 18.3974 2.03413 18.5146 1.91692C18.6318 1.79971 18.6976 1.64074 18.6976 1.47498C18.6976 1.30922 18.6318 1.15024 18.5146 1.03303C18.3974 0.915824 18.2384 0.849976 18.0726 0.849976H18.0758ZM12.1383 5.79373H10.0945V3.74998H12.1476L12.1383 5.79373ZM6.79139 2.9156H8.84452V3.39998V5.7906H6.79139V2.9156ZM3.49139 4.5656H5.54139V5.79373H3.49139V4.5656ZM13.5851 12.225C13.579 12.2727 13.5556 12.3166 13.5193 12.3483C13.4831 12.38 13.4364 12.3972 13.3883 12.3968H4.37577L2.65389 7.04998H14.3039L13.5851 12.225Z"
                    fill=""
                  />
                  <path
                    d="M5.31172 15.1125C4.9118 15.1094 4.51997 15.2252 4.18594 15.4451C3.85191 15.665 3.59073 15.9792 3.43553 16.3478C3.28034 16.7164 3.23813 17.1228 3.31425 17.5154C3.39037 17.908 3.58139 18.2692 3.86309 18.5531C4.14478 18.837 4.50445 19.0308 4.89647 19.11C5.28849 19.1891 5.6952 19.1501 6.06499 18.9978C6.43477 18.8454 6.75099 18.5867 6.97351 18.2544C7.19603 17.9221 7.31483 17.5312 7.31485 17.1312C7.31608 16.8671 7.26522 16.6053 7.16518 16.3608C7.06515 16.1164 6.91789 15.894 6.73184 15.7065C6.5458 15.519 6.3246 15.3701 6.08092 15.2681C5.83725 15.1662 5.57586 15.1133 5.31172 15.1125ZM5.31172 17.9C5.15905 17.9031 5.00891 17.8607 4.88045 17.7781C4.75199 17.6955 4.65103 17.5766 4.59045 17.4364C4.52986 17.2962 4.51239 17.1412 4.54026 16.9911C4.56814 16.8409 4.64009 16.7025 4.74695 16.5934C4.85382 16.4843 4.99075 16.4096 5.14028 16.3786C5.28981 16.3477 5.44518 16.3619 5.58656 16.4196C5.72794 16.4773 5.84894 16.5758 5.93412 16.7026C6.0193 16.8293 6.06481 16.9785 6.06484 17.1312C6.06651 17.3329 5.9882 17.5271 5.84705 17.6712C5.70589 17.8152 5.51341 17.8975 5.31172 17.9Z"
                    fill=""
                  />
                  <path
                    d="M12.9504 15.1125C12.5505 15.1094 12.1586 15.2252 11.8246 15.4451C11.4906 15.665 11.2294 15.9792 11.0742 16.3478C10.919 16.7164 10.8768 17.1228 10.9529 17.5154C11.029 17.908 11.2201 18.2692 11.5018 18.5531C11.7835 18.837 12.1431 19.0308 12.5351 19.11C12.9272 19.1891 13.3339 19.1501 13.7037 18.9978C14.0734 18.8454 14.3897 18.5867 14.6122 18.2544C14.8347 17.9221 14.9535 17.5312 14.9535 17.1312C14.9552 16.598 14.7452 16.086 14.3696 15.7075C13.994 15.329 13.4836 15.115 12.9504 15.1125ZM12.9504 17.9C12.7977 17.9031 12.6476 17.8607 12.5191 17.7781C12.3907 17.6955 12.2897 17.5766 12.2291 17.4364C12.1685 17.2962 12.1511 17.1412 12.1789 16.9911C12.2068 16.8409 12.2788 16.7025 12.3856 16.5934C12.4925 16.4843 12.6294 16.4096 12.779 16.3786C12.9285 16.3477 13.0838 16.3619 13.2252 16.4196C13.3666 16.4773 13.4876 16.5758 13.5728 16.7026C13.658 16.8293 13.7035 16.9785 13.7035 17.1312C13.7052 17.3329 13.6269 17.5271 13.4857 17.6712C13.3446 17.8152 13.1521 17.8975 12.9504 17.9Z"
                    fill=""
                  />
                </svg>
              </span>
              View Submitted Application
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mx-auto max-w-5xl ">
      <Breadcrumb pageName="Member Application Form" />
      <section className="py-8 inset-0 flex flex-col justify-between p-24 m-2 w-full px-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* steps */}
        <nav aria-label="Progress">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-sky-600 transition-colors ">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium text-sky-600">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form */}
        <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="font-medium text-black dark:text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide your personal details.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* First Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    First name<span className="">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter your First Name"
                      id="firstName"
                      {...register('firstName')}
                      autoComplete="given-name"
                      className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.firstName?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Last Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Last name<span className="">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Enter your Last Name"
                      {...register('lastName')}
                      autoComplete="family-name"
                      className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.lastName?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Pronouns */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="pronouns"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Pronouns
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="pronouns"
                      placeholder="He/Him, She/Her, They/Them"
                      {...register('pronouns')}
                      autoComplete="family-name"
                      className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.pronouns?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.pronouns.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Email */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Email address<span className="">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="Enter your valid email (e.g abc@domain.com)"
                      autoComplete="email"
                      className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.email?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Provider */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="provider"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Cell Phone Service Provider<span className="">*</span>
                  </label>
                  {/* Cell Phone Prov */}
                  <div className="mt-2">
                    <select
                      id="cellProvider"
                      {...register('cellProvider')}
                      autoComplete="provider-name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => {
                        setShowOtherProvider(e.target.value === 'Other');
                      }}
                    >
                      <option value="AT&T">AT&T</option>
                      <option value="Verizon">Verizon</option>
                      <option value="T-Mobile">T-Mobile</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.cellProvider?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.cellProvider.message}
                      </p>
                    )}
                  </div>
                </div>
                {showOtherProvider && (
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="otherProvider"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Other Provider
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="otherCellProvider"
                        {...register('otherCellProvider')}
                        autoComplete="other-provider"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.otherCellProvider?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.otherCellProvider.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Accept Text Messaging */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="acceptTexts"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Accept Text Messaging? <span className="">*</span>
                  </label>
                  <div className="mt-8">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        {...register('acceptTexts')}
                        className="form-checkbox h-5 w-5 text-primary"
                      />
                      <span className="ml-2 text-gray-700 dark:text-white">
                        TXT Messaging
                      </span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        type="checkbox"
                        {...register('acceptMMS')}
                        className="form-checkbox h-5 w-5 text-primary"
                      />
                      <span className="ml-2 text-gray-700 dark:text-white">
                        MMS Messaging
                      </span>
                    </label>
                    {errors.acceptTexts?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.acceptTexts.message}
                      </p>
                    )}
                    {errors.acceptMMS?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.acceptMMS.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Phone Number */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="cellPhone"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Cell Phone<span className="">*</span>
                  </label>
                  <div className="mt-2">
                    <PhoneInput
                      country={'us'}
                      onlyCountries={['us']}
                      disableDropdown={true}
                      inputClass="custom-phone-input"
                      disableCountryCode={true}
                      value={watch('cellPhone')}
                      onChange={(phone) => setValue('cellPhone', phone)}
                      inputProps={{
                        name: 'cellPhone',
                        required: true,
                        autoFocus: true,
                      }}
                      masks={{ us: '(...) ...-....' }}
                      alwaysDefaultMask={false}
                    />
                    {errors.cellPhone?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.cellPhone.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Office  Number */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="cellPhone"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Office Phone
                  </label>
                  <div className="mt-2">
                    <PhoneInput
                      country={'us'}
                      onlyCountries={['us']}
                      inputClass="custom-phone-input"
                      disableDropdown={true}
                      disableCountryCode={true}
                      value={watch('officePhone')}
                      onChange={(phone) => setValue('officePhone', phone)}
                      inputProps={{
                        name: 'officePhone',
                        required: true,
                        autoFocus: true,
                      }}
                      masks={{ us: '(...) ...-....' }}
                      alwaysDefaultMask={false}
                    />
                    {errors.officePhone?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.officePhone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="font-medium text-black dark:text-white">
                Company&apos;s Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Describe your workplace.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Company's Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="companyName"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Name of your Company
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter your Company's Name"
                      id="companyName"
                      {...register('companyName')}
                      autoComplete="given-name"
                      className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.companyName?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Company's Size */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="companySize"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Company&apos;s Size
                  </label>
                  <div className="mt-2">
                    <select
                      id="companySize"
                      {...register('companySize')}
                      autoComplete="country-name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option>Select an Option</option>
                      <option>Less than 10</option>
                      <option>10-50</option>
                      <option>Larger</option>
                    </select>
                    {errors.companySize?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.companySize.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Brand Affiliation Field */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="brandAffiliation"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Brand Affiliation
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="brandAffiliation"
                      placeholder="eg. Coldwell Banker, Pillar to Post, Farmers, Service Master"
                      {...register('brandAffiliation')}
                      className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.brandAffiliation?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.brandAffiliation.message}
                      </p>
                    )}
                  </div>
                </div>
                {/*  Web Address Field */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="webAddress"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Web Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="webAddress"
                      placeholder="https://www.example.com"
                      {...register('webAddress')}
                      className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.webAddress?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.webAddress.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Country */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      {...register('country')}
                      autoComplete="country-name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                    {errors.country?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Street Address */}
                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="street"
                      {...register('street')}
                      autoComplete="street-address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.street?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.street.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* City */}
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="city"
                      {...register('city')}
                      autoComplete="address-level2"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.city?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* State */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="state"
                      {...register('state')}
                      autoComplete="address-level1"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.state?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* ZIP */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="zip"
                      {...register('zip')}
                      autoComplete="postal-code"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.zip?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.zip.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {currentStep === 2 && (
            <>
              {/* Vocation */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="vocation"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Vocation<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <Select
                    id="vocation"
                    options={vocationOptions}
                    styles={customStyles(colorMode)}
                    {...register('vocation')}
                    onChange={(selectedOption: any) => {
                      setShowOtherVocation(selectedOption.value === 'Other');
                      setValue('vocation', selectedOption.value);
                    }}
                  />
                  {errors.vocation?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.vocation.message}
                    </p>
                  )}
                </div>
                {showOtherVocation && (
                  <div className="mt-4">
                    <label
                      htmlFor="vocation"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Vocation (Other)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Please describe your vocation"
                      id="otherVocation"
                      {...register('otherVocation')}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.otherVocation?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.otherVocation.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {/* Sub Vocation */}

              <div className="sm:col-span-3 mt-4">
                <label
                  htmlFor="subVocation"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Sub-Vocation (Describe your focus)
                </label>
                <div className="mt-2">
                  <textarea
                    rows={5}
                    placeholder=" e.g, Property Seller Lawyers, Realtor Industrial Leasing Only, Energy Efficiency – Oil to Gas Conversions, etc."
                    id="subVocation"
                    {...register('subVocation')}
                    autoComplete="sub-vocation"
                    className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.subVocation?.message && (
                    <p className="mt-2 text-sm text-red">
                      {errors.subVocation.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Speciality */}
              <div className="sm:col-span-3 mt-4">
                <label
                  htmlFor="speciality"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Describe Your Specialty/Proficiency
                </label>
                <div className="mt-2">
                  <textarea
                    placeholder=" Please be as descriptive as possible. e.g., I specialize in residential real estate, specifically in the downtown area. I have been in the industry for 10 years and have helped over 100 families find their dream homes."
                    id="speciality"
                    rows={5}
                    {...register('speciality')}
                    autoComplete="speciality"
                    className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.speciality?.message && (
                    <p className="mt-2 text-sm text-red">
                      {errors.speciality.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Member of Groups */}
              <div className="sm:col-span-3 mt-4">
                <label
                  htmlFor="networkingGroups"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Member of any groups or associations
                </label>
                <div className="sm:col-span-6">
                  <MultiSelect
                    id="networkingGroups"
                    options={networkingOptions}
                    onOptionsChange={handleOptionsChange} // Pass the handleOptionsChange function to MultiSelect
                    {...register('networkingOptions')}
                  />
                  {errors.networkingOptions?.message && (
                    <p className="mt-2 text-sm text-red">
                      {errors.networkingOptions.message}
                    </p>
                  )}
                </div>
              </div>
              {selectedOptions &&
                selectedOptions.map((option: any, index: number) =>
                  option.selected && option.value === 'Other' ? ( // Display additional input field if 'Other' is selected
                    <div
                      key={`additionalInfo-${index}`}
                      className="sm:col-span-6 mt-4"
                    >
                      <label
                        htmlFor={`additionalInfo-${option.value}`}
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                      >
                        Please specify {option.text}
                      </label>
                      <input
                        type="text"
                        id={`additionalInfo-${option.value}`}
                        {...register(`additionalInfoFields.${option.value}`)} // Register additionalInfoFields with dynamic key
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.additionalInfoFields?.[option.value] && (
                        <p className="mt-2 text-sm text-red">
                          {errors.additionalInfoFields[option.value]?.message}
                        </p>
                      )}
                    </div>
                  ) : null
                )}
            </>
          )}
          {currentStep === 3 && (
            <>
              {/* Social Media */}

              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <label
                  htmlFor="socialMediaGroups"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  What Social Media Networks Are You Involved in ?
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Indicate all social media networks you are involved in.
                </p>

                <div className="sm:col-span-6">
                  <MultiSelect
                    id="socialMediaGroups"
                    options={socialMediaOptions}
                    onOptionsChange={handleSocialMediaOptionsChange} // Pass the handleOptionsChange function to MultiSelect
                    {...register('socialMediaOptions')}
                  />
                  {errors.socialMediaOptions?.message && (
                    <p className="mt-2 text-sm text-red">
                      {errors.socialMediaOptions.message}
                    </p>
                  )}
                </div>

                {selectedSocialMediaOptions &&
                  selectedSocialMediaOptions.map(
                    (option: any, index: number) =>
                      option.selected && option.value === 'Other' ? ( // Display additional input field if 'Other' is selected
                        <div
                          key={`additionalInfo-${index}`}
                          className="sm:col-span-6 mt-4"
                        >
                          <label
                            htmlFor={`additionalInfo-${option.value}`}
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                          >
                            Please specify {option.text}
                          </label>
                          <input
                            type="text"
                            id={`additionalInfo-${option.value}`}
                            {...register(
                              `additionalsocialMediaInfoFields.${option.value}`
                            )} // Register additionalInfoFields with dynamic key
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {errors.additionalsocialMediaInfoFields?.[
                            option.value
                          ] && (
                            <p className="mt-2 text-sm text-red">
                              {
                                errors.additionalsocialMediaInfoFields[
                                  option.value
                                ]?.message
                              }
                            </p>
                          )}
                        </div>
                      ) : null
                  )}
                {/* Social Media Pay by self/ pay someone  */}
                <div className="sm:col-span-6 mt-4">
                  <p className="block text-sm font-medium text-black dark:text-white">
                    Do you post, share, like, etc., on your social media
                    yourself or pay someone to do it for you?
                  </p>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Do it Yourself"
                        {...register('socialMediaSelfOrPaid')}
                        className="form-radio h-5 w-5 text-primary"
                      />
                      <span className="ml-2 text-gray-700 dark:text-white">
                        Do it Yourself
                      </span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        type="radio"
                        value="Pay Someone"
                        {...register('socialMediaSelfOrPaid')}
                        className="form-radio h-5 w-5 text-primary"
                      />
                      <span className="ml-2 text-gray-700 dark:text-white">
                        Pay Someone
                      </span>
                    </label>
                    {errors.socialMediaSelfOrPaid?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.socialMediaSelfOrPaid.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Self Prospecting??  */}
                <div className="sm:col-span-6 mt-4">
                  <p className="block text-sm font-medium text-black dark:text-white">
                    Do you do your own cold calling prospecting or does someone
                    else do it for you?
                  </p>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Do it Yourself"
                        {...register('coldCallingSelfOrPaid')}
                        className="form-radio h-5 w-5 text-primary"
                      />
                      <span className="ml-2 text-gray-700 dark:text-white">
                        Do it Yourself
                      </span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        type="radio"
                        value="Pay Someone"
                        {...register('coldCallingSelfOrPaid')}
                        className="form-radio h-5 w-5 text-primary"
                      />
                      <span className="ml-2 text-gray-700 dark:text-white">
                        Pay Someone
                      </span>
                    </label>
                    {errors.coldCallingSelfOrPaid?.message && (
                      <p className="mt-2 text-sm text-red">
                        {errors.coldCallingSelfOrPaid.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Which Maketing platform*/}

                <div className="sm:col-span-6">
                  <label
                    htmlFor="marketingGroups"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Where do you advertise? ( Media, Print, Radio, TV, Internet
                    )
                  </label>
                  <MultiSelect
                    id="marketingGroups"
                    options={marketingOptions}
                    onOptionsChange={handleMarketingaOptionsChange} // Pass the handleOptionsChange function to MultiSelect
                    {...register('marketingOptions')}
                  />
                  {errors.marketingOptions?.message && (
                    <p className="mt-2 text-sm text-red">
                      {errors.marketingOptions.message}
                    </p>
                  )}
                </div>

                {selectedMarketingOptions &&
                  selectedMarketingOptions.map((option: any, index: number) =>
                    option.selected && option.value === 'Other' ? ( // Display additional input field if 'Other' is selected
                      <div
                        key={`additionalInfo-${index}`}
                        className="sm:col-span-6 mt-4"
                      >
                        <label
                          htmlFor={`additionalInfo-${option.value}`}
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                          Please specify {option.text}
                        </label>
                        <input
                          type="text"
                          id={`additionalInfo-${option.value}`}
                          {...register(
                            `additionalMarketingInfoFields.${option.value}`
                          )} // Register additionalInfoFields with dynamic key
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.additionalMarketingInfoFields?.[
                          option.value
                        ] && (
                          <p className="mt-2 text-sm text-red">
                            {
                              errors.additionalMarketingInfoFields[option.value]
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    ) : null
                  )}
                {/* Annual Spend */}
                <div className="sm:col-span-6 mt-4">
                  <label
                    htmlFor="advertisingSpend"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    What Do you Spend Annually on Advertising?
                  </label>
                  <input
                    type="range"
                    id="advertisingSpend"
                    min="0"
                    max="10000"
                    step="50"
                    {...register('advertisingSpend')}
                    className="w-full"
                    onChange={(e) =>
                      setValue('advertisingSpend', parseInt(e.target.value))
                    }
                  />
                  <div className="mt-2 text-center">
                    <span className="text-lg font-medium">
                      ${watch('advertisingSpend') || 0}
                    </span>
                  </div>
                  {errors.advertisingSpend?.message && (
                    <p className="mt-2 text-sm text-red">
                      {errors.advertisingSpend.message}
                    </p>
                  )}
                </div>

                {/* Agree Terms and Condition */}
                <div className="sm:col-span-6 mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      {...register('agreeToTerms')}
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                    <span className="ml-2 text-gray-700 dark:text-white">
                      I have read and understood
                      <a
                        href="https://pinnaclepartnerships.com/co-marketing-agreement/"
                        target="_blank"
                        className="text-primary underline ml-1 cursor-pointer"
                      >
                        Co-Marketing Agreement
                      </a>
                      ,
                      <a
                        href="https://pinnaclepartnerships.com/terms-and-condition/"
                        target="_blank"
                        className="text-primary underline ml-1 cursor-pointer"
                      >
                        Engagement Policy
                      </a>
                      &amp;
                      <a
                        href="https://pinnaclepartnerships.com/partner-member-commitment-pledge/"
                        target="_blank"
                        className="text-primary underline ml-1 cursor-pointer"
                      >
                        Member Commitment Pledge
                      </a>
                      .
                    </span>
                  </label>
                  {errors.agreeToTerms?.message && (
                    <p className="mt-2 text-sm text-red">
                      {errors.agreeToTerms.message}
                    </p>
                  )}
                </div>
              </motion.div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <h2 className="font-medium text-black dark:text-white">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>

              <div className="mb-7.5 mt-4 flex flex-wrap gap-5 xl:gap-7.5">
                <Link
                  href={`/dashboard/membersapplication/${partnerId}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <span>
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.0758 0.849976H16.0695C15.819 0.851233 15.5774 0.942521 15.3886 1.10717C15.1999 1.27183 15.0766 1.49887 15.0414 1.74685L14.4789 5.80935H13.3976V3.4031C13.3952 3.1654 13.3002 2.93802 13.1327 2.76935C12.9652 2.60068 12.7384 2.50403 12.5008 2.49998H10.082C10.0553 2.27763 9.94981 2.07221 9.78472 1.92089C9.61964 1.76956 9.40584 1.68233 9.18202 1.67498H6.45389C6.32885 1.67815 6.20571 1.70632 6.09172 1.75782C5.97773 1.80932 5.8752 1.8831 5.79017 1.97484C5.70513 2.06657 5.63932 2.17439 5.59659 2.29195C5.55387 2.40951 5.5351 2.53443 5.54139 2.65935V3.32498H3.15077C2.91396 3.32162 2.68544 3.41207 2.51507 3.57659C2.3447 3.7411 2.24632 3.96632 2.24139 4.2031V5.81248C2.0999 5.81539 1.96078 5.84937 1.83387 5.91201C1.70697 5.97466 1.59538 6.06443 1.50702 6.17498C1.41616 6.29094 1.35267 6.42593 1.32128 6.56986C1.2899 6.7138 1.29143 6.86297 1.32577 7.00623C1.32443 7.02182 1.32443 7.0375 1.32577 7.0531L3.23827 12.9375C3.29323 13.1432 3.4153 13.3247 3.58513 13.4532C3.75496 13.5818 3.96282 13.6499 4.17577 13.6468H13.3883C13.7379 13.6464 14.0756 13.5197 14.3391 13.29C14.6027 13.0603 14.7744 12.7431 14.8226 12.3968L16.2508 2.09998H18.0726C18.2384 2.09998 18.3974 2.03413 18.5146 1.91692C18.6318 1.79971 18.6976 1.64074 18.6976 1.47498C18.6976 1.30922 18.6318 1.15024 18.5146 1.03303C18.3974 0.915824 18.2384 0.849976 18.0726 0.849976H18.0758ZM12.1383 5.79373H10.0945V3.74998H12.1476L12.1383 5.79373ZM6.79139 2.9156H8.84452V3.39998V5.7906H6.79139V2.9156ZM3.49139 4.5656H5.54139V5.79373H3.49139V4.5656ZM13.5851 12.225C13.579 12.2727 13.5556 12.3166 13.5193 12.3483C13.4831 12.38 13.4364 12.3972 13.3883 12.3968H4.37577L2.65389 7.04998H14.3039L13.5851 12.225Z"
                        fill=""
                      />
                      <path
                        d="M5.31172 15.1125C4.9118 15.1094 4.51997 15.2252 4.18594 15.4451C3.85191 15.665 3.59073 15.9792 3.43553 16.3478C3.28034 16.7164 3.23813 17.1228 3.31425 17.5154C3.39037 17.908 3.58139 18.2692 3.86309 18.5531C4.14478 18.837 4.50445 19.0308 4.89647 19.11C5.28849 19.1891 5.6952 19.1501 6.06499 18.9978C6.43477 18.8454 6.75099 18.5867 6.97351 18.2544C7.19603 17.9221 7.31483 17.5312 7.31485 17.1312C7.31608 16.8671 7.26522 16.6053 7.16518 16.3608C7.06515 16.1164 6.91789 15.894 6.73184 15.7065C6.5458 15.519 6.3246 15.3701 6.08092 15.2681C5.83725 15.1662 5.57586 15.1133 5.31172 15.1125ZM5.31172 17.9C5.15905 17.9031 5.00891 17.8607 4.88045 17.7781C4.75199 17.6955 4.65103 17.5766 4.59045 17.4364C4.52986 17.2962 4.51239 17.1412 4.54026 16.9911C4.56814 16.8409 4.64009 16.7025 4.74695 16.5934C4.85382 16.4843 4.99075 16.4096 5.14028 16.3786C5.28981 16.3477 5.44518 16.3619 5.58656 16.4196C5.72794 16.4773 5.84894 16.5758 5.93412 16.7026C6.0193 16.8293 6.06481 16.9785 6.06484 17.1312C6.06651 17.3329 5.9882 17.5271 5.84705 17.6712C5.70589 17.8152 5.51341 17.8975 5.31172 17.9Z"
                        fill=""
                      />
                      <path
                        d="M12.9504 15.1125C12.5505 15.1094 12.1586 15.2252 11.8246 15.4451C11.4906 15.665 11.2294 15.9792 11.0742 16.3478C10.919 16.7164 10.8768 17.1228 10.9529 17.5154C11.029 17.908 11.2201 18.2692 11.5018 18.5531C11.7835 18.837 12.1431 19.0308 12.5351 19.11C12.9272 19.1891 13.3339 19.1501 13.7037 18.9978C14.0734 18.8454 14.3897 18.5867 14.6122 18.2544C14.8347 17.9221 14.9535 17.5312 14.9535 17.1312C14.9552 16.598 14.7452 16.086 14.3696 15.7075C13.994 15.329 13.4836 15.115 12.9504 15.1125ZM12.9504 17.9C12.7977 17.9031 12.6476 17.8607 12.5191 17.7781C12.3907 17.6955 12.2897 17.5766 12.2291 17.4364C12.1685 17.2962 12.1511 17.1412 12.1789 16.9911C12.2068 16.8409 12.2788 16.7025 12.3856 16.5934C12.4925 16.4843 12.6294 16.4096 12.779 16.3786C12.9285 16.3477 13.0838 16.3619 13.2252 16.4196C13.3666 16.4773 13.4876 16.5758 13.5728 16.7026C13.658 16.8293 13.7035 16.9785 13.7035 17.1312C13.7052 17.3329 13.6269 17.5271 13.4857 17.6712C13.3446 17.8152 13.1521 17.8975 12.9504 17.9Z"
                        fill=""
                      />
                    </svg>
                  </span>
                  View Submitted Applicaation
                </Link>
              </div>
            </>
          )}
        </form>

        {/* Navigation */}
        {currentStep < steps.length - 1 ? (
          <>
            <div className="mt-1 pt-2">
              <div className="flex  justify-between">
                {/* previous  */}
                <Link
                  onClick={(e) => {
                    if (currentStep === 0) {
                      e.preventDefault();
                    } else {
                      prev();
                    }
                  }}
                  href="#"
                  className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </span>
                  Previous Step
                </Link>

                {/* next */}
                <Link
                  href="#"
                  onClick={(e) => {
                    if (currentStep === steps.length - 1) {
                      e.preventDefault();
                    } else {
                      next();
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                  Next Steps
                </Link>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}
