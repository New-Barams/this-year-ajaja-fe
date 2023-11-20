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
