export interface PostNewPlanRequestBody {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: 'MORNING' | 'AFTERNOON' | 'EVENING';
  isPublic: boolean;
  tags: string[];
  messages: string[];
  iconNumber: number;
}
