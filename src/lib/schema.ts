import { z } from 'zod';

export const FormDataSchema = z.object({
  // partnerId: z.string().min(1, 'Partner ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  pronouns: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
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
  cellProvider: z.string().min(1, 'Provider is required'),
  otherCellProvider: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required'),
  companySize: z.string().min(1, 'Country is required'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z
    .string()
    .min(1, 'Zip is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Must be a valid zip code'),
  acceptTexts: z.boolean().optional(),
  acceptMMS: z.boolean().optional(),
  brandAffiliation: z.string().min(1, 'Brand affiliation is required'),
  webAddress: z.string().url('Invalid URL').optional().or(z.literal('')),
  vocation: z.string().min(1, 'Vocation is required'),
  otherVocation: z.string().optional(),
  subVocation: z.string().optional(),
  speciality: z.string().min(1, 'Specialty is required'),
  // prospectingMethod: z.string().min(1, 'Prospecting method is required'),
  networkingOptions: z.array(
    z.object({
      value: z.string(),
      text: z.string(),
      selected: z.boolean(),
      additionalInfo: z.string().optional(),
    })
  ),
  additionalInfoFields: z.record(z.string()).optional(),
  socialMediaOptions: z.array(
    z.object({
      value: z.string(),
      text: z.string(),
      selected: z.boolean(),
      additionalInfo: z.string().optional(),
    })
  ),
  additionalsocialMediaInfoFields: z.record(z.string()).optional(),
  socialMediaSelfOrPaid: z.enum(['Do it Yourself', 'Pay Someone']),
  coldCallingSelfOrPaid: z.enum(['Do it Yourself', 'Pay Someone']),
  advertisingSpend: z.preprocess(
    (val) => Number(val),
    z.number().min(0).max(10000)
  ),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),

  marketingOptions: z.array(
    z.object({
      value: z.string(),
      text: z.string(),
      selected: z.boolean(),
      additionalInfo: z.string().optional(),
    })
  ),
  additionalMarketingInfoFields: z.record(z.string()).optional(),
  // postsHandledBy: z.enum(['Self', 'Others']),
  // coldCallingHandledBy: z.enum(['Self', 'Others']),
  // annualAdvertisingSpend: z.number().min(0),
  // advertisingMedia: z.string().min(1, 'Advertising media is required'),
});
