// app/api/v1/members/route.ts

import { db } from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Fetch partners from the database
    const dbPartners = await db.partner.findMany({
      include: { user: true },
    });

    // Transform database partners to match simplified MemberCardData structure
    const transformedPartners = dbPartners.map((partner) => ({
      id: partner.id,
      name: `${partner.user.firstName} ${partner.user.lastName}`,
      vocation: [
        partner.vocation,
        partner.subVocation,
        partner.otherVocation,
      ].filter(Boolean),
      companyName: partner.companyName,
      companySize: partner.companySize,
      city: partner.city,
      imageUrl: partner.user.imageUrl || '/default-avatar.png',
    }));

    return NextResponse.json(transformedPartners, { status: 200 });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
