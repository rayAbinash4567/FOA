import { z } from 'zod';

export const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z
    .string()
    .min(1, 'Zip is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Must be a valid zip code'),
  pronouns: z.string().min(1, 'Pronouns are required'),
  companyName: z.string().min(1, 'Company name is required'),
  companySize: z.enum([
    'Select company size',
    'Less than 10',
    '11 – 50',
    'Larger',
  ]),
  provider: z.string().min(1, 'Provider is required'),
  otherProvider: z.string().optional(),
  // brandAffiliation: z.string().min(1, 'Brand affiliation is required'),
  // email: z.string().email('Invalid email address').min(1, 'Email is required'),
  // pronouns: z.string().min(1, 'Pronouns are required'),
  // webAddress: z.string().url('Invalid URL').optional(),
  // officePhone: z
  //   .string()
  //   .regex(/^\d{3}-\d{3}-\d{4}$/, 'Invalid cell phone format (XXX-XXX-XXXX)'),

  cellPhone: z
    .string()
    .min(1, 'Cell phone is required')
    .regex(/^\d{10}$/, 'Invalid cell phone format ((XXX)-XXX-XXXX)'),
  officePhone: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{10}$/.test(value), {
      message: 'Invalid office phone format ((XXX)-XXX-XXXX)',
    }),
  // acceptTexts: z.boolean(),
  // acceptMMS: z.boolean(),
  // vocation: z.enum([
  //   'Select Vocation',
  //   'Realtor',
  //   'Lawyer',
  //   'Home Inspector',
  //   'Insurance Agent/Company',
  //   'Lender/Bank',
  //   'Mortgage Broker',
  //   'Settlement Company',
  //   'Title Company',
  //   'Renovation Specialist',
  //   'Architect',
  //   'Engineer',
  //   'Contractor',
  //   'Energy Efficiency Expert',
  //   'Other',
  // ]),
  // subVocation: z.string().optional(),
  // specialty: z.string().min(1, 'Specialty is required'),
  // prospectingMethod: z.string().min(1, 'Prospecting method is required'),
  // memberNetworks: z.array(z.string()),
  // socialMedia: z.object({
  //   facebook: z.string().url().optional(),
  //   x: z.string().url().optional(),
  //   pinterest: z.string().url().optional(),
  //   instagram: z.string().url().optional(),
  //   threads: z.string().url().optional(),
  //   linkedIn: z.string().url().optional(),
  //   alignable: z.string().url().optional(),
  //   nextDoor: z.string().url().optional(),
  //   other: z.string().url().optional(),
  // }),
  // postsHandledBy: z.enum(['Self', 'Others']),
  // coldCallingHandledBy: z.enum(['Self', 'Others']),
  // annualAdvertisingSpend: z.number().min(0),
  // advertisingMedia: z.string().min(1, 'Advertising media is required'),
});
