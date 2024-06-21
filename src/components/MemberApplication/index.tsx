'use client';
import { FormDataSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { z } from 'zod';
import '../../.../../app/globals.css';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
type Inputs = z.infer<typeof FormDataSchema> & { phone: string };

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'firstName',
      'lastName',
      'email',
      'cellPhone',
      'officePhone',
      'pronouns',
    ],
  },
  {
    id: 'Step 2',
    name: "Company's Information",
    fields: [
      'companyName',
      'companySize',
      'country',
      'state',
      'city',
      'street',
      'zip',
    ],
  },
  { id: 'Step 3', name: 'Complete' },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

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
    },
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data.cellPhone);
    console.log(data);
    reset();
  };

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

  const onSubmit = (data: object) => console.log(data);

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
                    First name
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
                    Last name
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
                <div className="sm:col-span-2">
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
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Email address
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
                {/* Phone Number */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="cellPhone"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Cell Phone
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
              <h2 className="mb-3 block text-sm font-medium text-black dark:text-white">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>
            </>
          )}
        </form>

        {/* Navigation */}
        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
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
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
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
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
