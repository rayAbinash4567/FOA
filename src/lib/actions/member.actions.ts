'use server';

import { db } from '@/db/db';
import { revalidatePath } from 'next/cache';

export interface MemberCardData {
  id: string;
  name: string;
  vocation: string;
  companyName: string;
  companySize: string;
  city: string;
  imageUrl: string;
}

export const fetchMembers = async (): Promise<MemberCardData[]> => {
  try {
    const dbPartners = await db.partner.findMany({
      include: { user: true },
    });

    const members = dbPartners.map((partner: any) => ({
      id: partner.id?.toString() || '',
      name: `${partner.user?.firstName || ''} ${
        partner.user?.lastName || ''
      }`.trim(),
      vocation: partner.vocation?.toString() || '',
      companyName: partner.companyName?.toString() || '',
      companySize: partner.companySize?.toString() || '',
      city: partner.city?.toString() || '',
      imageUrl: partner.user?.imageUrl?.toString() || '/default-avatar.png',
    }));

    revalidatePath('/dashboard/memberdirectory');
    return members;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw new Error('Failed to fetch members');
  }
};
