export interface GetMyPlansResponse {
  success: boolean;
  data: YearPlan[];
}

interface Plan {
  title: string;
  isRemindable: boolean;
  achieveRate: number;
  icon: number;
}

interface YearPlan {
  year: number;
  totalAchieveRate: number;
  getPlanList: Plan[];
}
