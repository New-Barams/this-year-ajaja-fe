export interface GetMyPlansResponse {
  success: boolean;
  data: YearPlan[];
}

interface Plan {
  year: number;
  planId: number;
  title: string;
  isRemindable: boolean;
  achieveRate: number;
  icon: number;
  isVerified: false;
}

interface YearPlan {
  year: number;
  totalAchieveRate: number;
  getPlanList: Plan[];
}
