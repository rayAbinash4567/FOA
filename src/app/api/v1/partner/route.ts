// app/api/v1/partner/route.ts

import { db } from '@/db/db';
import { FormDataSchema } from '@/lib/schema';
import { auth, getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { externalUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const partner = await db.partner.findUnique({
      where: { userId: user.id },
    });

    if (!partner) {
      return NextResponse.json(
        { message: 'Partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(partner, { status: 200 });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = getAuth(request);
//     if (!userId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const requestBody = await request.json();
//     const parsedData = FormDataSchema.parse(requestBody);

//     const user = await db.user.findUnique({
//       where: { externalUserId: userId },
//       include: { partner: true },
//     });

//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     const partnerData = {
//       companyName: parsedData.companyName,
//       companySize: parsedData.companySize,
//       country: parsedData.country,
//       street: parsedData.street,
//       city: parsedData.city,
//       state: parsedData.state,
//       zip: parsedData.zip,
//       brandAffiliation: parsedData.brandAffiliation,
//       webAddress: parsedData.webAddress || '',
//       vocation: parsedData.vocation,
//       otherVocation: parsedData.otherVocation,
//       subVocation: parsedData.subVocation,
//       speciality: parsedData.speciality,
//       networkingOptions: parsedData.networkingOptions,
//       additionalInfoFields: parsedData.additionalInfoFields || {},
//       socialMediaOptions: parsedData.socialMediaOptions,
//       additionalsocialMediaInfoFields:
//         parsedData.additionalsocialMediaInfoFields || {},
//       socialMediaSelfOrPaid: parsedData.socialMediaSelfOrPaid,
//       coldCallingSelfOrPaid: parsedData.coldCallingSelfOrPaid,
//       advertisingSpend: parsedData.advertisingSpend,
//       marketingOptions: parsedData.marketingOptions,
//       additionalMarketingInfoFields:
//         parsedData.additionalMarketingInfoFields || {},
//       agreeToTerms: parsedData.agreeToTerms,
//     };

//     let partner;
//     if (user.partner) {
//       // User is already a partner, update their information
//       partner = await db.partner.update({
//         where: { userId: user.id },
//         data: partnerData,
//       });
//       return NextResponse.json(
//         { message: 'Partner information updated', partner },
//         { status: 200 }
//       );
//     } else {
//       // User is not a partner, create a new partner account
//       partner = await db.partner.create({
//         data: {
//           userId: user.id,
//           ...partnerData,
//         },
//       });
//       return NextResponse.json(
//         { message: 'New partner account created', partner },
//         { status: 201 }
//       );
//     }
//   } catch (error) {
//     console.error('Error processing POST request:', error);
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { message: 'Validation error', errors: error.errors },
//         { status: 400 }
//       );
//     }
//     if (error instanceof PrismaClientKnownRequestError) {
//       return NextResponse.json(
//         { message: 'Database error', error: error.message },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return NextResponse.json(
//         { message: 'Unauthorized', redirect: '/sign-in' },
//         { status: 401 }
//       );
//     }

//     const requestBody = await request.json();
//     const parsedData = FormDataSchema.parse(requestBody);

//     // Find the existing user
//     const user = await db.user.findUnique({
//       where: { externalUserId: userId },
//       include: { partner: true },
//     });

//     if (!user) {
//       redirect('/sign-in');
//     }

//     const partnerData = {
//       companyName: parsedData.companyName,
//       companySize: parsedData.companySize,
//       country: parsedData.country,
//       street: parsedData.street,
//       city: parsedData.city,
//       state: parsedData.state,
//       zip: parsedData.zip,
//       brandAffiliation: parsedData.brandAffiliation,
//       webAddress: parsedData.webAddress || '',
//       vocation: parsedData.vocation,
//       otherVocation: parsedData.otherVocation,
//       subVocation: parsedData.subVocation,
//       speciality: parsedData.speciality,
//       networkingOptions: parsedData.networkingOptions,
//       additionalInfoFields: parsedData.additionalInfoFields || {},
//       socialMediaOptions: parsedData.socialMediaOptions,
//       additionalsocialMediaInfoFields:
//         parsedData.additionalsocialMediaInfoFields || {},
//       socialMediaSelfOrPaid: parsedData.socialMediaSelfOrPaid,
//       coldCallingSelfOrPaid: parsedData.coldCallingSelfOrPaid,
//       advertisingSpend: parsedData.advertisingSpend,
//       marketingOptions: parsedData.marketingOptions,
//       additionalMarketingInfoFields:
//         parsedData.additionalMarketingInfoFields || {},
//       agreeToTerms: parsedData.agreeToTerms,
//     };

//     let partner;
//     if (user.partner) {
//       // Update existing partner
//       partner = await db.partner.update({
//         where: { userId: user.id },
//         data: partnerData,
//       });
//     } else {
//       // Create new partner

//       try {
//         await clerkClient.users.updateUserMetadata(user.id, {
//           publicMetadata: {
//             finalData: partnerData,
//           },
//         });
//         console.log('Clerk metadata updated successfully');
//       } catch (clerkError) {
//         console.error('Error updating Clerk metadata:', clerkError);
//         // Consider whether you want to continue or return here
//       }

//       partner = await db.partner.create({
//         data: {
//           ...partnerData,
//           user: { connect: { id: user.id } },
//         },
//       });

//       // Update user role to 'partner' if not already set
//       if (user.role !== 'partner') {
//         await db.user.update({
//           where: { id: user.id },
//           data: { role: 'partner' },
//         });
//       }
//     }

//     return NextResponse.json(
//       {
//         message: user.partner ? 'Partner updated' : 'Partner created',
//         partner,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error processing POST request:', error);
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { message: 'Validation error', errors: error.errors },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { message: 'Internal server error', error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return NextResponse.json(
//         { message: 'Unauthorized', redirect: '/sign-in' },
//         { status: 401 }
//       );
//     }

//     const requestBody = await request.json();
//     const parsedData = FormDataSchema.parse(requestBody);

//     // Find the existing user and include partner data
//     const user = await db.user.findUnique({
//       where: { externalUserId: userId },
//       include: { partner: true },
//     });

//     if (!user) {
//       console.error(`Authenticated user ${userId} not found in database`);
//       return NextResponse.json(
//         { message: 'User not found in database', redirect: '/sign-in' },
//         { status: 404 }
//       );
//     }

//     const partnerData = {
//       companyName: parsedData.companyName,
//       companySize: parsedData.companySize,
//       country: parsedData.country,
//       street: parsedData.street,
//       city: parsedData.city,
//       state: parsedData.state,
//       zip: parsedData.zip,
//       brandAffiliation: parsedData.brandAffiliation,
//       webAddress: parsedData.webAddress || '',
//       vocation: parsedData.vocation,
//       otherVocation: parsedData.otherVocation,
//       subVocation: parsedData.subVocation,
//       speciality: parsedData.speciality,
//       networkingOptions: parsedData.networkingOptions,
//       additionalInfoFields: parsedData.additionalInfoFields || {},
//       socialMediaOptions: parsedData.socialMediaOptions,
//       additionalsocialMediaInfoFields:
//         parsedData.additionalsocialMediaInfoFields || {},
//       socialMediaSelfOrPaid: parsedData.socialMediaSelfOrPaid,
//       coldCallingSelfOrPaid: parsedData.coldCallingSelfOrPaid,
//       advertisingSpend: parsedData.advertisingSpend,
//       marketingOptions: parsedData.marketingOptions,
//       additionalMarketingInfoFields:
//         parsedData.additionalMarketingInfoFields || {},
//       agreeToTerms: parsedData.agreeToTerms,
//       applicationStatusMessage: 'Submitted & Pending Review',
//     };

//     let partner;
//     let clerkUpdateSuccessful = false;

//     // Use a transaction to ensure database consistency
//     await db.$transaction(async (prisma) => {
//       if (user.partner) {
//         // User is already a partner, update the existing partner data
//         partner = await prisma.partner.update({
//           where: { userId: user.id },
//           data: partnerData,
//         });

//         // Optionally update Clerk metadata for existing partners
//         try {
//           await clerkClient.users.updateUserMetadata(userId, {
//             publicMetadata: {
//               finalData: partnerData,
//             },
//           });
//           clerkUpdateSuccessful = true;
//           console.log(
//             'Clerk metadata updated successfully for existing partner'
//           );
//         } catch (clerkError) {
//           console.error(
//             'Error updating Clerk metadata for existing partner:',
//             clerkError
//           );
//           // Note: We're not throwing an error here as the partner data update in our database was successful
//         }
//       } else {
//         // User is not a partner, create new partner
//         try {
//           await clerkClient.users.updateUserMetadata(userId, {
//             publicMetadata: {
//               finalData: partnerData,
//             },
//           });
//           clerkUpdateSuccessful = true;
//           console.log('Clerk metadata updated successfully for new partner');
//         } catch (clerkError) {
//           console.error(
//             'Error updating Clerk metadata for new partner:',
//             clerkError
//           );
//           throw new Error('Failed to update Clerk metadata for new partner');
//         }

//         partner = await prisma.partner.create({
//           data: {
//             ...partnerData,
//             user: { connect: { id: user.id } },
//           },
//         });

//         // Update user role to 'partner'
//         await prisma.user.update({
//           where: { id: user.id },
//           data: { role: 'partner' },
//         });
//       }
//     });

//     return NextResponse.json(
//       {
//         message: user.partner
//           ? 'Partner information updated'
//           : 'New partner created',
//         partner,
//         clerkUpdateSuccessful,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error processing POST request:', error);
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { message: 'Validation error', errors: error.errors },
//         { status: 400 }
//       );
//     }
//     if (
//       error instanceof Error &&
//       error.message === 'Failed to update Clerk metadata for new partner'
//     ) {
//       return NextResponse.json(
//         {
//           message: 'Error updating Clerk metadata for new partner',
//           error: error.message,
//         },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(
//       { message: 'Internal server error', error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized', redirect: '/sign-in' },
        { status: 401 }
      );
    }

    const requestBody = await request.json();
    const parsedData = FormDataSchema.parse(requestBody);

    // Find the existing user
    const user = await db.user.findUnique({
      where: { externalUserId: userId },
      include: { partner: true },
    });

    if (!user) {
      console.error(`Authenticated user ${userId} not found in database`);
      return NextResponse.json(
        { message: 'User not found in database', redirect: '/sign-in' },
        { status: 404 }
      );
    }

    const partnerData = {
      companyName: parsedData.companyName,
      companySize: parsedData.companySize,
      country: parsedData.country,
      street: parsedData.street,
      city: parsedData.city,
      state: parsedData.state,
      zip: parsedData.zip,

      officePhone: parsedData.officePhone || null, // Handle optional fields
      cellPhone: parsedData.cellPhone,
      cellProvider: parsedData.cellProvider,
      otherCellProvider: parsedData.otherCellProvider || null,
      acceptTexts: parsedData.acceptTexts || false,
      acceptMMS: parsedData.acceptMMS || false,
      brandAffiliation: parsedData.brandAffiliation,
      webAddress: parsedData.webAddress || null,
      vocation: parsedData.vocation,
      otherVocation: parsedData.otherVocation || null,
      subVocation: parsedData.subVocation || null,
      speciality: parsedData.speciality,
      networkingOptions: parsedData.networkingOptions,
      additionalInfoFields: parsedData.additionalInfoFields || {},
      socialMediaOptions: parsedData.socialMediaOptions,
      additionalsocialMediaInfoFields:
        parsedData.additionalsocialMediaInfoFields || {},
      socialMediaSelfOrPaid: parsedData.socialMediaSelfOrPaid,
      email: parsedData.email,
      coldCallingSelfOrPaid: parsedData.coldCallingSelfOrPaid,
      advertisingSpend: parsedData.advertisingSpend,
      marketingOptions: parsedData.marketingOptions,
      additionalMarketingInfoFields:
        parsedData.additionalMarketingInfoFields || {},
      agreeToTerms: parsedData.agreeToTerms,
    };

    let partner;

    // Use a transaction to ensure database consistency
    await db.$transaction(async (prisma) => {
      if (user.partner) {
        // User already has partner data, update it
        partner = await prisma.partner.update({
          where: { userId: user.id },
          data: partnerData,
        });
      } else {
        // User doesn't have partner data, create it
        partner = await prisma.partner.create({
          data: {
            ...partnerData,
            user: { connect: { id: user.id } },
          },
        });
      }

      // Note: We're not changing the user's role here
      // The role change should be done by an admin after reviewing the application
    });

    return NextResponse.json(
      {
        message: user.partner
          ? 'Partner information updated'
          : 'Partner information submitted',
        partner,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing POST request:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
