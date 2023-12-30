export interface GetAllPlansResponse {
  success: boolean;
  data: CardPlans[];
}

export interface CardPlans {
  id: number;
  iconNumber: number;
  userId: number;
  nickname: string;
  title: string;
  ajajas: number;
  tags: string[];
  createdAt: string;
}

export interface GetAllPlansRequestQuery {
  sort: SortType;
  current: boolean;
  ajaja?: string;
  start?: number;
}

export type SortType = 'latest' | 'ajaja';
