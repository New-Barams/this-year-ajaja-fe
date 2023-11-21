export interface PostNewPlanRequestBody {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: 'Morning' | 'Afternoon' | 'Evening';
  isPublic: boolean;
  tags: string[];
  messages: string[];
  icon: number;
}
