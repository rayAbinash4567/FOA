// app/actions/fetchMembers.ts
'use server';

import { db } from '@/db/db';

export interface MemberCardData {
  id: string;
  name: string;
  vocation: string;
  companyName: string;
  companySize: string;
  city: string;
  imageUrl: string;
}

export async function fetchMembers(): Promise<MemberCardData[]> {
  try {
    const dbPartners = await db.partner.findMany({
      include: { user: true },
    });

    return dbPartners.map((partner) => ({
      id: partner.id,
      name: `${partner.user.firstName} ${partner.user.lastName}`,
      vocation: partner.vocation, // Directly assign the vocation as a string
      companyName: partner.companyName,
      companySize: partner.companySize,
      city: partner.city,
      imageUrl: partner.user.imageUrl || '/default-avatar.png',
    }));
  } catch (error) {
    console.error('Error fetching members:', error);
    throw new Error('Failed to fetch members');
  }
}
