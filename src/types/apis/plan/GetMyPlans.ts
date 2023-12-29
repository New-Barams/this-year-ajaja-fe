export interface GetMyPlansResponse {
  success: boolean;
  data: YearPlan[];
}

interface Plan {
  year: number;
  planId: number;
  title: string;
  remindable: boolean;
  achieveRate: number;
  icon: number;
}

interface YearPlan {
  year: number;
  totalAchieveRate: number;
  getPlanList: Plan[];
}
