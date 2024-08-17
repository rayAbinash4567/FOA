export interface MemberCardData {
  id: string;
  name: string;
  vocation: string;
  companyName: string;
  companySize: string;
  city: string;
  imageUrl: string;
}

export interface FilterParams {
  companySize?: string;
  city?: string;
  vocation?: string;
}

export interface SearchParams extends FilterParams {
  page?: string;
}
