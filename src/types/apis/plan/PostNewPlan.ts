export interface PostNewPlanRequestBody {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: 'MORNING' | 'AFTERNOON' | 'EVENING';
  isPublic: boolean;
  canAjaja: boolean;
  iconNumber: number;
  tags: string[];
  messages: RemindItem[];
}

export interface RemindItem {
  content: string;
  remindMonth: number;
  remindDay: number;
}
