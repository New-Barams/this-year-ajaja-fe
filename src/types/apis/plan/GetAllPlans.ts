export interface GetAllPlansResponse {
  success: boolean;
  data: CardPlans[];
}

export interface CardPlans {
  id: number;
  userId: number;
  nickname: string;
  title: string;
  ajajas: number;
  tags: string[];
  createdAt: string;
}

export interface GetAllPlansRequestQuery {
  sortCondition: SortType;
  isNewYear: boolean;
  cursorCreatedAt?: string;
  cursorId?: number;
  pageSize: number;
}

export type SortType = 'createdAt' | 'ajaja';
