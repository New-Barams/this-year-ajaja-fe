export type GetMyPlansResponse = {
  success: boolean;
  data: {
    totalAchieveRate: number;
    getPlanList: Plan[];
  };
};

type Plan = {
  title: string;
  isRemindable: boolean;
  achieveRate: number;
  icon: number;
};
