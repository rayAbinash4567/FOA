'use server';

import { db } from '@/db/db';
import { auth } from '@clerk/nextjs/server';
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

//^ Get all Partners from the database
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

//^ Get a single Partner from the database
export const fetchMember = async (
  id: string
): Promise<MemberCardData | null> => {
  try {
    const dbPartner = await db.partner.findUnique({
      where: { id: id },
      include: { user: true },
    });

    if (!dbPartner) {
      return null;
    }

    const member = {
      id: dbPartner.id?.toString() || '',
      name: `${dbPartner.user?.firstName || ''} ${
        dbPartner.user?.lastName || ''
      }`.trim(),
      vocation: dbPartner.vocation?.toString() || '',
      companyName: dbPartner.companyName?.toString() || '',
      companySize: dbPartner.companySize?.toString() || '',
      city: dbPartner.city?.toString() || '',
      imageUrl: dbPartner.user?.imageUrl?.toString() || '/default-avatar.png',
    };

    return member;
  } catch (error) {
    console.error('Error fetching member:', error);
    throw new Error('Failed to fetch member');
  }
};

export const getMemberProfile = async ({ userId }: { userId: string }) => {
  try {
    const { userId: authUserId } = auth();
    if (!authUserId) {
      throw new Error('Unauthorized');
    }

    const user = await db.user.findUnique({
      where: { externalUserId: userId },
    });

    if (!user) {
      return {
        success: false,
        message: `User is not registered in Pinnacle Partnerships. Please ask them to sign up first.`,
      };
    }

    const partner = await db.partner.findUnique({
      where: { userId: user.id },
    });

    if (!partner) {
      return {
        success: false,
        message: `Partner not found`,
      };
    }

    revalidatePath('/dashboard/p/profile');

    return {
      success: true,
      message: 'Partner profile fetched successfully',
      data: JSON.parse(JSON.stringify(partner)),
    };
  } catch (error) {
    console.error('Error processing getMemberProfile:', error);
    return {
      success: false,
      message: 'Failed to fetch partner profile',
    };
  }
};
