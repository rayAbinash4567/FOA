// app/api/v1/partner/route.ts

import { db } from '@/db/db';
import { FormDataSchema } from '@/lib/schema';
import { auth, getAuth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
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
      redirect('/sign-in');
    }

    const partnerData = {
      companyName: parsedData.companyName,
      companySize: parsedData.companySize,
      country: parsedData.country,
      street: parsedData.street,
      city: parsedData.city,
      state: parsedData.state,
      zip: parsedData.zip,
      brandAffiliation: parsedData.brandAffiliation,
      webAddress: parsedData.webAddress || '',
      vocation: parsedData.vocation,
      otherVocation: parsedData.otherVocation,
      subVocation: parsedData.subVocation,
      speciality: parsedData.speciality,
      networkingOptions: parsedData.networkingOptions,
      additionalInfoFields: parsedData.additionalInfoFields || {},
      socialMediaOptions: parsedData.socialMediaOptions,
      additionalsocialMediaInfoFields:
        parsedData.additionalsocialMediaInfoFields || {},
      socialMediaSelfOrPaid: parsedData.socialMediaSelfOrPaid,
      coldCallingSelfOrPaid: parsedData.coldCallingSelfOrPaid,
      advertisingSpend: parsedData.advertisingSpend,
      marketingOptions: parsedData.marketingOptions,
      additionalMarketingInfoFields:
        parsedData.additionalMarketingInfoFields || {},
      agreeToTerms: parsedData.agreeToTerms,
    };

    let partner;
    if (user.partner) {
      // Update existing partner
      partner = await db.partner.update({
        where: { userId: user.id },
        data: partnerData,
      });
    } else {
      // Create new partner
      partner = await db.partner.create({
        data: {
          ...partnerData,
          user: { connect: { id: user.id } },
        },
      });

      // Update user role to 'partner' if not already set
      if (user.role !== 'partner') {
        await db.user.update({
          where: { id: user.id },
          data: { role: 'partner' },
        });
      }
    }

    return NextResponse.json(
      {
        message: user.partner ? 'Partner updated' : 'Partner created',
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
