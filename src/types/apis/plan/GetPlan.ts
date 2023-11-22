export interface GetPlanResponse {
  success: boolean;
  data: plan;
}

interface plan {
  id: number;
  useId: number;
  nickname: string;
  tittle: string;
  description: string;
  isPublic: boolean;
  canRemind: boolean;
  ajajas: number;
  tags: string[];
  createdAt: string;
}
