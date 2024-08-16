// app/lib/getPartnerData.ts
// Adjust this import based on your Prisma client setup
import { db } from '@/db/db';
import { Partner, User } from '@prisma/client';

export interface MemberCardData {
  id: string;
  name: string;
  companyName: string;
  companySize: string;
  city: string;
  vocation: string[];
  imageUrl: string;
  rating?: number;
  industry?: string;
}

function transformPartnerToMemberCardData(
  partner: Partner & { user: User }
): MemberCardData {
  return {
    id: partner.id,
    name: `${partner.user.firstName} ${partner.user.lastName}`,
    companyName: partner.companyName,
    companySize: partner.companySize,
    city: `${partner.city}, ${partner.state}`,
    vocation: [
      partner.vocation,
      partner.subVocation,
      partner.otherVocation,
    ].filter(Boolean) as string[],
    imageUrl: partner.user.imageUrl || '/default-avatar.png',
    rating: partner.rating ?? undefined,
    industry: partner.industry ?? undefined,
  };
}


export async function getPartnerData(
  partnerId: string
): Promise<MemberCardData | null> {
  const partner = await db.partner.findUnique({
    where: { id: partnerId },
    include: { user: true },
  });

  if (!partner) return null;

  return transformPartnerToMemberCardData(partner);
}

