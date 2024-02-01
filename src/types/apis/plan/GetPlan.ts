export interface GetPlanResponse {
  success: boolean;
  data: PlanData;
}

export interface PlanData {
  writer: Writer;
  id: number;
  title: string;
  description: string;
  icon: number;
  canRemind: boolean;
  canAjaja: boolean;
  ajajas: number;
  tags: string[];
  public: boolean;
  createdAt: string;
}

interface Writer {
  nickname: string;
  owner: boolean;
  ajajaPressed: boolean;
}
